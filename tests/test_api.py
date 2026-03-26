from api.index import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_info_endpoint():
    response = client.get("/api/info")
    assert response.status_code == 200
    assert response.json()["name"] == "SanskritNova AI"


def test_tracks_endpoint():
    response = client.get("/api/tracks")
    assert response.status_code == 200
    body = response.json()
    assert len(body) >= 3
    assert body[0]["slug"] == "sanskrit-foundations"


def test_transliterate_endpoint():
    response = client.post("/api/transliterate", json={"text": "रामो गच्छति"})
    assert response.status_code == 200
    body = response.json()
    assert body["iast"] == "rāmo gacchati"


def test_grounded_answer_endpoint(monkeypatch):
    async def fake_answer(message, sources):
        return "Grounded answer"

    monkeypatch.setattr(
        "api.index._retrieve_grounded_results",
        lambda message, k: [{"source": "Rag-docs.docx", "chunk_id": 1, "text": "योगः ..."}],
    )
    monkeypatch.setattr("api.index._grounded_openrouter_answer", fake_answer)

    response = client.post("/api/grounded-answer", json={"message": "What is yoga?", "k": 1})
    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Grounded answer"
    assert body["sources"][0]["source"] == "Rag-docs.docx"


def test_chat_requires_openrouter_key(monkeypatch):
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Explain yoga", "mode": "learn"})
    assert response.status_code == 500
    assert "OPENROUTER_API_KEY" in response.json()["detail"]
