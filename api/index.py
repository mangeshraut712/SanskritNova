from __future__ import annotations

import os
from pathlib import Path
from typing import Literal

import httpx
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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

MARKS = {
    "ं": "ṃ",
    "ः": "ḥ",
    "ँ": "m̐",
    "ऽ": "'",
    "।": ".",
    "॥": "..",
}

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


app = FastAPI(
    title="SanskritNova AI API",
    version="2.0.0",
    description="FastAPI backend for SanskritNova AI, deployed as a Vercel Python function.",
)

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
        raise HTTPException(
            status_code=500,
            detail=(
                "OPENROUTER_API_KEY is not configured. Add it to your local environment "
                "or the Vercel project environment variables."
            ),
        )
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
    if mode == "grounded":
        return "Answer with explicit grounding and use only retrieved context when available."
    if mode == "translate":
        return (
            "Translate the user input clearly. Preserve nuance and include "
            "transliteration when useful."
        )
    if mode == "analyze":
        return "Analyze the Sanskrit grammar, meaning, and context. Keep the structure readable."
    return "Teach the user as a Sanskrit tutor. Use examples and keep the explanation practical."


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


def _fallback_grounded_results(query: str, k: int) -> list[dict[str, object]]:
    chunks_path = Path("code/chunks.npy")
    if not chunks_path.exists():
        raise FileNotFoundError(
            "Missing Sanskrit chunk index at code/chunks.npy. Build the original RAG index first."
        )

    chunks = np.load(chunks_path, allow_pickle=True).tolist()
    tokens = [token for token in query.lower().split() if token]
    ranked = []
    for index, chunk in enumerate(chunks):
        text = str(chunk)
        lowered = text.lower()
        score = sum(lowered.count(token) for token in tokens) if tokens else 0
        ranked.append((score, index, text))

    ranked.sort(key=lambda item: (item[0], -item[1]), reverse=True)
    return [
        {"source": "Rag-docs.docx", "chunk_id": index, "text": text}
        for _, index, text in ranked[:k]
        if text.strip()
    ]


def _retrieve_grounded_results(query: str, k: int) -> list[dict[str, object]]:
    try:
        from sanskrit_rag.retriever import Retriever

        return Retriever().retrieve(query, k=k)
    except Exception:
        return _fallback_grounded_results(query, k)


async def _grounded_openrouter_answer(message: str, sources: list[dict[str, object]]) -> str:
    context = "\n\n".join(
        f"[{item['source']}#{item['chunk_id']}]\n{item['text']}" for item in sources
    )
    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "system",
                "content": (
                    "Use only the supplied Sanskrit context. Answer clearly. "
                    "End with a short 'Sources:' line using the provided source labels."
                ),
            },
            {"role": "system", "content": f"Context:\n{context}"},
            {"role": "user", "content": message},
        ],
    }

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                OPENROUTER_URL, headers=_openrouter_headers(), json=payload
            )
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    body = response.json()
    try:
        return body["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="Invalid response from OpenRouter.") from exc


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "sanskritai-studio-api"}


@app.get("/api/info")
async def info() -> dict[str, object]:
    return {
        "name": "SanskritNova AI",
        "frontend": "static-site",
        "backend": "fastapi",
        "provider": "openrouter",
        "chat_modes": ["learn", "translate", "analyze"],
        "grounded_answer": True,
        "transliteration": True,
    }


@app.get("/api/tracks", response_model=list[Track])
async def tracks() -> list[Track]:
    return [Track(**track) for track in LEARNING_TRACKS]


@app.post("/api/transliterate", response_model=TransliterationResponse)
async def transliterate(request: TransliterationRequest) -> TransliterationResponse:
    return TransliterationResponse(
        devanagari=request.text,
        iast=transliterate_to_iast(request.text),
    )


@app.post("/api/grounded-answer", response_model=GroundedAnswerResponse)
async def grounded_answer(request: GroundedAnswerRequest) -> GroundedAnswerResponse:
    try:
        sources = _retrieve_grounded_results(request.message, request.k)
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    reply = await _grounded_openrouter_answer(request.message, sources)
    return GroundedAnswerResponse(
        reply=reply,
        model=_openrouter_model(),
        sources=[GroundedSource(**source) for source in sources],
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": _mode_instruction(request.mode)},
            {"role": "user", "content": request.message},
        ],
    }

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                OPENROUTER_URL, headers=_openrouter_headers(), json=payload
            )
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=exc.response.status_code,
            detail=exc.response.text,
        ) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    body = response.json()
    try:
        reply = body["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="Invalid response from OpenRouter.") from exc

    return ChatResponse(reply=reply, model=_openrouter_model(), mode=request.mode)
