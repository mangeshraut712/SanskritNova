<div align="center">

# SanskritNova AI

<p><strong>Sanskrit learning product with a polished single-page web app, a FastAPI backend, and optional local RAG tooling.</strong></p>

<p>
  <a href="https://sanskrit-nova.vercel.app">Live Demo</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#api">API</a>
  ·
  <a href="#aiml">AI/ML</a>
  ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p>
  <img alt="License" src="https://img.shields.io/github/license/mangeshraut712/SanskritNova?style=flat-square">
  <img alt="Python" src="https://img.shields.io/badge/python-3.11%2B-3776AB?style=flat-square&logo=python&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/node-18%2B-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-vanilla%20web-111111?style=flat-square">
  <img alt="Backend" src="https://img.shields.io/badge/backend-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

</div>

## Overview

SanskritNova is built around three product surfaces:

| Surface | What it does | Main path |
| --- | --- | --- |
| Tutor | Sanskrit learning, explanation, and translation | [`public/index.html`](public/index.html) |
| Transliteration | Devanagari ↔ IAST conversion | [`api/index.py`](api/index.py) |
| Guided tracks | Compact learning paths in the product UI | [`public/index.html`](public/index.html) |

The repository also includes the supporting API, retrieval modules, indexing pipeline, and deployment assets used to run and ship the product.

## At A Glance

| Area | Default | Optional / Extended |
| --- | --- | --- |
| Frontend | Static single-page site in [`public/`](public) | PWA via [`public/sw.js`](public/sw.js) and [`public/manifest.json`](public/manifest.json) |
| Local API | [`api/index.py`](api/index.py) | [`api/index_complex.py`](api/index_complex.py) for grounded and agentic flows |
| AI / retrieval | Lightweight product-safe defaults | Local index + RAG stack in [`code/`](code) |
| Local dev | [`scripts/dev.py`](scripts/dev.py) | Separate web/API commands via `make` and `npm` |
| Deployment | [`vercel.json`](vercel.json) | Docker, Netlify, and Kubernetes assets still present |

## Quick Start

### Requirements

- Python 3.11+
- Node.js 18+

### Install

```bash
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
npm install
```

### Configure

```bash
cp .env.example .env
```

Important runtime variable:

- `OPENROUTER_API_KEY` for the OpenRouter-backed grounded and agentic API flows in [`api/index_complex.py`](api/index_complex.py)

Optional local retrieval settings are defined in `.env.example` under `SANSKRIT_RAG_*`.

### Run

```bash
make dev
```

or

```bash
npm run dev
```

The frontend starts at `http://127.0.0.1:3000/` and automatically moves to the next free port if needed. Local frontend requests target `http://127.0.0.1:8000`.

<details>
<summary><strong>Single-surface commands</strong></summary>

```bash
# API only
make serve-api
npm run dev:api

# Frontend only
make serve-site
npm run dev:web
```

</details>

## Repository Layout

```text
.
├── api/              # Main FastAPI app and serverless entrypoints
├── code/             # Retrieval, RAG, indexing, and local ML modules
├── data/             # Source corpus for local RAG/indexing
├── public/           # Canonical frontend website
├── scripts/          # Local dev and verification scripts
├── tests/            # Automated tests
├── docker/           # Docker assets
├── k8s/              # Kubernetes manifests
├── netlify/          # Netlify function assets
├── Makefile
├── package.json
├── pyproject.toml
├── requirements.txt
├── vercel.json
└── netlify.toml
```

Generated local directories such as `node_modules/`, `venv/`, `.vercel/`, `.ruff_cache/`, and `.pytest_cache/` are intentionally not part of the committed layout.

## Runtime Paths

### What runs by default

- Frontend: [`public/index.html`](public/index.html)
- Local API: [`api/index.py`](api/index.py)
- Dev launcher: [`scripts/dev.py`](scripts/dev.py)
- Static file server: [`scripts/serve_public.py`](scripts/serve_public.py)

### What is extended

[`api/index_complex.py`](api/index_complex.py) is the larger API path for grounded answers and agentic RAG behavior. The default local product flow stays on the lighter `api.index:app`.

