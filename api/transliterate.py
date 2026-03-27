import json

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

def handler(request):
    """Transliteration endpoint."""
    try:
        # Parse request body
        body = request.get("body", "{}")
        if isinstance(body, str):
            data = json.loads(body)
        else:
            data = body
        
        text = data.get("text", "")
        
        result = {
            "devanagari": text,
            "iast": transliterate_to_iast(text)
        }
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            "body": json.dumps(result)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }
