"""
Agentic RAG Pipeline for SanskritNova v2
==========================================
Transforms the basic retrieve-then-generate pattern into an agentic RAG
system that demonstrates 2026 best practices:

  User Query
      │
      ▼
  ┌─────────────────┐
  │  Query Analyzer  │  ← decides: retrieve? direct answer? reformulate?
  └──┬──────┬───────┘
     │      │
     ▼      ▼
  Direct   Retrieve    (conditional routing)
  Answer      │
     │        ▼
     │   ┌──────────┐
     │   │ Chunk     │  ← scores relevance, filters noise
     │   │ Evaluator │
     │   └────┬─────┘
     │        │
     │        ▼ (if chunks insufficient → reformulate + retry)
     │   ┌──────────┐
     │   │ Generator │  ← produces grounded answer
     │   └────┬─────┘
     │        │
     ▼        ▼
  ┌─────────────────┐
  │  Answer Checker  │  ← validates: grounded? complete? hallucination?
  └────────┬────────┘
           │ (if failed → self-correct with feedback)
           ▼
      Final Answer

Key patterns demonstrated:
- Conditional routing (query needs RAG or not?)
- Quality gates (chunk relevance scoring)
- Self-correction loops (retry with reformulated query)
- Answer validation (anti-hallucination checks)

Requirements:
  pip install langgraph langchain-core langchain-openai
"""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from enum import Enum
from typing import Any

logger = logging.getLogger("sanskritnova.agentic_rag")

# ---------------------------------------------------------------------------
# Graceful dependency imports with fallbacks
# ---------------------------------------------------------------------------

try:
    from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
    from langchain_core.output_parsers import StrOutputParser
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_openai import ChatOpenAI
    from langgraph.graph import END, StateGraph

    LANGGRAPH_AVAILABLE = True
    logger.info("LangGraph + LangChain dependencies loaded successfully")
except ImportError as exc:
    LANGGRAPH_AVAILABLE = False
    _IMPORT_ERROR = str(exc)
    logger.warning("LangGraph/LangChain not available: %s", _IMPORT_ERROR)

    # Stubs so the module can be imported without langgraph installed
    END = "__end__"
    StateGraph = None  # type: ignore[assignment,misc]
    ChatPromptTemplate = None  # type: ignore[assignment,misc]
    StrOutputParser = None  # type: ignore[assignment,misc]
    ChatOpenAI = None  # type: ignore[assignment,misc]


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

class QueryType(str, Enum):
    DIRECT = "direct"           # Answer without retrieval (general knowledge)
    RETRIEVE = "retrieve"       # Needs corpus retrieval
    REFORMULATE = "reformulate" # Query unclear, needs rephrasing


@dataclass
class AgenticRAGState:
    """State flowing through the agentic RAG graph."""
    query: str = ""
    query_type: QueryType = QueryType.RETRIEVE
    reformulated_query: str = ""
    retrieved_chunks: list[dict] = field(default_factory=list)
    chunk_scores: list[float] = field(default_factory=list)
    filtered_chunks: list[dict] = field(default_factory=list)
    draft_answer: str = ""
    answer_quality: str = ""  # "good", "insufficient", "hallucination"
    answer_feedback: str = ""
    final_answer: str = ""
    sources: list[dict] = field(default_factory=list)
    attempt: int = 0
    max_attempts: int = 3
    step_log: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# LLM
# ---------------------------------------------------------------------------

def _get_llm(temperature: float = 0.1) -> Any:
    """Create a ChatOpenAI client configured for OpenRouter."""
    if not LANGGRAPH_AVAILABLE:
        raise RuntimeError(
            "LangGraph/LangChain not installed. "
            "Run: pip install langgraph langchain-core langchain-openai"
        )
    api_key = os.getenv("OPENROUTER_API_KEY", "")
    if not api_key:
        logger.warning("OPENROUTER_API_KEY not set — LLM calls will fail")
    return ChatOpenAI(
        model=os.getenv("OPENROUTER_MODEL", "openai/gpt-4.1-mini"),
        temperature=temperature,
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": os.getenv("OPENROUTER_APP_URL", "http://localhost:3000"),
            "X-Title": "SanskritNova Agentic RAG",
        },
    )


