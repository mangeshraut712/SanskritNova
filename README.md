# SanskritNova AI - 2026 Edition 🚀

**AI-Powered Sanskrit Learning for the Modern Indian Mind**

SanskritNova AI is a cutting-edge 2026 Sanskrit learning platform designed specifically for Indian users, combining ancient wisdom with modern AI technology. Built with progressive web app (PWA) capabilities, offline functionality, and bilingual support (English + Hindi), it brings Sanskrit education to rural India and urban millennials alike.

## 🌟 2026 Key Features

### 🤖 AI-Powered Learning

- **Multilingual AI Chat**: Intelligent tutoring in English and Hindi
- **Agentic RAG Pipeline** (NEW): Self-correcting retrieval with query routing, chunk evaluation, and hallucination detection
- **Grounded Answers**: AI responses backed by authentic Sanskrit texts
- **Smart Translation**: Bidirectional Sanskrit-English translation
- **Grammar Analysis**: Deep linguistic analysis with cultural context

### 🎯 Indian User Experience

- **Hindi Interface**: Complete bilingual UI (English/हिंदी)
- **Offline Learning**: Download tracks for rural connectivity challenges
- **PWA Ready**: Install as native app on smartphones
- **Audio Pronunciation**: Sanskrit text-to-speech with IAST accuracy

### 📚 Structured Education

- **Learning Tracks**: 3 curated courses (Foundations, Bhagavad Gita, Grammar Lab)
- **Progressive Learning**: Beginner to Advanced pathways
- **Track Downloads**: Offline access to learning materials
- **Progress Tracking**: Built-in learning analytics

### 🔧 Technical Excellence

- **Progressive Web App**: Installable, offline-capable, push notifications
- **Service Worker**: Background sync, caching, offline functionality
- **Speech Synthesis**: Web Speech API for pronunciation
- **Mobile-First**: Responsive design optimized for Indian smartphones

## 🎨 2026 Design Philosophy

**"Modern Ancient, Accessible Indian"** - Bridging 5000 years of Sanskrit heritage with 2026 technology:

- **Cultural Aesthetics**: Saffron & gold accents on deep indigo surfaces
- **Typography**: Devanagari + Latin scripts with serif hierarchy
- **Accessibility**: Screen reader support, high contrast modes
- **Performance**: Sub-2MB bundle, instant loading, offline-first
- **Mobile UX**: Touch-optimized, gesture navigation, PWA install prompts

## 📱 PWA Features

- **Install Prompt**: Automatic installation suggestions
- **Offline Mode**: Core functionality works without internet
- **Background Sync**: Messages sync when connection returns
- **Push Notifications**: Learning reminders and updates
- **App Shortcuts**: Quick access to key features

## 🏗️ Repository Architecture

```text
api/           FastAPI backend with Hindi/English AI support
├── index.py   Main API with chat, tracks, transliteration, agentic RAG endpoints
├── __init__.py Package initialization

public/        Progressive Web App frontend
├── index.html PWA-enabled HTML with Hindi translations
├── app.js     Bilingual UI with speech synthesis & offline features
├── styles.css Modern Indian aesthetic with mobile-first design
├── manifest.json PWA manifest for app installation
├── sw.js      Service worker for offline functionality

code/          Core RAG pipeline and vector store
├── agentic_rag.py  Agentic RAG pipeline with LangGraph v2 (error boundaries, streaming)
├── vector_store.py Vector store abstraction (ChromaDB + Pinecone + embedding pipeline)
├── rag_pipeline.py SanskritRAG — combined retriever + generator
├── retriever.py    FAISS-backed retriever (TF-IDF / sentence-transformers)
├── generator.py    Local LLM generator (llama-cpp-python)
├── build_index.py  FAISS index builder
├── ingest.py       Document loader (TXT, PDF, DOCX)
├── preprocess.py   Text cleaning and chunking
├── config.py       Settings dataclass
├── api.py          Sanskrit RAG API (legacy)
├── app.py          CLI entrypoint

sanskrit_rag/  Wrapper package delegating to code/ modules
├── _loader.py      Dynamic module loader
tests/         Comprehensive test suite
├── test_api.py           FastAPI endpoint tests
├── test_agentic_rag.py   Agentic RAG pipeline + streaming tests
├── test_code_api.py      Legacy code API tests
├── test_config.py        Config validation tests
├── test_preprocess.py    Text processing tests
├── test_retriever.py     Retriever fallback tests
docs/          Setup guides and architectural docs
docker/        Container deployment assets
k8s/          Kubernetes manifests for scaling
```

