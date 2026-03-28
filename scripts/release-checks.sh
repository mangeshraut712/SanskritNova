#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

resolve_python() {
  if [[ -x "$REPO_ROOT/venv/bin/python" ]]; then
    printf '%s\n' "$REPO_ROOT/venv/bin/python"
    return 0
  fi

  if [[ -x "$REPO_ROOT/.venv/bin/python" ]]; then
    printf '%s\n' "$REPO_ROOT/.venv/bin/python"
    return 0
  fi

  if command -v python3 >/dev/null 2>&1; then
    command -v python3
    return 0
  fi

  if command -v python >/dev/null 2>&1; then
    command -v python
    return 0
  fi

  echo "No Python interpreter found." >&2
  exit 1
}

PYTHON_BIN="${PYTHON_BIN:-$(resolve_python)}"

echo "Using Python: $PYTHON_BIN"

if ! "$PYTHON_BIN" -m pytest --version >/dev/null 2>&1; then
  echo "Installing missing Python dev dependencies..."
  "$PYTHON_BIN" -m pip install -e ".[dev]"
fi

echo "Checking Vercel API entrypoint syntax..."
node --check api/index.js

echo "Checking frontend entrypoint syntax..."
node --check public/scripts/utils.js
node --check public/scripts/luxury-app.js

echo "Checking Vercel config JSON..."
node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))"

echo "Byte-compiling Python sources..."
"$PYTHON_BIN" -m compileall api code

echo "Running pytest..."
"$PYTHON_BIN" -m pytest tests -q

echo "Release checks passed."