# ---------------------------------------------------------------------------
# Retriever adapter (wraps existing SanskritNova retriever)
# ---------------------------------------------------------------------------

def _get_retriever():
    """Load SanskritNova's existing retriever with robust import fallbacks."""
    # Try absolute import from code package
    try:
        from code.rag_pipeline import SanskritRAG
        logger.debug("Loaded SanskritRAG via code.rag_pipeline")
        return SanskritRAG()
    except ImportError:
        pass

    # Try relative import (when running inside code/)
    try:
        from rag_pipeline import SanskritRAG
        logger.debug("Loaded SanskritRAG via rag_pipeline")
        return SanskritRAG()
    except ImportError:
        pass

    # Try sanskrit_rag wrapper
    try:
        from sanskrit_rag.rag_pipeline import SanskritRAG
        logger.debug("Loaded SanskritRAG via sanskrit_rag.rag_pipeline")
        return SanskritRAG()
    except ImportError:
        pass

    logger.warning("SanskritRAG not available from any import path — using mock retriever")
    return None


# ---------------------------------------------------------------------------
# Error boundary decorator
# ---------------------------------------------------------------------------

def _error_boundary(node_name: str):
    """Decorator that wraps async node functions with error handling."""
    def decorator(fn):
        async def wrapper(state: AgenticRAGState) -> dict:
            try:
                return await fn(state)
            except Exception as exc:
                logger.error("Node '%s' failed: %s", node_name, exc, exc_info=True)
                return {
                    "step_log": state.step_log + [f"⚠ {node_name} error: {exc}"],
                }
        wrapper.__name__ = fn.__name__
        wrapper.__qualname__ = fn.__qualname__
        return wrapper
    return decorator


# ---------------------------------------------------------------------------
# Node 1: Query Analyzer
# ---------------------------------------------------------------------------

@_error_boundary("query_analyzer")
async def query_analyzer(state: AgenticRAGState) -> dict:
    """
    Analyzes the query and decides the routing strategy.
    Does this query need RAG retrieval, or can it be answered directly?
    """
    llm = _get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a Sanskrit learning assistant's query router.
Analyze the user's query and classify it:

- "retrieve": The query asks about specific Sanskrit texts, verses, grammar rules, 
  translations, or corpus-specific content. NEEDS retrieval from the Sanskrit corpus.
- "direct": The query is general knowledge (e.g., "what is Sanskrit?", "how old is Sanskrit?"),
  greetings, or meta-questions about the app. Can be answered WITHOUT retrieval.
- "reformulate": The query is ambiguous, unclear, or too vague to retrieve effectively.

Respond with ONLY one word: retrieve, direct, or reformulate"""),
        ("human", "{query}"),
    ])

    chain = prompt | llm | StrOutputParser()
    result = await chain.ainvoke({"query": state.query})

    query_type = QueryType.RETRIEVE  # default
    if "direct" in result.lower():
        query_type = QueryType.DIRECT
    elif "reformulate" in result.lower():
        query_type = QueryType.REFORMULATE

    logger.info("Query classified as %s: %s", query_type.value, state.query[:80])
    return {
        "query_type": query_type,
        "step_log": [f"Query classified as: {query_type.value}"],
    }


# ---------------------------------------------------------------------------
# Node 2: Query Reformulator
# ---------------------------------------------------------------------------

@_error_boundary("query_reformulator")
async def query_reformulator(state: AgenticRAGState) -> dict:
    """Reformulates ambiguous queries into retrieval-friendly ones."""
    llm = _get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a Sanskrit query reformulator.
Take the ambiguous user query and rewrite it as a clear, specific retrieval query.
Focus on: Sanskrit terms, transliteration, grammar concepts, or text references.
Return ONLY the reformulated query, nothing else."""),
        ("human", "Original query: {query}"),
    ])

    chain = prompt | llm | StrOutputParser()
    reformulated = await chain.ainvoke({"query": state.query})

    logger.info("Query reformulated: %s -> %s", state.query[:60], reformulated[:60])
    return {
        "reformulated_query": reformulated,
        "step_log": state.step_log + [f"Query reformulated: {reformulated}"],
    }


