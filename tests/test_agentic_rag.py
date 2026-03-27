"""
Tests for the Agentic RAG Pipeline
====================================
Tests the graph nodes, routing logic, and state management
without requiring actual LLM or retriever backends.
"""

from __future__ import annotations

import types

import pytest

# ---------------------------------------------------------------------------
# Stub out langgraph/langchain before importing agentic_rag
# ---------------------------------------------------------------------------

import sys


def _install_langgraph_stubs(monkeypatch):
    """Install minimal stubs for langgraph and langchain deps."""

    # langchain_core stubs
    lc_core = types.ModuleType("langchain_core")
    lc_core.__path__ = []

    messages_mod = types.ModuleType("langchain_core.messages")

    class _Msg:
        def __init__(self, content="", **kw):
            self.content = content

    messages_mod.HumanMessage = _Msg
    messages_mod.AIMessage = _Msg
    messages_mod.SystemMessage = _Msg

    parsers_mod = types.ModuleType("langchain_core.output_parsers")

    class _StrParser:
        def __or__(self, other):
            return _ChainStub()

        def __ror__(self, other):
            return _ChainStub()

        async def ainvoke(self, *a, **kw):
            return "retrieve"

    parsers_mod.StrOutputParser = _StrParser

    prompts_mod = types.ModuleType("langchain_core.prompts")

    class _Prompt:
        def __init__(self, *a, **kw):
            pass

        def __or__(self, other):
            return _ChainStub()

    class _ChatPromptTemplate:
        @staticmethod
        def from_messages(msgs):
            return _Prompt()

    prompts_mod.ChatPromptTemplate = _ChatPromptTemplate

    lc_core.messages = messages_mod
    lc_core.output_parsers = parsers_mod
    lc_core.prompts = prompts_mod

    # langchain_openai stubs
    lc_openai = types.ModuleType("langchain_openai")

    class _ChatOpenAI:
        def __init__(self, *a, **kw):
            pass

        def __or__(self, other):
            return _ChainStub()

    lc_openai.ChatOpenAI = _ChatOpenAI

    # langgraph stubs
    lg = types.ModuleType("langgraph")
    lg.__path__ = []
    lg_graph = types.ModuleType("langgraph.graph")
    lg_graph.END = "__end__"

    class _StateGraph:
        def __init__(self, state_cls):
            self._nodes = {}
            self._edges = []
            self._cond_edges = []
            self._entry = None

        def add_node(self, name, fn):
            self._nodes[name] = fn

        def add_edge(self, from_node, to_node):
            self._edges.append((from_node, to_node))

        def add_conditional_edges(self, from_node, router, mapping):
            self._cond_edges.append((from_node, router, mapping))

        def set_entry_point(self, name):
            self._entry = name

        def compile(self):
            return _CompiledGraph()

    class _CompiledGraph:
        async def ainvoke(self, state):
            return {
                "final_answer": "test answer",
                "sources": [],
                "step_log": ["step1", "step2"],
                "attempt": 0,
                "answer_quality": "good",
            }

        async def astream(self, state):
            yield {"query_analyzer": {"step_log": ["Query classified as: retrieve"]}}
            yield {"retriever": {"retrieved_chunks": [], "step_log": ["Retrieved 0 chunks"]}}

    lg_graph.StateGraph = _StateGraph

    monkeypatch.setitem(sys.modules, "langchain_core", lc_core)
    monkeypatch.setitem(sys.modules, "langchain_core.messages", messages_mod)
    monkeypatch.setitem(sys.modules, "langchain_core.output_parsers", parsers_mod)
    monkeypatch.setitem(sys.modules, "langchain_core.prompts", prompts_mod)
    monkeypatch.setitem(sys.modules, "langchain_openai", lc_openai)
    monkeypatch.setitem(sys.modules, "langgraph", lg)
    monkeypatch.setitem(sys.modules, "langgraph.graph", lg_graph)


class _ChainStub:
    async def ainvoke(self, *a, **kw):
        return "retrieve"


@pytest.fixture(autouse=True)
def _stubs(monkeypatch):
    _install_langgraph_stubs(monkeypatch)


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

def test_query_type_enum():
    from code.agentic_rag import QueryType

    assert QueryType.DIRECT.value == "direct"
    assert QueryType.RETRIEVE.value == "retrieve"
    assert QueryType.REFORMULATE.value == "reformulate"


def test_state_defaults():
    from code.agentic_rag import AgenticRAGState

    state = AgenticRAGState()
    assert state.query == ""
    assert state.attempt == 0
    assert state.max_attempts == 3
    assert state.step_log == []
    assert state.retrieved_chunks == []


def test_state_with_query():
    from code.agentic_rag import AgenticRAGState

    state = AgenticRAGState(query="योगः किम्?")
    assert state.query == "योगः किम्?"


def test_route_after_analysis_direct():
    from code.agentic_rag import route_after_analysis, AgenticRAGState, QueryType

    state = AgenticRAGState(query_type=QueryType.DIRECT)
    assert route_after_analysis(state) == "direct_answer"


def test_route_after_analysis_retrieve():
    from code.agentic_rag import route_after_analysis, AgenticRAGState, QueryType

    state = AgenticRAGState(query_type=QueryType.RETRIEVE)
    assert route_after_analysis(state) == "retriever"


def test_route_after_analysis_reformulate():
    from code.agentic_rag import route_after_analysis, AgenticRAGState, QueryType

    state = AgenticRAGState(query_type=QueryType.REFORMULATE)
    assert route_after_analysis(state) == "query_reformulator"


def test_route_after_evaluation_insufficient():
    from code.agentic_rag import route_after_evaluation, AgenticRAGState

    state = AgenticRAGState(answer_quality="insufficient")
    assert route_after_evaluation(state) == "self_corrector"


def test_route_after_evaluation_good():
    from code.agentic_rag import route_after_evaluation, AgenticRAGState

    state = AgenticRAGState(answer_quality="good", filtered_chunks=[{"text": "test"}])
    assert route_after_evaluation(state) == "generator"


def test_route_after_evaluation_max_attempts():
    from code.agentic_rag import route_after_evaluation, AgenticRAGState

    state = AgenticRAGState(answer_quality="insufficient", attempt=3, max_attempts=3)
    assert route_after_evaluation(state) == "generator"


def test_route_after_check_good():
    from code.agentic_rag import route_after_check, AgenticRAGState, END

    state = AgenticRAGState(answer_quality="good")
    assert route_after_check(state) == END


def test_route_after_check_retry():
    from code.agentic_rag import route_after_check, AgenticRAGState

    state = AgenticRAGState(answer_quality="insufficient", attempt=0, max_attempts=3)
    assert route_after_check(state) == "self_corrector"


def test_route_after_check_max_reached():
    from code.agentic_rag import route_after_check, AgenticRAGState, END

    state = AgenticRAGState(answer_quality="insufficient", attempt=3, max_attempts=3)
    assert route_after_check(state) == END


def test_build_graph():
    from code.agentic_rag import build_agentic_rag_graph

    graph = build_agentic_rag_graph()
    assert graph is not None


@pytest.mark.asyncio
async def test_agentic_answer():
    from code.agentic_rag import agentic_answer

    result = await agentic_answer("test query")
    assert "answer" in result
    assert "steps" in result
    assert result["pipeline"] == "agentic_rag"


@pytest.mark.asyncio
async def test_agentic_answer_stream():
    from code.agentic_rag import agentic_answer_stream

    events = []
    async for event in agentic_answer_stream("test query"):
        events.append(event)

    assert len(events) >= 1
    assert all("event" in e for e in events)
    assert all("node" in e for e in events)
