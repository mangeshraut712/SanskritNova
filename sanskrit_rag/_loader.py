from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


def load_code_module(module_name: str):
    repo_root = Path(__file__).resolve().parent.parent
    module_path = repo_root / "code" / f"{module_name}.py"
    qualified_name = f"sanskrit_rag._code_{module_name}"
    spec = importlib.util.spec_from_file_location(qualified_name, module_path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Unable to load module from {module_path}")
    if qualified_name in sys.modules:
        return sys.modules[qualified_name]
    module = importlib.util.module_from_spec(spec)
    sys.modules[qualified_name] = module
    spec.loader.exec_module(module)
    return module
