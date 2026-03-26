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
        "level": "Beginner",
        "duration": "2 weeks",
        "focus": "Script basics, pronunciation, and essential vocabulary.",
    },
    {
        "slug": "gita-guided-reading",
        "title": "Bhagavad Gita Guided Reading",
        "level": "Intermediate",
        "duration": "4 weeks",
        "focus": "Verse-by-verse study with transliteration and explanation.",
    },
    {
        "slug": "grammar-lab",
        "title": "Grammar Lab",
        "level": "Advanced",
        "duration": "Ongoing",
        "focus": "Sandhi, compounds, morphology, and syntax analysis.",
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
DIGITS = {"०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9"}
VIRAMA = "्"


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    mode: Literal["learn", "translate", "analyze"] = "learn"


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


class GroundedSource(BaseModel):
    source: str
    chunk_id: int | str
    text: str


class GroundedAnswerResponse(BaseModel):
    reply: str
    model: str
    sources: list[GroundedSource]


app = FastAPI(title="SanskritNova AI API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _require_api_key() -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured.")
    return api_key


def _openrouter_headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {_require_api_key()}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_APP_URL", "http://localhost:3000"),
        "X-Title": os.getenv("OPENROUTER_APP_NAME", "SanskritNova AI"),
    }


def _openrouter_model() -> str:
    return os.getenv("OPENROUTER_MODEL", "openai/gpt-4.1-mini")


def _mode_instruction(mode: str) -> str:
    if mode == "translate":
        return "Translate the input clearly. Preserve nuance and include transliteration."
    if mode == "analyze":
        return "Analyze the Sanskrit grammar, meaning, and context. Keep it readable."
    return "Teach the user as a Sanskrit tutor. Use examples."


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
    chunks_path = Path("code/chunks.npy")
    if not chunks_path.exists():
        return []
    try:
        chunks = np.load(chunks_path, allow_pickle=True).tolist()
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


async def _grounded_openrouter_answer(message: str, sources: list[dict[str, object]]) -> str:
    context = "\n\n".join(f"[{s['source']}#{s['chunk_id']}]\n{s['text']}" for s in sources)
    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": f"Context:\n{context}"},
            {"role": "user", "content": message},
        ],
    }
    async with httpx.AsyncClient(timeout=45.0) as client:
        response = await client.post(OPENROUTER_URL, headers=_openrouter_headers(), json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"].strip()


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "sanskritnova-ai-api"}


@app.get("/api/info")
async def info():
    return {
        "name": "SanskritNova AI",
        "provider": "openrouter",
        "chat_modes": ["learn", "translate", "analyze"],
        "grounded_answer": True,
        "transliteration": True,
    }


@app.get("/api/tracks", response_model=list[Track])
async def tracks():
    return [Track(**track) for track in LEARNING_TRACKS]


@app.post("/api/transliterate", response_model=TransliterationResponse)
async def transliterate_api(request: TransliterationRequest):
    return TransliterationResponse(
        devanagari=request.text,
        iast=transliterate_to_iast(request.text),
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat_api(request: ChatRequest):
    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": _mode_instruction(request.mode)},
            {"role": "user", "content": request.message},
        ],
    }
    async with httpx.AsyncClient(timeout=45.0) as client:
        response = await client.post(OPENROUTER_URL, headers=_openrouter_headers(), json=payload)
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"].strip()
    return ChatResponse(reply=reply, model=_openrouter_model(), mode=request.mode)


@app.post("/api/grounded-answer", response_model=GroundedAnswerResponse)
async def grounded_api(request: GroundedAnswerRequest):
    sources = _retrieve_grounded_results(request.message, request.k)
    reply = await _grounded_openrouter_answer(request.message, sources)
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
