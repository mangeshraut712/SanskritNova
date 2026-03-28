import os
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="SanskritNova AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Learning tracks data
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

OPENROUTER_URL = os.getenv(
    "OPENROUTER_BASE_URL",
    "https://openrouter.ai/api/v1/chat/completions",
)

SYSTEM_PROMPT = """You are SanskritNova AI, an expert Sanskrit learning guide.

Rules:
- Teach with clarity and cultural respect.
- Default to concise explanations unless the learner asks for depth.
- Use Sanskrit examples when helpful and explain them in accessible English.
- When asked to transliterate, provide both Devanagari and Roman transliteration.
- If a claim is uncertain, say so directly instead of inventing details.
"""

# Transliteration mappings
INDEPENDENT_VOWELS = {
    "अ": "a", "आ": "ā", "इ": "i", "ई": "ī", "उ": "u", "ऊ": "ū",
    "ऋ": "ṛ", "ॠ": "ṝ", "ऌ": "ḷ", "ॡ": "ḹ", "ए": "e", "ऐ": "ai",
    "ओ": "o", "औ": "au"
}

CONSONANTS = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ṅ",
    "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "ñ",
    "ट": "ṭ", "ठ": "ṭh", "ड": "ḍ", "ढ": "ḍh", "ण": "ṇ",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v",
    "श": "ś", "ष": "ṣ", "स": "s", "ह": "h"
}

VOWEL_SIGNS = {
    "ा": "ā", "ि": "i", "ी": "ī", "ु": "u", "ू": "ū",
    "ृ": "ṛ", "ॄ": "ṝ", "ॢ": "ḷ", "ॣ": "ḹ",
    "े": "e", "ै": "ai", "ो": "o", "ौ": "au"
}

MARKS = {"ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "।": ".", "॥": ".."}
DIGITS = {"०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9"}
VIRAMA = "्"


def _openrouter_model() -> str:
    return os.getenv("OPENROUTER_MODEL", "openai/gpt-4.1-mini").strip()


def _mode_instruction(mode: str, lang: str = "en") -> str:
    if lang == "hi":
        if mode == "translate":
            return "इनपुट को स्पष्ट रूप से अनुवाद करें। बारीकियों को बनाए रखें और लिप्यंतरण शामिल करें।"
        if mode == "analyze":
            return "संस्कृत व्याकरण, अर्थ और संदर्भ का विश्लेषण करें। इसे पठनीय रखें।"
        return "उपयोगकर्ता को संस्कृत शिक्षक के रूप में सिखाएं। उदाहरणों का उपयोग करें।"

    if mode == "translate":
        return "Translate the input clearly. Preserve nuance and include transliteration."
    if mode == "analyze":
        return "Analyze the Sanskrit grammar, meaning, and context. Keep it readable."
    return "Teach the user as a Sanskrit tutor. Use examples."


def _fallback_chat_reply(message: str, mode: str, lang: str) -> str:
    lower_message = message.lower()

    if "yoga" in lower_message or "योग" in message:
        base = "योग (yoga) is commonly explained as union, disciplined practice, and inward integration."
    elif "dharma" in lower_message or "धर्म" in message:
        base = "धर्म (dharma) can refer to duty, right conduct, sustaining order, and what is fitting in context."
    else:
        base = "The live model is currently unavailable, but the SanskritNova API is still responding."

    if lang == "hi":
        return f"लाइव मॉडल अभी उपलब्ध नहीं है। {base}"

    return f"Live model temporarily unavailable. {base}"


async def _openrouter_reply(message: str, mode: str, lang: str) -> str | None:
    api_key = (os.getenv("OPENROUTER_API_KEY") or "").strip()
    if not api_key:
        return None

    payload = {
        "model": _openrouter_model(),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": _mode_instruction(mode, lang)},
            {"role": "user", "content": message},
        ],
    }

    async with httpx.AsyncClient(timeout=45.0) as client:
        response = await client.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": os.getenv("OPENROUTER_APP_URL", "https://sanskrit-nova.vercel.app").strip(),
                "X-Title": os.getenv("OPENROUTER_APP_NAME", "SanskritNova AI").strip(),
            },
            json=payload,
        )
        response.raise_for_status()
        body = response.json()
        return body["choices"][0]["message"]["content"].strip()

# Pydantic models
class Track(BaseModel):
    slug: str
    title: str
    level: str
    duration: str
    focus: str

class TransliterationRequest(BaseModel):
    text: str

class TransliterationResponse(BaseModel):
    devanagari: str
    iast: str

class ChatRequest(BaseModel):
    message: str
    mode: Literal["learn", "translate", "analyze"] = "learn"
    lang: str = "en"

class ChatResponse(BaseModel):
    reply: str
    model: str
    mode: str

# Helper function for transliteration
def transliterate_to_iast(text: str) -> str:
    output = []
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

# API endpoints
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "sanskritnova-ai-api"}

@app.get("/api/info")
async def info():
    return {
        "name": "SanskritNova AI",
        "provider": "openrouter",
        "chat_modes": ["learn", "translate", "analyze"],
        "advanced_modes": [],
        "chat_configured": bool(os.getenv("OPENROUTER_API_KEY")),
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
    if os.getenv("OPENROUTER_API_KEY"):
        try:
            reply = await _openrouter_reply(request.message, request.mode, request.lang)
        except httpx.HTTPError as exc:
            reply = _fallback_chat_reply(request.message, request.mode, request.lang)
            return ChatResponse(reply=reply, model="fallback-reference", mode=request.mode)
        if reply:
            return ChatResponse(reply=reply, model=_openrouter_model(), mode=request.mode)

    if request.lang == "hi":
        reply = f"मैं आपकी '{request.mode}' मोड में सहायता कर रहा हूँ। कृपया OpenRouter API कॉन्फ़िगर करें।"
    else:
        reply = f"I'm helping you in '{request.mode}' mode. Please configure OpenRouter API key."
    
    return ChatResponse(
        reply=reply,
        model="simplified",
        mode=request.mode
    )

# Vercel handler - wrapped in try/except for robustness
try:
    from mangum import Mangum
    handler = Mangum(app, lifespan="off")
except Exception as e:
    import logging
    logging.basicConfig(level=logging.INFO)
    logging.info(f"Mangum import failed (expected in some environments): {e}")
    handler = None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
