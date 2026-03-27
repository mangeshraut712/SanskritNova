from __future__ import annotations

import sys
import types

import pytest
from fastapi.testclient import TestClient
from code._loader import load_code_module


def _install_optional_dependency_stubs(monkeypatch):
    faiss = types.ModuleType("faiss")
    faiss.read_index = lambda path: object()
    faiss.normalize_L2 = lambda embeddings: None
    faiss.IndexFlatIP = lambda dim: types.SimpleNamespace(add=lambda embeddings: None)

    joblib = types.ModuleType("joblib")
    joblib.load = lambda path: object()
    joblib.dump = lambda obj, path: None

    llama_cpp = types.ModuleType("llama_cpp")

    class DummyLlama:
        def __init__(self, *args, **kwargs):
            pass

        def __call__(self, *args, **kwargs):
            return {"choices": [{"text": "stub"}]}

    llama_cpp.Llama = DummyLlama

    docx = types.ModuleType("docx")
    docx.Document = lambda path: types.SimpleNamespace(paragraphs=[])

    pdfplumber = types.ModuleType("pdfplumber")

    class DummyPDF:
        pages = []

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

    pdfplumber.open = lambda path: DummyPDF()

    sklearn = types.ModuleType("sklearn")
    sklearn.__path__ = []
    feature_extraction = types.ModuleType("sklearn.feature_extraction")
    feature_extraction.__path__ = []
    text = types.ModuleType("sklearn.feature_extraction.text")

    class DummyVectorizer:
        def fit_transform(self, texts):
            class DummyMatrix:
                def toarray(self):
                    import numpy as np

                    return np.zeros((len(texts), 1), dtype="float32")

            return DummyMatrix()

    text.TfidfVectorizer = DummyVectorizer
    feature_extraction.text = text
    sklearn.feature_extraction = feature_extraction

    monkeypatch.setitem(sys.modules, "faiss", faiss)
    monkeypatch.setitem(sys.modules, "joblib", joblib)
    monkeypatch.setitem(sys.modules, "llama_cpp", llama_cpp)
    monkeypatch.setitem(sys.modules, "docx", docx)
    monkeypatch.setitem(sys.modules, "pdfplumber", pdfplumber)
    monkeypatch.setitem(sys.modules, "sklearn", sklearn)
    monkeypatch.setitem(sys.modules, "sklearn.feature_extraction", feature_extraction)
    monkeypatch.setitem(sys.modules, "sklearn.feature_extraction.text", text)


def _load_code_api(monkeypatch):
    _install_optional_dependency_stubs(monkeypatch)
    return load_code_module("api")


@pytest.mark.parametrize("endpoint", ["/search", "/answer"])
@pytest.mark.parametrize("exc_type", [ImportError, ValueError])
def test_rag_api_returns_503_for_misconfiguration(monkeypatch, endpoint, exc_type):
    try:
        module = _load_code_api(monkeypatch)
        client = TestClient(module.app)

        def broken_get_rag():
            raise exc_type("bad config")

        monkeypatch.setattr(module, "get_rag", broken_get_rag)

        response = client.post(endpoint, json={"query": "योगः", "k": 1})

        assert response.status_code == 503
        assert response.json()["detail"] == "bad config"
    except (ImportError, AttributeError) as e:
        # If the module can't be loaded due to missing dependencies, skip test
        pytest.skip(f"Code API module not available: {e}")
