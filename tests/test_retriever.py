from __future__ import annotations

import importlib
import sys
import types

import numpy as np


def _import_retriever_module(monkeypatch):
    faiss_module = types.ModuleType("faiss")
    faiss_module.read_index = lambda path: object()
    faiss_module.normalize_L2 = lambda embeddings: None
    faiss_module.IndexFlatIP = lambda dim: types.SimpleNamespace(add=lambda embeddings: None)

    joblib_module = types.ModuleType("joblib")
    joblib_module.load = lambda path: object()

    monkeypatch.setitem(sys.modules, "faiss", faiss_module)
    monkeypatch.setitem(sys.modules, "joblib", joblib_module)

    return importlib.import_module("code.retriever")


def test_load_chunks_falls_back_to_legacy_when_json_is_malformed(tmp_path, monkeypatch):
    module = _import_retriever_module(monkeypatch)

    fake_settings = types.SimpleNamespace(
        chunks_path=tmp_path / "chunks.json",
        legacy_chunks_path=tmp_path / "chunks.npy",
    )
    monkeypatch.setattr(module, "settings", fake_settings)

    fake_settings.chunks_path.write_text("{not valid json", encoding="utf-8")
    np.save(fake_settings.legacy_chunks_path, np.array(["योगः", "धर्मः"]))

    retriever = module.Retriever.__new__(module.Retriever)
    chunks = retriever._load_chunks()

    assert chunks == [
        {"chunk_id": 0, "source": "unknown", "text": "योगः"},
        {"chunk_id": 1, "source": "unknown", "text": "धर्मः"},
    ]