# ---------------------------------------------------------------------------
# Node 3: Retriever
# ---------------------------------------------------------------------------

@_error_boundary("retriever")
async def retrieve_chunks(state: AgenticRAGState) -> dict:
    """Retrieve chunks from the Sanskrit corpus."""
    rag = _get_retriever()
    query = state.reformulated_query or state.query

    if rag is None:
        logger.warning("No retriever available for query: %s", query[:60])
        return {
            "retrieved_chunks": [],
            "chunk_scores": [],
            "step_log": state.step_log + ["No retriever available, skipping retrieval"],
        }

    try:
        results = rag.search(query, k=5)
        chunks = [
            {"source": r.get("source", ""), "chunk_id": r.get("chunk_id", ""), "text": r.get("text", "")}
            for r in results
        ]
        logger.info("Retrieved %d chunks for query: %s", len(chunks), query[:60])
        return {
            "retrieved_chunks": chunks,
            "chunk_scores": [1.0] * len(chunks),  # placeholder scores
            "step_log": state.step_log + [f"Retrieved {len(chunks)} chunks"],
        }
    except Exception as e:
        logger.error("Retrieval failed for query '%s': %s", query[:60], e)
        return {
            "retrieved_chunks": [],
            "chunk_scores": [],
            "step_log": state.step_log + [f"Retrieval error: {e}"],
        }


# ---------------------------------------------------------------------------
# Node 4: Chunk Evaluator
# ---------------------------------------------------------------------------

@_error_boundary("chunk_evaluator")
async def chunk_evaluator(state: AgenticRAGState) -> dict:
    """
    Evaluates retrieved chunks for relevance.
    Filters out low-quality or irrelevant chunks.
    Decides if retrieval was sufficient or needs retry.
    """
    if not state.retrieved_chunks:
        return {
            "filtered_chunks": [],
            "answer_quality": "insufficient",
            "step_log": state.step_log + ["No chunks to evaluate"],
        }

    llm = _get_llm()

    # Evaluate each chunk
    filtered = []
    scores = []

    for chunk in state.retrieved_chunks:
        prompt = ChatPromptTemplate.from_messages([
            ("system", """Rate the relevance of this text chunk to the user's query.
Score 0-10 where 10 = directly answers the query, 0 = completely irrelevant.
Respond with ONLY a number."""),
            ("human", "Query: {query}\n\nChunk: {text}"),
        ])

        chain = prompt | llm | StrOutputParser()
        try:
            score_str = await chain.ainvoke({"query": state.query, "text": chunk["text"][:500]})
            score = float(score_str.strip())
        except (ValueError, TypeError):
            score = 5.0  # default

        scores.append(score)
        if score >= 4.0:  # threshold
            filtered.append(chunk)

    quality = "good" if len(filtered) >= 2 else "insufficient"

    logger.info(
        "Chunk evaluation: %d/%d passed (scores: %s), quality=%s",
        len(filtered), len(state.retrieved_chunks), scores, quality,
    )
    return {
        "filtered_chunks": filtered,
        "chunk_scores": scores,
        "answer_quality": quality,
        "step_log": state.step_log + [
            f"Evaluated {len(state.retrieved_chunks)} chunks, "
            f"kept {len(filtered)} (threshold: 4.0+)",
            f"Quality assessment: {quality}",
        ],
    }


# ---------------------------------------------------------------------------
# Node 5: Direct Answer (no retrieval)
# ---------------------------------------------------------------------------

@_error_boundary("direct_answer")
async def direct_answer(state: AgenticRAGState) -> dict:
    """Answer a general knowledge query without retrieval."""
    llm = _get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are SanskritNova AI, an expert Sanskrit learning guide.
