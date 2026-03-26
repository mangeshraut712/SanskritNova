from __future__ import annotations

import os
from pathlib import Path
from typing import Literal

import httpx
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from mangum import Mangum
except ImportError:  # pragma: no cover
    Mangum = None


OPENROUTER_URL = os.getenv(
    "OPENROUTER_BASE_URL",
    "https://openrouter.ai/api/v1/chat/completions",
)

LEARNING_TRACKS = [
    {
        "slug": "sanskrit-foundations",
        "title": "Sanskrit Foundations",
        "title_hi": "संस्कृत आधार",
        "level": "Beginner",
        "level_hi": "शुरुआती",
        "duration": "2 weeks",
        "duration_hi": "2 सप्ताह",
        "focus": "Script basics, pronunciation, and essential vocabulary.",
        "focus_hi": "लिपि मूल बातें, उच्चारण, और आवश्यक शब्दावली।",
    },
    {
        "slug": "gita-guided-reading",
        "title": "Bhagavad Gita Guided Reading",
        "title_hi": "भगवद् गीता निर्देशित पठन",
        "level": "Intermediate",
        "level_hi": "मध्यवर्ती",
        "duration": "4 weeks",
        "duration_hi": "4 सप्ताह",
        "focus": "Verse-by-verse study with transliteration and explanation.",
        "focus_hi": "लिप्यंतरण और व्याख्या के साथ श्लोक-दर-श्लोक अध्ययन।",
    },
    {
        "slug": "grammar-lab",
        "title": "Grammar Lab",
        "title_hi": "व्याकरण प्रयोगशाला",
        "level": "Advanced",
        "level_hi": "उन्नत",
        "duration": "Ongoing",
        "duration_hi": "निरंतर",
        "focus": "Sandhi, compounds, morphology, and syntax analysis.",
        "focus_hi": "संधि, समास, रूपविज्ञान और वाक्य विश्लेषण।",
    },
]

SYSTEM_PROMPT = """You are SanskritNova AI, an expert Sanskrit learning guide.

Rules:
- Teach with clarity and cultural respect.
- Default to concise explanations unless the learner asks for depth.
- Use Sanskrit examples when helpful and explain them in accessible English.
- When asked to transliterate, provide both Devanagari and Roman transliteration.
- If a claim is uncertain, say so directly instead of inventing details.
"""

INDEPENDENT_VOWELS = {
    "अ": "a",
    "आ": "ā",
    "इ": "i",
    "ई": "ī",
    "उ": "u",
    "ऊ": "ū",
    "ऋ": "ṛ",
    "ॠ": "ṝ",
    "ऌ": "ḷ",
    "ॡ": "ḹ",
    "ए": "e",
    "ऐ": "ai",
    "ओ": "o",
    "औ": "au",
}

CONSONANTS = {
    "क": "k",
    "ख": "kh",
    "ग": "g",
    "घ": "gh",
    "ङ": "ṅ",
    "च": "c",
    "छ": "ch",
    "ज": "j",
    "झ": "jh",
    "ञ": "ñ",
    "ट": "ṭ",
    "ठ": "ṭh",
    "ड": "ḍ",
    "ढ": "ḍh",
    "ण": "ṇ",
    "त": "t",
    "थ": "th",
    "द": "d",
    "ध": "dh",
    "न": "n",
    "प": "p",
    "फ": "ph",
    "ब": "b",
    "भ": "bh",
    "म": "m",
    "य": "y",
    "र": "r",
    "ल": "l",
    "व": "v",
    "श": "ś",
    "ष": "ṣ",
    "स": "s",
    "ह": "h",
}

VOWEL_SIGNS = {
    "ा": "ā",
    "ि": "i",
    "ी": "ī",
    "ु": "u",
    "ू": "ū",
    "ृ": "ṛ",
    "ॄ": "ṝ",
    "ॢ": "ḷ",
    "ॣ": "ḹ",
    "े": "e",
    "ै": "ai",
    "ो": "o",
    "ौ": "au",
}

