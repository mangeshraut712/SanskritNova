# 🕉️ Sanskrit RAG System

> **AI-powered Sanskrit education platform with Retrieval-Augmented Generation**

[![CI](https://github.com/vidhiisaxena/Sanskrit_RagSystem/actions/workflows/ci.yml/badge.svg)](https://github.com/vidhiisaxena/Sanskrit_RagSystem/actions/workflows/ci.yml)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

This project implements a **Retrieval-Augmented Generation (RAG)** system for answering user queries based on **Sanskrit documents**. It ingests Sanskrit text documents, preprocesses and indexes them using vector embeddings, retrieves relevant context for a given query, and generates responses using a lightweight Large Language Model (LLM).

### ✨ Features

- 📖 **Sanskrit Q&A** — Ask questions about Sanskrit texts, get context-grounded answers
- 🔍 **Smart Chunking** — Shloka-aware text splitting that respects verse boundaries (॥)
- 🌐 **REST API** — FastAPI with streaming (SSE), auto-generated OpenAPI docs
- 🔄 **Translation** — Sanskrit ↔ English/Hindi with word-by-word analysis
- 💻 **CPU-only** — Runs without GPU using quantized models (Phi-3 Mini GGUF)
- 🐳 **Docker Ready** — Multi-stage Dockerfile for reproducible deployments
- ✅ **Tested** — Unit tests with pytest, CI/CD via GitHub Actions

---

## Architecture

```
User ──→ FastAPI (REST/SSE) ──→ Retriever (FAISS + SentenceTransformers)
                               ──→ Generator (Phi-3 Mini via llama-cpp)
                               ──→ Response with source citations
```

## Quick Start

### Prerequisites

- Python 3.11+
- [Phi-3 Mini GGUF model](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf) (download manually)

### Installation

```bash
# Clone
git clone https://github.com/vidhiisaxena/Sanskrit_RagSystem.git
cd Sanskrit_RagSystem

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install
pip install -e .

# Copy and edit environment config
cp .env.example .env
```

### Setup Model

Download **Phi-3 Mini GGUF** and place it in `models/`:

```bash
mkdir -p models
# Download from: https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf
# Place as: models/phi3.gguf
```

### Add Sanskrit Documents

Place `.txt`, `.pdf`, or `.docx` Sanskrit files in the `data/` folder.

### Build Index & Run

```bash
# Build vector index
python -m sanskrit_rag.cli build-index

# Option A: Interactive CLI
python -m sanskrit_rag.cli

# Option B: Start API server
python -m sanskrit_rag.cli serve
# → API docs at http://localhost:8000/docs
```

### Docker

```bash
cd docker
docker compose up --build
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check & readiness |
| `POST` | `/api/v1/query` | Ask a Sanskrit question |
| `POST` | `/api/v1/query/stream` | Streaming answer (SSE) |
| `POST` | `/api/v1/translate` | Translate Sanskrit text |

See full API docs at `/docs` (Swagger) or `/redoc` (ReDoc) when the server is running.

---

## Project Structure

```
Sanskrit_RagSystem/
├── src/sanskrit_rag/        # Main package
│   ├── api/                 # FastAPI endpoints
│   ├── generation/          # LLM inference & prompt templates
│   ├── indexing/            # Embeddings & FAISS vector store
│   ├── ingest/              # Document loaders (PDF, DOCX, TXT)
│   ├── processing/          # Sanskrit-aware text cleaning & chunking
│   ├── retrieval/           # Search interface with citations
│   ├── utils/               # Logging, error handling
│   ├── config.py            # Centralized settings (env vars)
│   ├── pipeline.py          # RAG orchestrator
│   └── cli.py               # CLI entry point
├── tests/                   # Unit & integration tests
├── data/                    # Sanskrit documents
├── docker/                  # Dockerfile & compose
├── .github/workflows/       # CI/CD pipeline
├── code/                    # Original prototype (legacy)
├── pyproject.toml           # Dependencies & tooling config
├── Makefile                 # Developer commands
└── CONTRIBUTING.md          # Contribution guide
```

---

## Development

```bash
# Install with dev dependencies
pip install -e ".[all]"

# Run tests
make test

# Lint & format
make lint
make format

# Type check
make typecheck
```

---

## Technologies

| Component | Technology |
|-----------|-----------|
| **Language** | Python 3.11+ |
| **API Framework** | FastAPI + Uvicorn |
| **Embeddings** | SentenceTransformers (multilingual) |
| **Vector Search** | FAISS (CPU) |
| **LLM Inference** | llama-cpp-python (CPU) |
| **LLM Model** | Phi-3 Mini (GGUF quantized) |
| **Config** | Pydantic Settings + .env |
| **Logging** | structlog (JSON) |
| **Testing** | pytest + coverage |
| **CI/CD** | GitHub Actions |
| **Container** | Docker (multi-stage) |

---

## Roadmap

- [ ] Hybrid retrieval (dense + BM25 sparse search)
- [ ] Cross-encoder reranking
- [ ] Next.js web frontend with chat UI
- [ ] Sanskrit morphological analysis (sandhi, samāsa)
- [ ] Transliteration (Devanagari ↔ IAST ↔ Roman)
- [ ] Multi-model LLM support (Phi-4, Gemma 3, Gemini)
- [ ] Gamification (XP, badges, learning streaks)
- [ ] AR flashcards for Sanskrit learning
- [ ] Blockchain-verified learning credentials
- [ ] Kubernetes deployment with autoscaling

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">🙏 संस्कृतं जीवतु — May Sanskrit thrive!</p>