### 🧠 Agentic RAG Pipeline (NEW)

SanskritNova's agentic RAG system goes beyond simple retrieve-and-generate. It uses a LangGraph StateGraph with conditional routing, quality gates, and self-correction loops to deliver grounded, validated answers from the Sanskrit corpus.

```text
User Query
    │
    ▼
┌─────────────────┐
│  Query Analyzer  │  ← classifies: direct / retrieve / reformulate
└──┬──────┬───┬───┘
   │      │   │
   ▼      ▼   ▼
 Direct  Reformulate  Retrieve
 Answer      │          │
   │         ▼          │
   │    (rephrase)      │
   │         │          ▼
   │         └────►┌──────────┐
   │               │ Retriever │  ← fetches chunks from Sanskrit corpus
   │               └────┬─────┘
   │                    ▼
   │               ┌──────────┐
   │               │ Chunk     │  ← scores relevance (0-10), filters < 4
   │               │ Evaluator │
   │               └────┬─────┘
   │                    │
   │              ┌─────┴──────┐
   │              │             │
   │          insufficient   good
   │              │             │
   │              ▼             ▼
   │     ┌──────────────┐  ┌──────────┐
   │     │ Self-Corrector│  │ Generator │  ← produces grounded answer
   │     │ (max 3 tries) │  └────┬─────┘
   │     └──────┬───────┘       │
   │            │               ▼
   │            │          ┌──────────────┐
   │            └──────►   │ Answer Checker│  ← validates: grounded? complete?
   │              retry    └──────┬───────┘    hallucination?
   │                             │
   │                       ┌─────┴──────┐
   │                       │             │
   │                    good          failed
   │                       │             │
   │                       │        (retry if < 3 attempts)
   ▼                       ▼             │
   └───────────────► Final Answer ◄──────┘
```

**Pipeline Nodes:**

| Node                   | Role                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Query Analyzer**     | Classifies the query as `direct` (no retrieval needed), `retrieve` (needs corpus), or `reformulate` (ambiguous — needs rephrasing) |
| **Query Reformulator** | Rewrites vague queries into retrieval-friendly terms using Sanskrit-specific context                                               |
| **Retriever**          | Fetches top-k chunks from the Sanskrit corpus via FAISS or vector store                                                            |
| **Chunk Evaluator**    | Scores each chunk's relevance (0-10) and filters out anything below 4.0                                                            |
| **Direct Answer**      | Handles general-knowledge questions without retrieval                                                                              |
| **Generator**          | Produces a grounded answer from filtered chunks with source references                                                             |
| **Answer Checker**     | Validates groundedness, completeness, and hallucination risk against source context                                                |
| **Self-Corrector**     | Reformulates the query based on quality-check feedback and retries retrieval (max 3 attempts)                                      |

**Key Features:**

- **Error Boundaries**: Each node is wrapped with async error handling — a failure in one node doesn't crash the pipeline
- **Streaming Support**: `agentic_answer_stream()` yields real-time events as each node completes
- **Robust Imports**: Graceful fallback when `langgraph`/`langchain` are not installed
- **Structured Logging**: Full observability via Python's `logging` module

**Self-Correction Loop (max 3 attempts):**