Answer this general knowledge question about Sanskrit.
Be concise and culturally respectful."""),
        ("human", "{query}"),
    ])

    chain = prompt | llm | StrOutputParser()
    answer = await chain.ainvoke({"query": state.query})

    logger.info("Direct answer generated for: %s", state.query[:60])
    return {
        "final_answer": answer,
        "sources": [],
        "step_log": state.step_log + ["Answered directly (no retrieval needed)"],
    }


# ---------------------------------------------------------------------------
# Node 6: Generator
# ---------------------------------------------------------------------------

@_error_boundary("generator")
async def generate_answer(state: AgenticRAGState) -> dict:
    """Generate a grounded answer from filtered chunks."""
    llm = _get_llm()

    if not state.filtered_chunks:
        logger.warning("No filtered chunks available for generation")
        return {
            "draft_answer": "सन्दर्भे उत्तरं न लभ्यते। (No relevant context found.)",
            "sources": [],
            "step_log": state.step_log + ["No relevant chunks, returning fallback"],
        }

    context = "\n\n".join(
        f"[{c['source']}#{c['chunk_id']}]\n{c['text']}"
        for c in state.filtered_chunks
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a Sanskrit learning assistant.
Rules:
- Use ONLY the supplied context.
- Answer in simple Sanskrit with English explanation.
- If the context is insufficient, say so.
- Do not invent sources.
- End with source references."""),
        ("human", "Context:\n{context}\n\nQuestion: {query}"),
    ])

    chain = prompt | llm | StrOutputParser()
    answer = await chain.ainvoke({"context": context, "query": state.query})

    logger.info("Generated answer from %d chunks", len(state.filtered_chunks))
    return {
        "draft_answer": answer,
        "sources": state.filtered_chunks,
        "step_log": state.step_log + [f"Generated answer from {len(state.filtered_chunks)} chunks"],
    }


# ---------------------------------------------------------------------------
# Node 7: Answer Checker
# ---------------------------------------------------------------------------

@_error_boundary("answer_checker")
async def answer_checker(state: AgenticRAGState) -> dict:
    """
    Validates the generated answer for:
    - Groundedness (is it supported by the context?)
    - Completeness (does it fully answer the question?)
    - Hallucination risk (does it add info not in context?)
    """
    llm = _get_llm()

    context = "\n\n".join(c["text"][:300] for c in state.filtered_chunks)

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a fact-checker for a Sanskrit learning assistant.
Evaluate this answer against the source context.

Check:
1. Is the answer grounded in the context? (yes/no)
2. Does it fully answer the question? (yes/no)
3. Does it contain hallucinated information not in context? (yes/no)

Respond in this exact format:
grounded: yes/no
complete: yes/no
hallucination: yes/no
feedback: [brief explanation]"""),
        ("human", "Context:\n{context}\n\nQuestion: {query}\n\nAnswer: {answer}"),
    ])

    chain = prompt | llm | StrOutputParser()
    result = await chain.ainvoke({
        "context": context,
        "query": state.query,
        "answer": state.draft_answer,
    })

    # Parse the check result
    lines = result.strip().lower().split("\n")
    is_grounded = any("grounded: yes" in l for l in lines)
    is_complete = any("complete: yes" in l for l in lines)
    has_hallucination = any("hallucination: yes" in l for l in lines)

    feedback = ""
    for l in lines:
        if l.startswith("feedback:"):
            feedback = l.split(":", 1)[1].strip()

    if is_grounded and is_complete and not has_hallucination:
        quality = "good"
    elif has_hallucination:
        quality = "hallucination"
    else:
        quality = "insufficient"

    logger.info(
        "Answer check: grounded=%s, complete=%s, hallucination=%s → quality=%s",
        is_grounded, is_complete, has_hallucination, quality,
    )
    return {
        "answer_quality": quality,
        "answer_feedback": feedback,
        "final_answer": state.draft_answer if quality == "good" else "",
        "step_log": state.step_log + [
            f"Answer check: grounded={is_grounded}, complete={is_complete}, "
            f"hallucination={has_hallucination}",
            f"Quality: {quality}",
        ],
    }


# ---------------------------------------------------------------------------
# Node 8: Self-Corrector
# ---------------------------------------------------------------------------

@_error_boundary("self_corrector")
async def self_corrector(state: AgenticRAGState) -> dict:
    """
    When answer quality fails, reformulate the query and retry.
    This is the agentic self-correction loop.
    """
    llm = _get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a query reformulation expert.
The previous attempt to answer a Sanskrit query failed quality checks.
Feedback: {feedback}

Rewrite the query to be more specific and retrieval-friendly.
Focus on the parts that were NOT well-answered.
Return ONLY the reformulated query."""),
        ("human", "Original query: {query}\nPrevious answer: {answer}"),
    ])

    chain = prompt | llm | StrOutputParser()
    new_query = await chain.ainvoke({
        "feedback": state.answer_feedback,
        "query": state.query,
        "answer": state.draft_answer,
    })

    logger.info(
        "Self-correction attempt %d: reformulated query", state.attempt + 1,
    )
    return {
        "reformulated_query": new_query,
        "attempt": state.attempt + 1,
        "draft_answer": "",  # reset for retry
        "step_log": state.step_log + [
            f"Self-correction attempt {state.attempt + 1}: reformulated query",
        ],
    }