MARKS = {"ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "।": ".", "॥": ".."}
DIGITS = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
}
VIRAMA = "्"
REPO_ROOT = Path(__file__).resolve().parent.parent
LEGACY_CHUNKS_PATH = REPO_ROOT / "code/chunks.npy"
_LOCAL_RETRIEVER = None


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    mode: Literal["learn", "translate", "analyze"] = "learn"
    lang: str = "en"


class ChatResponse(BaseModel):
    reply: str
    model: str
    mode: str


class Track(BaseModel):
    slug: str
    title: str
    level: str
    duration: str
    focus: str


class TransliterationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=4000)


class TransliterationResponse(BaseModel):
    devanagari: str
    iast: str


class GroundedAnswerRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    k: int = Field(default=3, ge=1, le=8)
    lang: str = "en"


class GroundedSource(BaseModel):
    source: str
    chunk_id: int | str
    text: str


class GroundedAnswerResponse(BaseModel):
    reply: str
    model: str
    sources: list[GroundedSource]


app = FastAPI(title="SanskritNova AI API", version="2.0.0")

# LangGraph dependencies (optional, for agentic RAG)
try:
    from code.agentic_rag import agentic_answer, AgenticRAGState
    AGENTIC_RAG_AVAILABLE = True
except ImportError:
    AGENTIC_RAG_AVAILABLE = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _require_api_key() -> str:
    """Return the OPENROUTER_API_KEY or raise 500 if unconfigured."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured.")
    return api_key


def _openrouter_headers() -> dict[str, str]:
    """Build HTTP headers for OpenRouter API requests."""
    return {
        "Authorization": f"Bearer {_require_api_key()}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_APP_URL", "http://localhost:3000"),
        "X-Title": os.getenv("OPENROUTER_APP_NAME", "SanskritNova AI"),
    }


def _openrouter_model() -> str:
    """Return the configured OpenRouter model name."""
    return os.getenv("OPENROUTER_MODEL", "openai/gpt-4.1-mini")


def _mode_instruction(mode: str, lang: str = "en") -> str:
    """Return the system instruction for a given chat mode and language."""
    if lang == "hi":
        if mode == "translate":
            return "इनपुट को स्पष्ट रूप से अनुवाद करें। बारीकियों को बनाए रखें और लिप्यंतरण शामिल करें।"
        if mode == "analyze":
            return "संस्कृत व्याकरण, अर्थ और संदर्भ का विश्लेषण करें। इसे पठनीय रखें।"
        return "उपयोगकर्ता को संस्कृत शिक्षक के रूप में सिखाएं। उदाहरणों का उपयोग करें।"
    else:
        if mode == "translate":
            return "Translate the input clearly. Preserve nuance and include transliteration."
        if mode == "analyze":
            return "Analyze the Sanskrit grammar, meaning, and context. Keep it readable."
        return "Teach the user as a Sanskrit tutor. Use examples."


def _load_local_retriever():
    """Lazily load and cache the sanskrit_rag Retriever. Returns None on failure."""
    global _LOCAL_RETRIEVER

    if _LOCAL_RETRIEVER is not None:
        return _LOCAL_RETRIEVER

    try:
        from sanskrit_rag.retriever import Retriever
    except Exception:
        return None

    try:
        retriever = Retriever()
    except Exception:
        return None

    _LOCAL_RETRIEVER = retriever
    return retriever


def _retrieve_with_local_retriever(query: str, k: int) -> list[dict[str, object]]:
    """Retrieve results from the local FAISS-backed retriever."""
    retriever = _load_local_retriever()
    if retriever is None:
        return []

    try:
        return [
            {
                "source": item["source"],
                "chunk_id": item["chunk_id"],
                "text": item["text"],
            }
            for item in retriever.retrieve(query, k=k)
        ]
    except Exception:
        return []


def _retrieve_from_legacy_chunks(query: str, k: int) -> list[dict[str, object]]:
    """Fallback retrieval using naive token-count scoring on legacy chunks.npy."""
    if not LEGACY_CHUNKS_PATH.exists():
        return []

    try:
        chunks = np.load(LEGACY_CHUNKS_PATH, allow_pickle=False).tolist()
    except Exception:
        return []

    tokens = [token for token in query.lower().split() if token]
    ranked = []
    for index, text in enumerate(chunks):
        text_str = str(text)
        score = sum(text_str.lower().count(token) for token in tokens) if tokens else 0
        ranked.append((score, index, text_str))
    ranked.sort(key=lambda item: item[0], reverse=True)
    return [
        {"source": "SanskritCorpus", "chunk_id": item[1], "text": item[2]}
        for item in ranked[:k]
    ]


def _grounded_answer_available() -> bool:
    """Check whether grounded answers can be served (API key + retriever or chunks)."""
    if not os.getenv("OPENROUTER_API_KEY"):
        return False

    if LEGACY_CHUNKS_PATH.exists():
        return True

    return _load_local_retriever() is not None


async def _openrouter_completion(payload: dict[str, object]) -> str:
    """Send a chat completion request to OpenRouter and return the assistant reply."""
    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=_openrouter_headers(),
                json=payload,
            )
            response.raise_for_status()
            body = response.json()
            return body["choices"][0]["message"]["content"].strip()
    except (httpx.HTTPError, KeyError, ValueError) as exc:
        raise HTTPException(status_code=502, detail="OpenRouter request failed.") from exc


def transliterate_to_iast(text: str) -> str:
    output: list[str] = []
    index = 0
    while index < len(text):
        char = text[index]
        if char in INDEPENDENT_VOWELS:
            output.append(INDEPENDENT_VOWELS[char])
            index += 1
            continue
        if char in CONSONANTS:
            chunk = CONSONANTS[char]
            next_char = text[index + 1] if index + 1 < len(text) else ""
            if next_char == VIRAMA:
                output.append(chunk)
                index += 2
                continue
            if next_char in VOWEL_SIGNS:
                output.append(chunk + VOWEL_SIGNS[next_char])
                index += 2
                continue
            output.append(chunk + "a")
            index += 1
            continue
        if char in MARKS:
            output.append(MARKS[char])
            index += 1
            continue
        if char in DIGITS:
            output.append(DIGITS[char])
            index += 1
            continue
        if char in VOWEL_SIGNS or char == VIRAMA:
            index += 1
            continue
        output.append(char)
        index += 1
    return "".join(output)


def _retrieve_grounded_results(query: str, k: int) -> list[dict[str, object]]:
    results = _retrieve_with_local_retriever(query, k)
    if results:
        return results
    return _retrieve_from_legacy_chunks(query, k)


async def _grounded_openrouter_answer(
    message: str,
    sources: list[dict[str, object]],
    lang: str = "en",
) -> str:
    context = "\n\n".join(f"[{s['source']}#{s['chunk_id']}]\n{s['text']}" for s in sources)
    system_prompt = SYSTEM_PROMPT
    if lang == "hi":
        system_prompt = """आप संस्कृतनोवा AI हैं, एक विशेषज्ञ संस्कृत शिक्षक।

