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
    "अ": "a", "आ": "ā", "इ": "i", "ई": "ī", "उ": "u", "ऊ": "ū",
    "ऋ": "ṛ", "ॠ": "ṝ", "ऌ": "ḷ", "ॡ": "ḹ", "ए": "e", "ऐ": "ai",
    "ओ": "o", "औ": "au",
}

CONSONANTS = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ṅ",
    "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "ñ",
    "ट": "ṭ", "ठ": "ṭh", "ड": "ḍ", "ढ": "ḍh", "ण": "ṇ",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v", "श": "ś",
    "ष": "ṣ", "स": "s", "ह": "h",
}

VOWEL_SIGNS = {
    "ा": "ā", "ि": "i", "ी": "ī", "ु": "u", "ू": "ū",
    "ृ": "ṛ", "ॄ": "ṝ", "ॢ": "ḷ", "ॣ": "ḹ", "े": "e",
    "ै": "ai", "ो": "o", "ौ": "au",
}

MARKS = {
    "ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "।": ".", "॥": "..",
}

DIGITS = {
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
}

VIRAMA = "्"

# --- Models ---

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
    text: str = Field(..., min_length=1)

class TransliterationResponse(BaseModel):
    devanagari: str
    iast: str

class GroundedAnswerRequest(BaseModel):
    message: str = Field(..., min_length=1)
    k: int = Field(default=3, ge=1, le=8)

class GroundedSource(BaseModel):
    source: str
    chunk_id: int | str
    text: str

class GroundedAnswerResponse(BaseModel):
    reply: str
    model: str
    sources: list[GroundedSource]

class TranslateRequest(BaseModel):
    text: str = Field(..., min_length=1)
    target_language: str = "en"

class TranslateResponse(BaseModel):
    translated_text: str
    detected_source_language: str

class VisionRequest(BaseModel):
    image_base64: str = Field(..., description="Base64 encoded image string")

class VisionResponse(BaseModel):
    text: str
    explanation: str | None = None

# --- App ---

app = FastAPI(
    title="SanskritNova AI API",
    version="2.0.0",
    description="FastAPI backend for SanskritNova AI.",
)


@app.get("/health")
async def health_check():
    """Health check endpoint for debugging."""
    return {
        "status": "ok",
        "env": {
            "OPENROUTER_API_KEY": bool(os.getenv("OPENROUTER_API_KEY")),
            "OPENROUTER_MODEL": os.getenv("OPENROUTER_MODEL", "not set"),
            "GOOGLE_API_KEY": bool(os.getenv("GOOGLE_API_KEY")),
        }
    }


@app.on_event("startup")
async def startup_event():
    """Log environment variables status on startup."""
    import sys
    print("=== Vercel Environment Check ===", file=sys.stderr)
    print(f"OPENROUTER_API_KEY set: {bool(os.getenv('OPENROUTER_API_KEY'))}", file=sys.stderr)
    print(f"OPENROUTER_MODEL: {os.getenv('OPENROUTER_MODEL', 'not set')}", file=sys.stderr)
    print(f"GOOGLE_API_KEY set: {bool(os.getenv('GOOGLE_API_KEY'))}", file=sys.stderr)
    print("===================================", file=sys.stderr)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helpers ---

def _require_api_key() -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENROUTER_API_KEY not configured."
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
    return os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")

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
    """Retrieve grounding results from local corpus.
    
    Returns empty list if files don't exist (for Vercel compatibility).
    """
    chunks_path = Path("code/chunks.npy")
    if not chunks_path.exists():
        # Return empty results for Vercel (no local files)
        return []
    try:
        chunks = np.load(chunks_path, allow_pickle=True).tolist()
    except Exception:
        return []
    tokens = [t for t in query.lower().split() if t]
    ranked = []
    for idx, text in enumerate(chunks):
        text_str = str(text)
        score = sum(text_str.lower().count(t) for t in tokens) if tokens else 0
        ranked.append((score, idx, text_str))
    ranked.sort(key=lambda x: x[0], reverse=True)
    return [{"source": "SanskritCorpus", "chunk_id": x[1], "text": x[2]} for x in ranked[:k]]

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
        res = await client.post(OPENROUTER_URL, headers=_openrouter_headers(), json=payload)
        res.raise_for_status()
        return res.json()["choices"][0]["message"]["content"].strip()

# --- Routes ---

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "sanskritnova-ai-api"}

@app.get("/api/info")
async def info():
    return {
        "name": "SanskritNova AI",
        "provider": "openrouter + google",
        "features": ["chat", "grounded", "transliteration", "vision", "translate"]
    }

@app.get("/api/tracks", response_model=list[Track])
async def tracks():
    return [Track(**t) for t in LEARNING_TRACKS]

@app.post("/api/transliterate", response_model=TransliterationResponse)
async def transliterate_api(request: TransliterationRequest):
    return TransliterationResponse(
        devanagari=request.text,
        iast=transliterate_to_iast(request.text)
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
        res = await client.post(OPENROUTER_URL, headers=_openrouter_headers(), json=payload)
        res.raise_for_status()
        reply = res.json()["choices"][0]["message"]["content"].strip()
    return ChatResponse(reply=reply, model=_openrouter_model(), mode=request.mode)

@app.post("/api/grounded-answer", response_model=GroundedAnswerResponse)
async def grounded_api(request: GroundedAnswerRequest):
    sources = _retrieve_grounded_results(request.message, request.k)
    reply = await _grounded_openrouter_answer(request.message, sources)
    return GroundedAnswerResponse(reply=reply, model=_openrouter_model(), sources=[GroundedSource(**s) for s in sources])

@app.post("/api/translate-google", response_model=TranslateResponse)
async def translate_google(request: TranslateRequest):
    api_key = os.getenv("GOOGLE_API_KEY")
    url = f"https://translation.googleapis.com/language/translate/v2?key={api_key}"
    payload = {"q": request.text, "target": request.target_language, "format": "text"}
    async with httpx.AsyncClient() as client:
        res = await client.post(url, json=payload)
        res.raise_for_status()
        data = res.json()["data"]["translations"][0]
        return TranslateResponse(translated_text=data["translatedText"], detected_source_language=data.get("detectedSourceLanguage", "sa"))

@app.post("/api/vision-ocr", response_model=VisionResponse)
async def vision_google(request: VisionRequest):
    api_key = os.getenv("GOOGLE_API_KEY")
    url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"
    payload = {"requests": [{"image": {"content": request.image_base64}, "features": [{"type": "TEXT_DETECTION"}]}]}
    async with httpx.AsyncClient() as client:
        res = await client.post(url, json=payload)
        res.raise_for_status()
        data = res.json()["responses"][0]
        full_text = data.get("textAnnotations", [{}])[0].get("description", "")
        explanation = ""
        if full_text:
            payload_chat = {
                "model": _openrouter_model(),
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"Briefly explain this Sanskrit text: {full_text}"}
                ]
            }
            ai_res = await client.post(OPENROUTER_URL, headers=_openrouter_headers(), json=payload_chat)
            if ai_res.is_success:
                explanation = ai_res.json()["choices"][0]["message"]["content"].strip()
        return VisionResponse(text=full_text, explanation=explanation)


# Vercel serverless function handler
handler = None
try:
    from mangum import Mangum

    handler = Mangum(app)
except Exception as e:
    import sys
    print(f"ERROR: Failed to create Mangum handler: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc(file=sys.stderr)

# For local development
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host=os.getenv("API_HOST", "127.0.0.1"),
        port=int(os.getenv("API_PORT", "8000")),
    )
