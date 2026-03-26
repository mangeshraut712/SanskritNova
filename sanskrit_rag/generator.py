from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("generator")
Generator = _module.Generator