नियम:
- स्पष्टता के साथ सिखाएं और सांस्कृतिक सम्मान बनाए रखें।
- उपयोगकर्ता पूछे बिना गहराई से समझाएं।
- सहायक अंग्रेजी में संस्कृत उदाहरणों का उपयोग करें।
- लिप्यंतरण के लिए पूछे जाने पर देवनागरी और रोमन लिप्यंतरण दोनों प्रदान करें।
- यदि कोई दावा अनिश्चित है तो सीधे कहें।"""
    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "system", "content": f"Context:\n{context}"},
            {"role": "user", "content": message},
        ],
    }
    return await _openrouter_completion(payload)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "sanskritnova-ai-api"}


class AgenticAnswerRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)


class AgenticAnswerResponse(BaseModel):
    reply: str
    sources: list[GroundedSource]
    steps: list[str]
    attempts: int
    quality: str


@app.post("/api/agentic-answer", response_model=AgenticAnswerResponse)
async def agentic_rag_api(request: AgenticAnswerRequest):
    """
    Agentic RAG endpoint — query analysis, retrieval routing,
    chunk evaluation, self-correction loops, and answer validation.
    """
    if not AGENTIC_RAG_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Agentic RAG not available. Install: pip install langgraph langchain-openai"
        )
    if not os.getenv("OPENROUTER_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured.")

    result = await agentic_answer(request.message)
    return AgenticAnswerResponse(
        reply=result["answer"],
        sources=[GroundedSource(**s) for s in result["sources"]],
        steps=result["steps"],
        attempts=result["attempts"],
        quality=result["quality"],
    )


@app.get("/api/info")
async def info():
    return {
        "name": "SanskritNova AI",
        "provider": "openrouter",
        "chat_modes": ["learn", "translate", "analyze"],
        "grounded_answer": _grounded_answer_available(),
        "agentic_rag": AGENTIC_RAG_AVAILABLE,
        "transliteration": True,
    }


@app.get("/api/tracks", response_model=list[Track])
async def tracks(lang: str = "en"):
    tracks_data = []
    for track in LEARNING_TRACKS:
        if lang == "hi":
            track_data = {
                "slug": track["slug"],
                "title": track.get("title_hi", track["title"]),
                "level": track.get("level_hi", track["level"]),
                "duration": track.get("duration_hi", track["duration"]),
                "focus": track.get("focus_hi", track["focus"]),
            }
        else:
            track_data = {
                "slug": track["slug"],
                "title": track["title"],
                "level": track["level"],
                "duration": track["duration"],
                "focus": track["focus"],
            }
        tracks_data.append(Track(**track_data))
    return tracks_data


@app.post("/api/transliterate", response_model=TransliterationResponse)
async def transliterate_api(request: TransliterationRequest):
    return TransliterationResponse(
        devanagari=request.text,
        iast=transliterate_to_iast(request.text),
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat_api(request: ChatRequest):
    system_prompt = SYSTEM_PROMPT
    if request.lang == "hi":
        system_prompt = """आप संस्कृतनोवा AI हैं, एक विशेषज्ञ संस्कृत शिक्षक।

