import api.index as api_index
import httpx
import numpy as np
from fastapi.testclient import TestClient

client = TestClient(api_index.app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_info_endpoint():
    response = client.get("/api/info")
    assert response.status_code == 200
    assert response.json()["name"] == "SanskritNova AI"


def test_info_grounded_answer_reflects_availability(monkeypatch, tmp_path):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(api_index, "_load_local_retriever", lambda: None)
    monkeypatch.setattr(api_index, "LEGACY_CHUNKS_PATH", tmp_path / "missing.npy")

    response = client.get("/api/info")

    assert response.status_code == 200
    assert response.json()["grounded_answer"] is False


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
    async def fake_answer(message, sources, lang="en"):
        return "Grounded answer"

    monkeypatch.setattr(
        api_index,
        "_retrieve_grounded_results",
        lambda message, k: [{"source": "Rag-docs.docx", "chunk_id": 1, "text": "योगः ..."}],
    )
    monkeypatch.setattr(api_index, "_grounded_openrouter_answer", fake_answer)

    response = client.post("/api/grounded-answer", json={"message": "What is yoga?", "k": 1})
    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Grounded answer"
    assert body["sources"][0]["source"] == "Rag-docs.docx"


def test_grounded_answer_passes_lang(monkeypatch):
    captured = {}

    async def fake_answer(message, sources, lang="en"):
        captured["lang"] = lang
        return "Grounded answer"

    monkeypatch.setattr(
        api_index,
        "_retrieve_grounded_results",
        lambda message, k: [{"source": "Rag-docs.docx", "chunk_id": 1, "text": "योगः ..."}],
    )
    monkeypatch.setattr(api_index, "_grounded_openrouter_answer", fake_answer)

    response = client.post(
        "/api/grounded-answer",
        json={"message": "योग क्या है?", "k": 1, "lang": "hi"},
    )

    assert response.status_code == 200
    assert captured["lang"] == "hi"


def test_grounded_results_prefer_local_retriever(monkeypatch):
    class FakeRetriever:
        def retrieve(self, query, k):
            return [{"source": "Rag-docs.docx", "chunk_id": 7, "text": "योगः ..."}]

    monkeypatch.setattr(api_index, "_load_local_retriever", lambda: FakeRetriever())

    results = api_index._retrieve_grounded_results("What is yoga?", 1)

    assert results == [{"source": "Rag-docs.docx", "chunk_id": 7, "text": "योगः ..."}]


def test_grounded_results_fall_back_to_legacy_chunks(tmp_path, monkeypatch):
    chunks_path = tmp_path / "chunks.npy"
    np.save(chunks_path, np.array(["योगः चित्तवृत्तिनिरोधः", "धर्मक्षेत्रे कुरुक्षेत्रे"]))

    monkeypatch.setattr(api_index, "_load_local_retriever", lambda: None)
    monkeypatch.setattr(api_index, "LEGACY_CHUNKS_PATH", chunks_path)
    seen = {}

    def fake_load(path, allow_pickle):
        seen["allow_pickle"] = allow_pickle
        return np.array(["योगः चित्तवृत्तिनिरोधः", "धर्मक्षेत्रे कुरुक्षेत्रे"])

    monkeypatch.setattr(api_index.np, "load", fake_load)

    results = api_index._retrieve_grounded_results("योगः", 1)

    assert seen["allow_pickle"] is False
    assert results[0]["source"] == "SanskritCorpus"
    assert results[0]["chunk_id"] == 0


def test_grounded_answer_requires_sources(monkeypatch):
    called = False

    async def fake_answer(message, sources, lang="en"):
        nonlocal called
        called = True
        return "should not be called"

    monkeypatch.setattr(api_index, "_retrieve_grounded_results", lambda message, k: [])
    monkeypatch.setattr(api_index, "_grounded_openrouter_answer", fake_answer)

    response = client.post("/api/grounded-answer", json={"message": "What is yoga?", "k": 1})

    assert response.status_code == 503
    assert response.json()["detail"] == "Grounded sources unavailable."
    assert called is False


def test_chat_requires_openrouter_key(monkeypatch):
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)
    response = client.post("/api/chat", json={"message": "Explain yoga", "mode": "learn"})
    assert response.status_code == 500
    assert "OPENROUTER_API_KEY" in response.json()["detail"]


class _FailingOpenRouterClient:
    def __init__(self, *args, **kwargs):
        pass

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def post(self, *args, **kwargs):
        request = httpx.Request("POST", api_index.OPENROUTER_URL)
        raise httpx.ConnectError("upstream unavailable", request=request)


def test_agentic_answer_unavailable(monkeypatch):
    """When agentic RAG deps are missing, endpoint returns 503."""
    monkeypatch.setattr(api_index, "AGENTIC_RAG_AVAILABLE", False)
    response = client.post("/api/agentic-answer", json={"message": "What is yoga?"})
    assert response.status_code == 503
    assert "langgraph" in response.json()["detail"].lower()


def test_agentic_answer_requires_api_key(monkeypatch):
    """When langgraph is available but no API key, returns 500."""
    monkeypatch.setattr(api_index, "AGENTIC_RAG_AVAILABLE", True)
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)
    response = client.post("/api/agentic-answer", json={"message": "What is yoga?"})
    assert response.status_code == 500
    assert "OPENROUTER_API_KEY" in response.json()["detail"]


def test_agentic_answer_success(monkeypatch):
    """Happy path: agentic RAG returns answer."""
    async def fake_agentic_answer(query):
        return {
            "answer": "योगः चित्तवृत्तिनिरोधः",
            "sources": [{"source": "Gita", "chunk_id": 1, "text": "yoga is..."}],
            "steps": ["step1", "step2"],
            "attempts": 0,
            "quality": "good",
        }

    monkeypatch.setattr(api_index, "AGENTIC_RAG_AVAILABLE", True)
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(api_index, "agentic_answer", fake_agentic_answer)

    response = client.post("/api/agentic-answer", json={"message": "What is yoga?"})
    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "योगः चित्तवृत्तिनिरोधः"
    assert body["quality"] == "good"
    assert body["attempts"] == 0
    assert len(body["sources"]) == 1
    assert len(body["steps"]) == 2


def test_info_shows_agentic_rag_status():
    response = client.get("/api/info")
    assert response.status_code == 200
    assert "agentic_rag" in response.json()


def test_chat_maps_openrouter_failure_to_502(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(api_index.httpx, "AsyncClient", _FailingOpenRouterClient)

    response = client.post("/api/chat", json={"message": "Explain yoga", "mode": "learn"})

    assert response.status_code == 502
    assert response.json()["detail"] == "OpenRouter request failed."


def test_grounded_answer_maps_openrouter_failure_to_502(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(
        api_index,
        "_retrieve_grounded_results",
        lambda message, k: [{"source": "SanskritCorpus", "chunk_id": 0, "text": "योगः"}],
    )
    monkeypatch.setattr(api_index.httpx, "AsyncClient", _FailingOpenRouterClient)

    response = client.post("/api/grounded-answer", json={"message": "What is yoga?", "k": 1})

    assert response.status_code == 502
    assert response.json()["detail"] == "OpenRouter request failed."
