import json


def handler(request):
    """Chat endpoint."""
    try:
        # Parse request body
        body = request.get("body", "{}")
        if isinstance(body, str):
            data = json.loads(body)
        else:
            data = body
        
        mode = data.get("mode", "learn")
        lang = data.get("lang", "en")
        
        # Simplified response for now - requires OpenRouter API key setup
        if lang == "hi":
            reply = f"मैं आपकी '{mode}' मोड में सहायता कर रहा हूँ। कृपया OpenRouter API कॉन्फ़िगर करें।"
        else:
            reply = f"I'm helping you in '{mode}' mode. Please configure OpenRouter API key."
        
        result = {
            "reply": reply,
            "model": "simplified",
            "mode": mode
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
