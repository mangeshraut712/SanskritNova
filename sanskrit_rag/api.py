from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("api")
app = _module.app
QueryRequest = _module.QueryRequest
get_rag = _module.get_rag
