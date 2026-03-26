from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("app")
main = _module.main


if __name__ == "__main__":
    main()