# ---------------------------------------------------------------------------
# Routing Logic
# ---------------------------------------------------------------------------

def route_after_analysis(state: AgenticRAGState) -> str:
    """Route based on query type."""
    if state.query_type == QueryType.DIRECT:
        return "direct_answer"
    elif state.query_type == QueryType.REFORMULATE:
        return "query_reformulator"
    else:
        return "retriever"


def route_after_evaluation(state: AgenticRAGState) -> str:
    """Route based on chunk quality."""
    if state.answer_quality == "insufficient" and state.attempt < state.max_attempts:
        return "self_corrector"
    elif not state.filtered_chunks and state.attempt < state.max_attempts:
        return "self_corrector"
    else:
        return "generator"


def route_after_check(state: AgenticRAGState) -> str:
    """Route based on answer quality."""
    if state.answer_quality == "good":
        return END
    elif state.attempt < state.max_attempts:
        return "self_corrector"
    else:
        # Max attempts reached, return what we have
        return END


# ---------------------------------------------------------------------------
# Graph Construction
# ---------------------------------------------------------------------------

def build_agentic_rag_graph() -> StateGraph:
    """
    Build the agentic RAG graph with self-correction loops.

    Flow:
      START → query_analyzer → [direct_answer | query_reformulator | retriever]
      retriever → chunk_evaluator → [self_corrector → retriever | generator]
      generator → answer_checker → [END | self_corrector → retriever]
    """
    if not LANGGRAPH_AVAILABLE:
        raise RuntimeError(
            "LangGraph is required. Install: pip install langgraph langchain-core langchain-openai"
        )

    graph = StateGraph(AgenticRAGState)

    # Add nodes
    graph.add_node("query_analyzer", query_analyzer)
    graph.add_node("query_reformulator", query_reformulator)
    graph.add_node("retriever", retrieve_chunks)
    graph.add_node("chunk_evaluator", chunk_evaluator)
    graph.add_node("direct_answer", direct_answer)
    graph.add_node("generator", generate_answer)
    graph.add_node("answer_checker", answer_checker)
    graph.add_node("self_corrector", self_corrector)

    # Entry point
    graph.set_entry_point("query_analyzer")

    # Query analyzer routing
    graph.add_conditional_edges(
        "query_analyzer",
        route_after_analysis,
        {
            "direct_answer": "direct_answer",
            "query_reformulator": "query_reformulator",
            "retriever": "retriever",
        },
    )

    # Direct answer → END
    graph.add_edge("direct_answer", END)

    # Reformulator → retriever
    graph.add_edge("query_reformulator", "retriever")

    # Retriever → chunk evaluator
    graph.add_edge("retriever", "chunk_evaluator")

    # Chunk evaluator routing (includes self-correction loop)
    graph.add_conditional_edges(
        "chunk_evaluator",
        route_after_evaluation,
        {
            "self_corrector": "self_corrector",
            "generator": "generator",
        },
    )

    # Self-corrector loops back to retriever
    graph.add_edge("self_corrector", "retriever")

    # Generator → answer checker
    graph.add_edge("generator", "answer_checker")

    # Answer checker routing (includes self-correction loop)
    graph.add_conditional_edges(
        "answer_checker",
        route_after_check,
        {
            END: END,
            "self_corrector": "self_corrector",
        },
    )

    return graph


