# SanskritNova AI

SanskritNova AI is a Sanskrit learning web app backed by a preserved local RAG prototype. The active web product lives in `api/` and `public/`; the original document retrieval pipeline and local indexing flow live in `code/`.

## Current Product Surface

Working now:
- AI chat through `learn`, `translate`, and `analyze` modes
- grounded answers from the original Sanskrit corpus via the local retriever, with a legacy chunk fallback
- Devanagari to IAST transliteration
- study tracks from `GET /api/tracks`
- a static frontend in `public/` with API-backed interactions

## Repository Layout

```text
api/      FastAPI backend
public/   Static frontend
code/     Original Sanskrit RAG modules and local index artifacts
docs/     Setup, roadmap, and comparison notes
tests/    API and utility tests
docker/   Optional container assets
k8s/      Optional Kubernetes manifest
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

If you only want the lightweight runtime stack:

```bash
pip install -r requirements.txt
```

Optional local RAG dependencies:

```bash
pip install -e ".[local]"
```

The lightweight web install from `requirements.txt` is enough for:
- `chat`
- `tracks`
- `transliteration`

The optional local RAG extras are needed to rebuild or fully use the original retrieval pipeline in `code/`.

## Run Locally

```bash
make serve-api
make serve-site
make test
make lint
```

Original RAG commands:

```bash
make rag-index
make rag-cli
```

## Grounded Answer Note

`POST /api/grounded-answer` is connected to the original retrieval corpus in `code/`.

It currently:
- prefers the retrieval path exposed through `sanskrit_rag.retriever`
- falls back to scanning `code/chunks.npy` if the full local retrieval stack or artifacts are unavailable

For local indexing stability, the default embedding backend is:

```bash
SANSKRIT_RAG_EMBEDDING_BACKEND=tfidf
```

You can opt into sentence-transformers explicitly if your environment is stable:

```bash
export SANSKRIT_RAG_EMBEDDING_BACKEND=sentence-transformers
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
- `SANSKRIT_RAG_EMBEDDING_BACKEND`

Use [`.env.example`](.env.example) as the local template.

## API Endpoints

- `GET /api/health`
- `GET /api/info`
- `GET /api/tracks`
- `POST /api/chat`
- `POST /api/grounded-answer`
- `POST /api/transliterate`

## Optional Deployment Assets

- `docker/Dockerfile`
- `docker/docker-compose.yml`
- `docker/nginx.conf`
- `k8s/deployment.yaml`
- `vercel.json`

## Docs

- [project-setup-guide.md](docs/project-setup-guide.md)
- [transformation-roadmap.md](docs/transformation-roadmap.md)
- [original-vs-current.md](docs/original-vs-current.md)
