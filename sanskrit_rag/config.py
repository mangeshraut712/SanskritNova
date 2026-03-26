from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("config")
Settings = _module.Settings
load_settings = _module.load_settings
settings = _module.settings