नियम:
- स्पष्टता के साथ सिखाएं और सांस्कृतिक सम्मान बनाए रखें।
- उपयोगकर्ता पूछे बिना गहराई से समझाएं।
- सहायक अंग्रेजी में संस्कृत उदाहरणों का उपयोग करें।
- लिप्यंतरण के लिए पूछे जाने पर देवनागरी और रोमन लिप्यंतरण दोनों प्रदान करें।
- यदि कोई दावा अनिश्चित है तो सीधे कहें।"""

    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "system", "content": _mode_instruction(request.mode, request.lang)},
            {"role": "user", "content": request.message},
        ],
    }
    reply = await _openrouter_completion(payload)
    return ChatResponse(reply=reply, model=_openrouter_model(), mode=request.mode)


@app.post("/api/grounded-answer", response_model=GroundedAnswerResponse)
async def grounded_api(request: GroundedAnswerRequest):
    sources = _retrieve_grounded_results(request.message, request.k)
    if not sources:
        raise HTTPException(status_code=503, detail="Grounded sources unavailable.")
    reply = await _grounded_openrouter_answer(request.message, sources, request.lang)
    return GroundedAnswerResponse(
        reply=reply,
        model=_openrouter_model(),
        sources=[GroundedSource(**source) for source in sources],
    )


handler = Mangum(app) if Mangum is not None else None


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host=os.getenv("API_HOST", "127.0.0.1"),
        port=int(os.getenv("API_PORT", "8000")),
    )
