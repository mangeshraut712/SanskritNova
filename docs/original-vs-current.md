# Original vs Current

## Original

- Local Python CLI and offline workflow
- CPU-only Sanskrit document RAG
- FAISS and SentenceTransformers retrieval
- Local index and chunk artifacts under `code/`
- Manual setup around the original corpus

## Current

- FastAPI backend in `api/`
- Static frontend in `public/`
- OpenRouter-backed `learn`, `translate`, and `analyze` chat modes
- Separate grounded-answer endpoint that reuses the original retrieval layer from `code/`
- Devanagari to IAST transliteration
- Study tracks loaded from `GET /api/tracks`

## Main Difference

The original repo was a local research prototype. The current repo is a web app with the original RAG pipeline preserved as the grounding layer instead of being replaced.

## Still Missing

- citations in the main chat flow
- saved progress and learner accounts
- richer Sanskrit NLP beyond transliteration and retrieval
- persistent application data and production observability
