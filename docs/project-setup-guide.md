# SanskritNova AI Project Setup Guide

This repo contains:

- a FastAPI backend in `api/`
- a static frontend in `public/`
- the original Sanskrit RAG code and artifacts in `code/`

## Install

Create a virtual environment and install the web app with the development tooling:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

If you only want the lightweight runtime stack:

```bash
pip install -r requirements.txt
```

If you want the original local RAG workflow as well:

```bash
pip install -e ".[local]"
```

For the local indexer, the default embedding backend is now `tfidf` for runtime stability.

If you want to force sentence-transformers instead:

```bash
export SANSKRIT_RAG_EMBEDDING_BACKEND=sentence-transformers
```

## Run The Web App

Start the API:

```bash
make serve-api
```

Serve the frontend:

```bash
make serve-site
```

The frontend uses `/api/*` in deployed environments and the local API during development.

Run the validation checks:

```bash
make test
make lint
```

## Run The Original RAG Workflow

Build the original local index:

```bash
make rag-index
```

Run the original CLI:

```bash
make rag-cli
```

## Environment Variables

API:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_APP_NAME`
- `OPENROUTER_APP_URL`

Original RAG:

- `SANSKRIT_RAG_DATA_DIR`
- `SANSKRIT_RAG_INDEX_PATH`
- `SANSKRIT_RAG_CHUNKS_PATH`
- `SANSKRIT_RAG_MODEL_PATH`

Use [`.env.example`](../.env.example) as the local template.

## Main Endpoints

- `GET /api/health`
- `GET /api/info`
- `GET /api/tracks`
- `POST /api/chat`
- `POST /api/grounded-answer`
- `POST /api/transliterate`

## Grounded Answer Note

`POST /api/grounded-answer` is connected to the original retrieval corpus in `code/`.

It currently:

- prefers the retrieval path exposed through `sanskrit_rag.retriever`
- falls back to `code/chunks.npy` if the full local retrieval stack or artifacts are unavailable

## Deployment Notes

- `vercel.json` routes `/api/*` to the FastAPI app
- `public/` is the static site root
- `docker/` and `k8s/` are optional deployment paths

## Operational Reality

For the strongest grounded behavior, the original local RAG artifacts should exist and the local RAG stack should be installed. The lightweight web install is enough for basic chat, tracks, transliteration, and the legacy grounded-answer fallback.