When the Answer Checker flags an answer as `insufficient` or `hallucination`, the Self-Corrector node reformulates the query using the checker's feedback and loops back to the Retriever. After 3 failed attempts, the best available answer is returned with quality metadata.

### 🗄️ Vector Store Integration (NEW)

SanskritNova now supports pluggable vector stores for production-grade semantic search:

| Backend      | Use Case                          | Setup                                           |
| ------------ | --------------------------------- | ----------------------------------------------- |
| **ChromaDB** | Local development, zero-config    | `pip install chromadb`                          |
| **Pinecone** | Cloud production, managed scaling | `pip install pinecone` + set `PINECONE_API_KEY` |

```python
from code.vector_store import VectorStore, load_chunks_into_store

# Local (ChromaDB)
store = VectorStore.create("chromadb", collection="sanskrit_corpus")
store.add_documents(texts=["योगः चित्तवृत्तिनिरोधः"], metadatas=[{"source": "YogaSutras"}])
results = store.search("What is yoga?", k=5)

# Cloud (Pinecone)
store = VectorStore.create("pinecone", index_name="sanskrit-nova")
results = store.search("धर्मः किम्?", k=5)
```

**Embedding Providers:**

| Provider             | Model                                  | Backend         |
| -------------------- | -------------------------------------- | --------------- |
| SentenceTransformers | `distiluse-base-multilingual-cased-v1` | Local (default) |
| OpenAI/OpenRouter    | `text-embedding-3-small`               | Cloud API       |

**Chunk Metadata Tracking:**

Every chunk stores: `source`, `chunk_id`, `text`, `page`, `section`, `language`, `embedding_model`, `created_at`.

**API Endpoint:**

```http
POST /api/agentic-answer
Content-Type: application/json

{
  "message": "भगवद् गीता में योग का क्या अर्थ है?"
}
```

**Response:**

```json
{
  "reply": "योगः कर्मसु कौशलम् ...",
  "sources": [{ "source": "BhagavadGita", "chunk_id": 42, "text": "..." }],
  "steps": [
    "Query classified as: retrieve",
    "Retrieved 5 chunks",
    "Evaluated 5 chunks, kept 3 (threshold: 4.0+)",
    "Generated answer from 3 chunks",
    "Answer check: grounded=true, complete=true, hallucination=false"
  ],
  "attempts": 0,
  "quality": "good"
}
```

**Usage in code:**

```python
from code.agentic_rag import agentic_answer, agentic_answer_stream

# Synchronous
result = await agentic_answer("What is the meaning of dharma in Sanskrit?")
print(result["answer"])     # Grounded response
print(result["quality"])    # "good" | "insufficient" | "hallucination"
print(result["attempts"])   # Number of self-correction cycles used

# Streaming (for real-time UI)
async for event in agentic_answer_stream("What is yoga?"):
    print(f"[{event['node']}] {event['data']}")
```

## 🎯 2026 Indian Market Focus

**Target Users:**

- **Urban Millennials**: Tech-savvy Indians seeking cultural reconnection
- **Rural Students**: Offline learning for areas with poor connectivity
- **Academic Community**: Integration with Sanskrit universities
- **Language Enthusiasts**: Self-paced learning with AI assistance

**Key Differentiators:**

- **First Bilingual Sanskrit App**: English + Hindi interface
- **Offline-First**: Works in rural India without internet
- **Government Integration**: DIKSHA/SCERT compatible
- **Cultural Authenticity**: Sanskrit pronunciation, Vedic aesthetics

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

If you only want the lightweight runtime stack:

```bash
pip install -e ".[dev]"
```

For local RAG + vector store support:

```bash
pip install -e ".[local]"
```

For vector store backends (ChromaDB / Pinecone):

```bash
pip install -e ".[vector]"
```

The lightweight web install is enough for:

- `chat`
- `tracks`
- `transliteration`
- `agentic-answer` (requires `langgraph`, `langchain-core`, `langchain-openai` — included in base deps)

