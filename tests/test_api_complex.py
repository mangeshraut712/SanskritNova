from __future__ import annotations

from fastapi.testclient import TestClient

import api.index_complex as api_index_complex


client = TestClient(api_index_complex.app)


def test_complex_info_reports_runtime_metadata(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")

    response = client.get("/api/info")

    assert response.status_code == 200
    body = response.json()
    assert body["runtime"] == "fastapi"
    assert body["chat_configured"] is True
    assert "grounded_answer" in body
    assert "agentic_rag" in body
    assert "model" in body


def test_grounded_answer_uses_reference_fallback(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(api_index_complex, "_retrieve_with_local_retriever", lambda query, k: [])
    monkeypatch.setattr(api_index_complex, "_retrieve_from_legacy_chunks", lambda query, k: [])

    async def fake_grounded_openrouter_answer(message, sources, lang="en"):
        assert sources
        return "Grounded fallback reply"

    monkeypatch.setattr(
        api_index_complex,
        "_grounded_openrouter_answer",
        fake_grounded_openrouter_answer,
    )

    response = client.post(
        "/api/grounded-answer",
        json={"message": "What is yoga?", "k": 3, "lang": "en"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Grounded fallback reply"
    assert any(source["source"] == "SanskritReference" for source in body["sources"])


def test_agentic_answer_falls_back_when_agentic_unavailable(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")
    monkeypatch.setattr(api_index_complex, "AGENTIC_RAG_AVAILABLE", False)
    monkeypatch.setattr(
        api_index_complex,
        "_retrieve_grounded_results",
        lambda message, k: [
            {
                "source": "SanskritReference",
                "chunk_id": "yoga",
                "text": "योग (yoga) means union.",
            }
        ],
    )

    async def fake_grounded_openrouter_answer(message, sources, lang="en"):
        return "Agentic fallback reply"

    monkeypatch.setattr(
        api_index_complex,
        "_grounded_openrouter_answer",
        fake_grounded_openrouter_answer,
    )

    response = client.post("/api/agentic-answer", json={"message": "What is yoga?"})

    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Agentic fallback reply"
    assert body["quality"] == "fallback"
    assert body["sources"]


def test_chat_falls_back_when_openrouter_fails(monkeypatch):
    monkeypatch.setenv("OPENROUTER_API_KEY", "test-key")

    async def failing_openrouter_completion(payload):
        raise api_index_complex.HTTPException(status_code=502, detail="OpenRouter request failed.")

    monkeypatch.setattr(api_index_complex, "_openrouter_completion", failing_openrouter_completion)

    response = client.post(
        "/api/chat",
        json={"message": "What is yoga in Sanskrit?", "mode": "learn", "lang": "en"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["model"] == "fallback-reference"
    assert "yoga" in body["reply"].lower()
