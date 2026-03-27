import json

def handler(request):
    """Simple Vercel serverless handler."""
    path = request.get("path", "")
    
    if path == "/api/health":
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"status": "ok", "service": "sanskritnova-ai-api"})
        }
    elif path == "/api/info":
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "name": "SanskritNova AI",
                "provider": "openrouter",
                "chat_modes": ["learn", "translate", "analyze"],
                "transliteration": True,
            })
        }
    elif path == "/api/tracks":
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps([
                {
                    "slug": "sanskrit-foundations",
                    "title": "Sanskrit Foundations",
                    "level": "Beginner",
                    "duration": "2 weeks",
                    "focus": "Script basics, pronunciation, and essential vocabulary."
                }
            ])
        }
    else:
        return {
            "statusCode": 404,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": "Not found"})
        }
