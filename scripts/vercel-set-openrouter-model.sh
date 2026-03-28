#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

MODEL="${1:-openai/gpt-4.1-mini}"

for ENVIRONMENT in development preview production; do
  vercel env rm OPENROUTER_MODEL "$ENVIRONMENT" --yes >/dev/null 2>&1 || true
  printf '%s' "$MODEL" | vercel env add OPENROUTER_MODEL "$ENVIRONMENT"
done
