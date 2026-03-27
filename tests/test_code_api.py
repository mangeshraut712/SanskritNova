from __future__ import annotations

import sys
import types

import pytest
from fastapi.testclient import TestClient
from code._loader import load_code_module


def _install_optional_dependency_stubs(monkeypatch):
    # Since we have real dependencies installed, we don't need extensive mocking
    # Just mock the parts that cause issues in testing
    pass


def _load_code_api(monkeypatch):
    # Create a mock model file to avoid FileNotFoundError
    import tempfile
    import os
    from pathlib import Path
    
    # Create a temporary mock model file
    mock_model_path = Path(tempfile.gettempdir()) / "mock_model.gguf"
    mock_model_path.touch()
    
    # Mock the settings to use the mock model
    fake_settings = types.SimpleNamespace(
        model_path=mock_model_path,
        llm_ctx=2048,
        llm_threads=1,
        llm_batch=512,
        llm_max_tokens=256,
        llm_temperature=0.7,
        default_k=3,
        index_path=Path(tempfile.gettempdir()) / "mock_index.faiss",
        data_dir=Path(tempfile.gettempdir()),
        chunks_path=Path(tempfile.gettempdir()) / "chunks.json",
        legacy_chunks_path=Path(tempfile.gettempdir()) / "chunks.npy",
        repo_root=Path(__file__).parent.parent
    )
    
    # Mock the config module
    config_module = types.ModuleType("config")
    config_module.settings = fake_settings
    monkeypatch.setitem(sys.modules, "config", config_module)
    monkeypatch.setitem(sys.modules, "code.config", fake_settings)
    
    # Mock the generator to avoid actual LLM loading
    generator_module = types.ModuleType("generator")
    
    class MockGenerator:
        def __init__(self, *args, **kwargs):
            pass
        
        def generate(self, prompt):
            return "Mock response"
    
    generator_module.Generator = MockGenerator
    monkeypatch.setitem(sys.modules, "generator", generator_module)
    monkeypatch.setitem(sys.modules, "code.generator", generator_module)
    
    # Mock the retriever to avoid FAISS loading
    retriever_module = types.ModuleType("retriever")
    
    class MockRetriever:
        def __init__(self, *args, **kwargs):
            self.index = types.SimpleNamespace(ntotal=100)
        
        def retrieve(self, query, k=3):
            return [
                {"chunk_id": i, "source": "test", "text": f"Mock result {i}"}
                for i in range(min(k, 5))
            ]
    
    retriever_module.Retriever = MockRetriever
    monkeypatch.setitem(sys.modules, "retriever", retriever_module)
    monkeypatch.setitem(sys.modules, "code.retriever", retriever_module)
    
    # Mock the rag_pipeline
    rag_pipeline_module = types.ModuleType("rag_pipeline")
    
    class MockSanskritRAG:
        def __init__(self):
            self.retriever = MockRetriever()
        
        def answer(self, query, k=3):
            return {"answer": f"Mock answer for {query}", "sources": []}
    
    rag_pipeline_module.SanskritRAG = MockSanskritRAG
    monkeypatch.setitem(sys.modules, "rag_pipeline", rag_pipeline_module)
    monkeypatch.setitem(sys.modules, "code.rag_pipeline", rag_pipeline_module)
    
    # Mock build_index
    build_index_module = types.ModuleType("build_index")
    build_index_module.build_faiss_index = lambda: None
    monkeypatch.setitem(sys.modules, "build_index", build_index_module)
    monkeypatch.setitem(sys.modules, "code.build_index", build_index_module)
    
    return load_code_module("api")


@pytest.mark.parametrize("endpoint", ["/search", "/answer"])
@pytest.mark.parametrize("exc_type", [ImportError, ValueError])
def test_rag_api_returns_503_for_misconfiguration(monkeypatch, endpoint, exc_type):
    module = _load_code_api(monkeypatch)
    client = TestClient(module.app)

    def broken_get_rag():
        raise exc_type("bad config")

    monkeypatch.setattr(module, "get_rag", broken_get_rag)

    response = client.post(endpoint, json={"query": "योगः", "k": 1})

    assert response.status_code == 503
    assert response.json()["detail"] == "bad config"


def test_code_api_module_imports(monkeypatch):
    """Test that the code API module can be imported with proper mocking."""
    module = _load_code_api(monkeypatch)
    assert hasattr(module, 'app')
    assert hasattr(module, 'get_rag')
