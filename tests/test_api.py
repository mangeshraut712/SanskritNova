import pytest
import api.index as api_index
from fastapi.testclient import TestClient

client = TestClient(api_index.app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "sanskritnova-ai-api"


def test_info_endpoint():
    response = client.get("/api/info")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "SanskritNova AI"
    assert data["provider"] == "openrouter"
    assert data["chat_modes"] == ["learn", "translate", "analyze"]
    assert data["transliteration"] is True


def test_tracks_endpoint_default_lang():
    response = client.get("/api/tracks")
    assert response.status_code == 200
    body = response.json()
    assert len(body) >= 3
    assert body[0]["slug"] == "sanskrit-foundations"
    assert body[0]["title"] == "Sanskrit Foundations"
    assert body[0]["level"] == "Beginner"


def test_tracks_endpoint_english():
    response = client.get("/api/tracks?lang=en")
    assert response.status_code == 200
    body = response.json()
    assert len(body) >= 3
    assert body[0]["title"] == "Sanskrit Foundations"
    assert body[0]["level"] == "Beginner"


def test_tracks_endpoint_hindi():
    response = client.get("/api/tracks?lang=hi")
    assert response.status_code == 200
    body = response.json()
    assert len(body) >= 3
    assert body[0]["title"] == "संस्कृत आधार"
    assert body[0]["level"] == "शुरुआती"


def test_transliterate_endpoint_basic():
    response = client.post("/api/transliterate", json={"text": "रामो गच्छति"})
    assert response.status_code == 200
    body = response.json()
    assert body["devanagari"] == "रामो गच्छति"
    assert body["iast"] == "rāmo gacchati"


def test_transliterate_endpoint_empty():
    response = client.post("/api/transliterate", json={"text": ""})
    assert response.status_code == 200
    body = response.json()
    assert body["devanagari"] == ""
    assert body["iast"] == ""


def test_transliterate_endpoint_complex():
    response = client.post("/api/transliterate", json={"text": "योगः चित्तवृत्तिनिरोधः"})
    assert response.status_code == 200
    body = response.json()
    assert body["devanagari"] == "योगः चित्तवृत्तिनिरोधः"
    assert "yogaḥ" in body["iast"]
    assert "cittavṛttinirodhaḥ" in body["iast"]


def test_chat_endpoint_default():
    response = client.post("/api/chat", json={"message": "What is yoga?"})
    assert response.status_code == 200
    body = response.json()
    assert "learn" in body["reply"].lower()
    assert body["mode"] == "learn"
    assert body["model"] == "simplified"


def test_chat_endpoint_learn_mode():
    response = client.post("/api/chat", json={"message": "Explain yoga", "mode": "learn"})
    assert response.status_code == 200
    body = response.json()
    assert "learn" in body["reply"].lower()
    assert body["mode"] == "learn"


def test_chat_endpoint_translate_mode():
    response = client.post("/api/chat", json={"message": "Translate yoga", "mode": "translate"})
    assert response.status_code == 200
    body = response.json()
    assert "translate" in body["reply"].lower()
    assert body["mode"] == "translate"


def test_chat_endpoint_analyze_mode():
    response = client.post("/api/chat", json={"message": "Analyze this text", "mode": "analyze"})
    assert response.status_code == 200
    body = response.json()
    assert "analyze" in body["reply"].lower()
    assert body["mode"] == "analyze"


def test_chat_endpoint_hindi():
    response = client.post("/api/chat", json={"message": "योग क्या है?", "lang": "hi"})
    assert response.status_code == 200
    body = response.json()
    assert "आपकी" in body["reply"]
    assert "learn" in body["reply"]
    assert body["mode"] == "learn"


def test_chat_endpoint_hindi_translate():
    response = client.post("/api/chat", json={"message": "योग का अनुवाद करें", "mode": "translate", "lang": "hi"})
    assert response.status_code == 200
    body = response.json()
    assert "आपकी" in body["reply"]
    assert "translate" in body["reply"].lower()
    assert body["mode"] == "translate"


def test_chat_endpoint_invalid_mode():
    # Test with invalid mode - should return 422 due to Literal validation
    response = client.post("/api/chat", json={"message": "Test", "mode": "invalid"})
    assert response.status_code == 422


def test_transliterate_endpoint_with_marks():
    response = client.post("/api/transliterate", json={"text": "नमः शिवाय"})
    assert response.status_code == 200
    body = response.json()
    assert body["devanagari"] == "नमः शिवाय"
    assert "namaḥ" in body["iast"]
    assert "śivāya" in body["iast"]


def test_transliterate_endpoint_with_virama():
    response = client.post("/api/transliterate", json={"text": "तत्त्वमसि"})
    assert response.status_code == 200
    body = response.json()
    assert body["devanagari"] == "तत्त्वमसि"
    assert "tattvamasi" in body["iast"]


def test_info_endpoint_structure():
    response = client.get("/api/info")
    assert response.status_code == 200
    data = response.json()
    expected_keys = ["name", "provider", "chat_modes", "transliteration"]
    for key in expected_keys:
        assert key in data
    assert isinstance(data["chat_modes"], list)
    assert isinstance(data["transliteration"], bool)