## API

### Default local API

Endpoints from [`api/index.py`](api/index.py):

- `GET /api/health`
- `GET /api/info`
- `GET /api/tracks?lang=en|hi`
- `POST /api/transliterate`
- `POST /api/chat`

Example requests:

```http
POST /api/transliterate
Content-Type: application/json

{
  "text": "रामो गच्छति"
}
```

```http
POST /api/chat
Content-Type: application/json

{
  "message": "नमस्ते",
  "mode": "learn",
  "lang": "en"
}
```

<details>
<summary><strong>Expanded AI API</strong></summary>

The OpenRouter-backed extended API in [`api/index_complex.py`](api/index_complex.py) also exposes:

- `POST /api/grounded-answer`
- `POST /api/agentic-answer`

</details>

## AI/ML

The AI/ML implementation lives in [`code/`](code):

- [`retriever.py`](code/retriever.py): FAISS-backed retrieval with script-aware lexical fallback
- [`search_normalization.py`](code/search_normalization.py): Devanagari, IAST, and ASCII search normalization
- [`build_index.py`](code/build_index.py): corpus chunking and FAISS index generation
- [`rag_pipeline.py`](code/rag_pipeline.py): simple retrieve-then-generate flow
- [`agentic_rag.py`](code/agentic_rag.py): agentic RAG pipeline
- [`vector_store.py`](code/vector_store.py): optional vector store abstraction

<details>
<summary><strong>Optional local RAG stack</strong></summary>

Install the optional local extras:

```bash
pip install -e ".[local]"
```

Rebuild the local index from `data/`:

```bash
python -m code.build_index
```

Run the standalone RAG API in [`code/api.py`](code/api.py):

```bash
python -m uvicorn code.api:app --reload --port 8010
```

That API exposes:

- `GET /health`
- `POST /search`
- `POST /answer`
- `POST /ingest/rebuild`

</details>

## Frontend

The canonical web surface lives in [`public/`](public):

- [`index.html`](public/index.html)
- [`scripts/luxury-app.js`](public/scripts/luxury-app.js)
- [`scripts/utils.js`](public/scripts/utils.js)
- [`styles/luxury-styles.css`](public/styles/luxury-styles.css)
- [`styles/luxury-components.css`](public/styles/luxury-components.css)
- [`styles/shared-variables.css`](public/styles/shared-variables.css)
- [`sw.js`](public/sw.js)
- [`manifest.json`](public/manifest.json)

The site is intentionally trimmed to the product showcase and live tools. Duplicate microsites and stale page-specific assets have been removed from the active web surface.

## Commands

```bash
make test
make lint
make format
make security
make clean

npm run format
npm run format:check
npm run lint:prettier

bash scripts/test-website.sh
```

## Testing

Core coverage lives in:

- [`tests/test_api.py`](tests/test_api.py)
- [`tests/test_code_api.py`](tests/test_code_api.py)
- [`tests/test_retriever.py`](tests/test_retriever.py)
- [`tests/test_search_normalization.py`](tests/test_search_normalization.py)
- [`scripts/test-website.sh`](scripts/test-website.sh)

Run:

```bash
python -m pytest
python -m pytest tests/test_api.py tests/test_code_api.py
bash scripts/test-website.sh
```

## Deployment

Primary production target:

- Vercel via [`vercel.json`](vercel.json)
- Node serverless entrypoint via [`api/index.js`](api/index.js)

Vercel deployment checklist:

- Set `OPENROUTER_API_KEY`
- Optionally set `OPENROUTER_MODEL`, `OPENROUTER_APP_NAME`, and `OPENROUTER_APP_URL`
- Keep [`public/`](public) as the canonical frontend surface
- Use [`.vercelignore`](.vercelignore) to avoid uploading local-only or non-runtime folders

Additional deployment assets still present in the repo:

- Docker in [`docker/`](docker)
- Netlify config in [`netlify.toml`](netlify.toml) and [`netlify/`](netlify)
- Kubernetes manifest in [`k8s/deployment.yaml`](k8s/deployment.yaml)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT. See [`LICENSE`](LICENSE).
