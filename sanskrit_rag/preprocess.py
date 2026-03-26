from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("preprocess")
clean_text = _module.clean_text
chunk_text = _module.chunk_text
