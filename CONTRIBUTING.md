# Contributing to SanskritNova AI

This repo has two main code areas:

- `api/` + `public/` for the web app
- `code/` for the original Sanskrit RAG implementation and local artifacts

## Local Setup

```bash
git clone https://github.com/vidhiisaxena/Sanskrit_RagSystem.git
cd Sanskrit_RagSystem
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Optional local RAG dependencies:

```bash
pip install -e ".[local]"
```

## Working Rules

- Keep web changes in `api/` and `public/`
- Keep original retrieval work in `code/`
- Do not commit secrets or API keys
- Keep the grounded-answer path working when touching retrieval code
- Update docs when the project shape changes

## Useful Commands

```bash
make serve-api
make serve-site
make rag-index
make rag-cli
make test
make lint
make format
```

## Pull Requests

Before opening a PR:

```bash
make lint
make test
```