# ---------------------------------------------------------------------------
# Compiled graph (lazy — only when deps available)
# ---------------------------------------------------------------------------

def _compile_graph():
    """Lazily compile the graph so the module can be imported without deps."""
    if not LANGGRAPH_AVAILABLE:
        return None
    return build_agentic_rag_graph().compile()


agentic_rag_graph = _compile_graph()


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

async def agentic_answer(query: str) -> dict[str, Any]:
    """
    Run the agentic RAG pipeline on a query.

    Returns:
        dict with 'answer', 'sources', 'steps', and quality metadata
    """
    if agentic_rag_graph is None:
        raise RuntimeError(
            "Agentic RAG graph not compiled. "
            "Install deps: pip install langgraph langchain-core langchain-openai"
        )

    logger.info("Starting agentic RAG for query: %s", query[:80])
    initial_state = AgenticRAGState(query=query)
    result = await agentic_rag_graph.ainvoke(initial_state)

    answer = result.get("final_answer") or result.get("draft_answer", "")
    logger.info("Agentic RAG complete: quality=%s, attempts=%d", result.get("answer_quality"), result.get("attempt", 0))

    return {
        "query": query,
        "answer": answer,
        "sources": result.get("sources", []),
        "steps": result.get("step_log", []),
        "attempts": result.get("attempt", 0),
        "quality": result.get("answer_quality", "unknown"),
        "pipeline": "agentic_rag",
    }


async def agentic_answer_stream(query: str):
    """
    Stream agentic RAG pipeline events as they happen.

    Yields dicts with 'event', 'data', and 'step' keys for real-time UI updates.
    """
    if agentic_rag_graph is None:
        raise RuntimeError(
            "Agentic RAG graph not compiled. "
            "Install deps: pip install langgraph langchain-core langchain-openai"
        )

    logger.info("Starting streaming agentic RAG for query: %s", query[:80])
    initial_state = AgenticRAGState(query=query)

    async for event in agentic_rag_graph.astream(initial_state):
        for node_name, node_output in event.items():
            step_info = {
                "event": "node_complete",
                "node": node_name,
                "data": {},
            }

            # Include relevant state in the stream event
            if "step_log" in node_output:
                step_info["data"]["steps"] = node_output["step_log"]
            if "final_answer" in node_output and node_output["final_answer"]:
                step_info["data"]["answer"] = node_output["final_answer"]
            if "query_type" in node_output:
                step_info["data"]["query_type"] = node_output["query_type"].value if hasattr(node_output["query_type"], "value") else str(node_output["query_type"])
            if "retrieved_chunks" in node_output:
                step_info["data"]["chunk_count"] = len(node_output["retrieved_chunks"])
            if "filtered_chunks" in node_output:
                step_info["data"]["filtered_count"] = len(node_output["filtered_chunks"])
            if "answer_quality" in node_output:
                step_info["data"]["quality"] = node_output["answer_quality"]

            yield step_info

    logger.info("Streaming agentic RAG complete for: %s", query[:80])


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import asyncio
    import sys

    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")

    async def main():
        query = " ".join(sys.argv[1:]) or "योगः किम्?"
        print(f"🔍 Query: {query}\n")
        result = await agentic_answer(query)
        print(f"Steps: {len(result['steps'])}")
        for step in result["steps"]:
            print(f"  → {step}")
        print(f"\n📝 Answer:\n{result['answer']}")
        print(f"\nQuality: {result['quality']} (attempts: {result['attempts']})")

    asyncio.run(main())
