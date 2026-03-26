from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("build_index")
build_faiss_index = _module.build_faiss_index


if __name__ == "__main__":
    build_faiss_index()
