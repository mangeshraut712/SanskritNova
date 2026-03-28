<div align="center">

# SanskritNova AI

<p><strong>A modern Sanskrit learning product with an AI tutor, fast transliteration, guided tracks, and a release-ready GitHub + Vercel workflow.</strong></p>

<p>
  <a href="https://sanskrit-nova.vercel.app">Live Product</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#product-surface">Product Surface</a>
  ·
  <a href="#developer-workflow">Developer Workflow</a>
  ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p>
  <img alt="License" src="https://img.shields.io/github/license/mangeshraut712/SanskritNova?style=flat-square">
  <img alt="Python" src="https://img.shields.io/badge/python-3.11%2B-3776AB?style=flat-square&logo=python&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/node-18%2B-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-single--page-111111?style=flat-square">
  <img alt="Backend" src="https://img.shields.io/badge/backend-FastAPI%20%2B%20Vercel-009688?style=flat-square">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
  <img alt="Release Checks" src="https://img.shields.io/badge/release%20checks-repo%20native-6E56CF?style=flat-square">
</p>

</div>

## Why This Repo Exists

SanskritNova is not a docs-heavy demo site. It is a focused product surface for:

- learning Sanskrit with an AI tutor
- converting Devanagari and IAST quickly
- moving through compact guided study tracks

The repo also includes the operational pieces needed to ship that experience:

- local API and Vercel API entrypoints
- optional local RAG and indexing pipeline
- release checks for GitHub and Vercel
- Docker, Netlify, and Kubernetes deployment artifacts

## Product Surface

| Surface | User value | Runtime |
| --- | --- | --- |
| Tutor Studio | Ask for explanation, translation, or analysis in one place | [`public/index.html`](public/index.html) + [`api/index.py`](api/index.py) locally, [`api/index_complex.py`](api/index_complex.py) on Vercel |
| Transliteration Lab | Convert Devanagari ↔ IAST with history and copy flow | [`public/index.html`](public/index.html) + `/api/transliterate` |
| Guided Tracks | Keep the learning path compact and product-shaped | [`public/index.html`](public/index.html) |

## At A Glance

| Area | Default path | Extended path |
| --- | --- | --- |
| Frontend | Static single-page app in [`public/`](public) | PWA support via [`public/sw.js`](public/sw.js) and [`public/manifest.json`](public/manifest.json) |
| Local API | [`api/index.py`](api/index.py) | [`api/index_complex.py`](api/index_complex.py) for grounded and agentic flows |
| Production API | [`api/index_complex.py`](api/index_complex.py) on Vercel | OpenRouter-backed chat, grounded fallback, and agentic fallback |
| AI / retrieval | Product-safe defaults | Local index + RAG stack in [`code/`](code) |
| Release flow | [`scripts/release-checks.sh`](scripts/release-checks.sh) | [`scripts/deploy-vercel.sh`](scripts/deploy-vercel.sh) and [`scripts/commit-release.sh`](scripts/commit-release.sh) |

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

Important environment variables:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_APP_NAME`
- `OPENROUTER_APP_URL`

Optional local retrieval configuration lives under `SANSKRIT_RAG_*` in [`.env.example`](.env.example).

### Run

```bash
make dev
```

or

```bash
npm run dev
```

The frontend starts at `http://127.0.0.1:3000/` and automatically moves to the next free port if needed. The frontend targets `http://127.0.0.1:8000` for local API requests.

<details>
<summary><strong>Run one surface at a time</strong></summary>

```bash
# API only
make serve-api
npm run dev:api

# Frontend only
make serve-site
npm run dev:web
```

</details>

## Developer Workflow

### Main commands

```bash
make test
make lint
make format
make security
make clean
make verify-release

npm run format
npm run format:check
npm run lint:prettier
```

### Release workflow

```bash
# Run all pre-release checks
bash scripts/release-checks.sh

# Commit the current release state
bash scripts/commit-release.sh

# Push main
bash scripts/push-main.sh

# Deploy preview
bash scripts/deploy-vercel.sh

# Deploy production
bash scripts/deploy-vercel.sh production
```

### What `verify-release` covers

- JavaScript syntax for deployed entrypoints
- Vercel config JSON validation
- Python byte-compilation for `api/` and `code/`
- `pytest` across the test suite

## Repository Layout

```text
.
├── api/                  # Local FastAPI app, Vercel API handler, serverless adapters
├── code/                 # Retrieval, RAG, indexing, and local ML modules
├── data/                 # Local corpus for indexing / retrieval
├── public/               # Canonical production frontend
├── scripts/              # Dev, deploy, commit, and release-check scripts
├── tests/                # Automated test suite
├── docker/               # Docker assets
├── k8s/                  # Kubernetes manifests
├── netlify/              # Netlify function assets
├── .vercelignore
├── Makefile
├── package.json
├── pyproject.toml
├── requirements.txt
└── vercel.json
```

Generated local folders such as `node_modules/`, `venv/`, `.vercel/`, `.ruff_cache/`, and `.pytest_cache/` are not part of the intended committed layout.

## Runtime Model

### Local product flow

- Frontend: [`public/index.html`](public/index.html)
- API: [`api/index.py`](api/index.py)
- Dev launcher: [`scripts/dev.py`](scripts/dev.py)
- Static file server: [`scripts/serve_public.py`](scripts/serve_public.py)

### Production Vercel flow

- Static assets: served from [`public/`](public)
- API entrypoint: [`api/index_complex.py`](api/index_complex.py)
- Routing and caching: [`vercel.json`](vercel.json)
- Upload filtering: [`.vercelignore`](.vercelignore)

### Extended AI path

[`api/index_complex.py`](api/index_complex.py) remains the larger grounded / agentic API path for advanced local experimentation.

## API

### Default local API

Endpoints from [`api/index.py`](api/index.py):

- `GET /api/health`
- `GET /api/info`
- `GET /api/tracks?lang=en|hi`
- `POST /api/transliterate`
- `POST /api/chat`

Example:

```http
POST /api/chat
Content-Type: application/json

{
  "message": "नमस्ते",
  "mode": "learn",
  "lang": "en"
}
```

```http
POST /api/transliterate
Content-Type: application/json

{
  "text": "रामो गच्छति"
}
```

<details>
<summary><strong>Extended AI endpoints</strong></summary>

The OpenRouter-backed extended API in [`api/index_complex.py`](api/index_complex.py) also exposes:

- `POST /api/grounded-answer`
- `POST /api/agentic-answer`

</details>

## AI/ML

The AI/ML implementation lives in [`code/`](code):

- [`retriever.py`](code/retriever.py): FAISS-backed retrieval with script-aware lexical fallback
- [`search_normalization.py`](code/search_normalization.py): Devanagari, IAST, and ASCII search normalization
- [`build_index.py`](code/build_index.py): corpus chunking and index generation
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

The public website is intentionally trimmed to the real product surface. Legacy duplicate microsites and unused page-specific assets have already been removed from the active web bundle.

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

Vercel deployment checklist:

- set `OPENROUTER_API_KEY`
- optionally set `OPENROUTER_MODEL`, `OPENROUTER_APP_NAME`, and `OPENROUTER_APP_URL`
- keep [`public/`](public) as the canonical frontend bundle
- keep [`.vercelignore`](.vercelignore) aligned with the active deployment model

Additional deployment assets still present in the repo:

- Docker in [`docker/`](docker)
- Netlify config in [`netlify.toml`](netlify.toml) and [`netlify/`](netlify)
- Kubernetes manifest in [`k8s/deployment.yaml`](k8s/deployment.yaml)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT. See [`LICENSE`](LICENSE).
