import json

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

def handler(request):
    """Learning tracks endpoint."""
    try:
        # Parse query parameters
        query_string = request.get("queryString", "")
        params = {}
        if query_string:
            for param in query_string.split("&"):
                if "=" in param:
                    key, value = param.split("=", 1)
                    params[key] = value
        
        lang = params.get("lang", "en")
        
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
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            },
            "body": json.dumps(tracks_data)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }
