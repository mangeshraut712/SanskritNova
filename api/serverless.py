import json
from urllib.parse import parse_qs

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

# Transliteration mappings
INDEPENDENT_VOWELS = {
    "अ": "a", "आ": "ā", "इ": "i", "ी": "ī", "उ": "u", "ऊ": "ū",
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
VIRAMA = "्"

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
            
        output.append(char)
        index += 1
        
    return "".join(output)

def handle_health():
    return {
        "status": "ok",
        "service": "sanskritnova-ai-api"
    }

def handle_info():
    return {
        "name": "SanskritNova AI",
        "provider": "openrouter",
        "chat_modes": ["learn", "translate", "analyze"],
        "transliteration": True,
    }

def handle_tracks(query_params):
    lang = query_params.get("lang", ["en"])[0]
    
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
        tracks_data.append(track_data)
    
    return tracks_data

def handle_transliterate(body):
    try:
        data = json.loads(body) if body else {}
        text = data.get("text", "")
        
        return {
            "devanagari": text,
            "iast": transliterate_to_iast(text)
        }
    except json.JSONDecodeError:
        return {"error": "Invalid JSON"}

def handle_chat(body):
    try:
        data = json.loads(body) if body else {}
        mode = data.get("mode", "learn")
        lang = data.get("lang", "en")
        
        # Simplified response for now
        if lang == "hi":
            reply = f"मैं आपकी '{mode}' मोड में सहायता कर रहा हूँ। कृपया OpenRouter API कॉन्फ़िगर करें।"
        else:
            reply = f"I'm helping you in '{mode}' mode. Please configure OpenRouter API key."
        
        return {
            "reply": reply,
            "model": "simplified",
            "mode": mode
        }
    except json.JSONDecodeError:
        return {"error": "Invalid JSON"}

def handler(event, context):
    """Main Vercel serverless handler."""
    try:
        # Extract request info
        method = event.get("httpMethod", "GET")
        path = event.get("path", "/")
        query_params = event.get("queryStringParameters", {}) or {}
        body = event.get("body", "")
        
        # Parse query parameters
        if isinstance(query_params, str):
            query_params = parse_qs(query_params)
        
        # Route the request
        if path == "/api/health":
            response_data = handle_health()
        elif path == "/api/info":
            response_data = handle_info()
        elif path == "/api/tracks":
            response_data = handle_tracks(query_params)
        elif path == "/api/transliterate" and method == "POST":
            response_data = handle_transliterate(body)
        elif path == "/api/chat" and method == "POST":
            response_data = handle_chat(body)
        else:
            response_data = {"error": "Endpoint not found"}
            status_code = 404
        
        if "error" in response_data and "Endpoint not found" not in response_data.get("error", ""):
            status_code = 500
        else:
            status_code = 200
        
        return {
            "statusCode": status_code,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            "body": json.dumps(response_data)
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }
