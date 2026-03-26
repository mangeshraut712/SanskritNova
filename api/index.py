from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="SanskritNova API", version="1.0.0")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    mode: str = Field(default="learn")


class GroundedRequest(BaseModel):
    message: str = Field(..., min_length=1)
    k: int = Field(default=3, ge=1, le=10)


class TranslitRequest(BaseModel):
    text: str = Field(..., min_length=1)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/info")
def info():
    return {"version": "1.0.0", "name": "SanskritNova API"}


@app.post("/chat")
def chat(request: ChatRequest):
    # Placeholder response - replace with actual AI integration
    return {
        "reply": f"Echo: {request.message}. (AI integration pending)"
    }


@app.post("/grounded-answer")
def grounded_answer(request: GroundedRequest):
    # Placeholder response - replace with actual RAG integration
    return {
        "answer": f"Based on the context for: {request.message}",
        "sources": []
    }


@app.post("/transliterate")
def transliterate(request: TranslitRequest):
    # Simple Devanagari to IAST placeholder
    # Replace with actual transliteration logic
    devanagari_to_iast = {
        'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
        'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
        'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
        'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
        'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
        'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
        'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
        'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
        'ं': 'ṃ', 'ः': 'ḥ', '्': '',
    }
    
    result = ""
    for char in request.text:
        result += devanagari_to_iast.get(char, char)
    
    return {"iast": result}