## 🧪 Testing

```bash
# Run all tests
pytest tests

# Run with verbose output
pytest tests -v

# Run specific test file
pytest tests/test_agentic_rag.py

# Run only API tests
pytest tests/test_api.py

# Run with coverage
pytest tests --cov=code --cov=api
```

**Test suite:**

- `tests/test_api.py` — FastAPI endpoint tests (health, chat, grounded-answer, agentic-answer, transliteration)
- `tests/test_agentic_rag.py` — Agentic RAG pipeline node tests, routing logic, streaming
- `tests/test_code_api.py` — Legacy code API tests with stubbed dependencies
- `tests/test_config.py` — Configuration/settings validation
- `tests/test_preprocess.py` — Text cleaning and chunking tests
- `tests/test_retriever.py` — Retriever fallback behavior tests

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
- fails closed with `503` when no grounded sources are available

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

## 🔌 API Endpoints

### Core Endpoints

- `GET /api/health` - Health check
- `GET /api/info` - API information and capabilities
- `GET /api/tracks?lang=en|hi` - Learning tracks (bilingual)
- `POST /api/chat` - AI chat with language support
- `POST /api/grounded-answer` - Grounded answers from Sanskrit corpus
- `POST /api/transliterate` - Devanagari ↔ IAST conversion

### Request Examples

**Chat with Hindi Support:**

```json
POST /api/chat
{
  "message": "योग का अर्थ क्या है?",
  "mode": "learn",
  "lang": "hi"
}
```

**Get Tracks in Hindi:**

```http
GET /api/tracks?lang=hi
```

**Transliteration with Audio:**

```json
POST /api/transliterate
{
  "text": "रामो गच्छति सीतां प्रति"
}
```

## 🚀 Deployment & Scaling

### Quick Deploy

```bash
# Vercel (Recommended for PWA)
vercel --prod

# Docker
docker-compose up -d

# Kubernetes
kubectl apply -f k8s/
```

### 2026 Production Stack

- **Frontend**: Vercel Edge Network (global CDN)
- **Backend**: Railway/Fly.io (FastAPI)
- **Database**: PlanetScale (MySQL)
- **AI**: OpenRouter (multi-model)
- **Analytics**: Plausible (privacy-first)
- **Monitoring**: Sentry (error tracking)

## 🎯 2026 Roadmap

### Q2 2026: Launch Phase

- [x] Bilingual Hindi/English interface
- [x] PWA with offline functionality
- [x] Audio pronunciation features
- [ ] Government partnerships (DIKSHA integration)
- [ ] WhatsApp bot integration

### Q3 2026: Scale Phase

- [ ] Mobile apps (React Native)
- [ ] Multi-language support (Tamil, Telugu, etc.)
- [ ] Advanced AI features (conversation memory)
- [ ] Certification programs
- [ ] Community features

### Q4 2026: Growth Phase

- [ ] VR/AR Sanskrit learning
- [ ] Integration with Sanskrit universities
- [ ] Corporate training programs
- [ ] International expansion

## 📊 Impact Metrics (2026 Goals)

- **1M+ Users**: Active Sanskrit learners in India
- **500K Downloads**: PWA installations
- **10M+ Interactions**: AI chat conversations
- **100+ Schools**: Educational partnerships
- **95% Uptime**: Production reliability

---

## 🏆 Recognition

**Built for India, by understanding Indian needs:**

- Offline-first for rural connectivity challenges
- Hindi localization for accessibility
- Cultural aesthetics respecting Sanskrit heritage
- Mobile-optimized for affordable smartphones
- Government-aligned for educational integration

_Contributing to India's knowledge renaissance through AI-powered Sanskrit education._ 🇮🇳

## Docs

- [project-setup-guide.md](docs/project-setup-guide.md)
- [transformation-roadmap.md](docs/transformation-roadmap.md)
- [original-vs-current.md](docs/original-vs-current.md)
