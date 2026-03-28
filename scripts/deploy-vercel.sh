#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

MODE="${1:-preview}"

if [[ "$MODE" == "production" ]]; then
  echo "Deploying production build to Vercel..."
  vercel deploy --prod --yes
  exit 0
fi

echo "Deploying preview build to Vercel..."
vercel deploy --yes
