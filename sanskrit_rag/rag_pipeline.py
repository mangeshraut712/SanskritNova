from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("rag_pipeline")
SanskritRAG = _module.SanskritRAG
