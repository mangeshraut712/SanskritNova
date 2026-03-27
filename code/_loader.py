"""Module loader for code modules."""

import sys
from pathlib import Path
from importlib import import_module
from types import ModuleType


def load_code_module(module_name: str) -> ModuleType:
    """Load a module from the code directory."""
    code_dir = Path(__file__).parent
    
    # Add the code directory to sys.path if not already there
    if str(code_dir) not in sys.path:
        sys.path.insert(0, str(code_dir))
    
    try:
        return import_module(module_name)
    except ImportError as e:
        raise ImportError(f"Could not import module '{module_name}' from code directory: {e}")
