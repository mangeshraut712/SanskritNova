# SanskritNova AI - 2026 Edition 🚀

**AI-Powered Sanskrit Learning for the Modern Indian Mind**

SanskritNova AI is a cutting-edge 2026 Sanskrit learning platform designed specifically for Indian users, combining ancient wisdom with modern AI technology. Built with progressive web app (PWA) capabilities, offline functionality, and bilingual support (English + Hindi), it brings Sanskrit education to rural India and urban millennials alike.

## 🌟 2026 Key Features

### 🤖 AI-Powered Learning
- **Multilingual AI Chat**: Intelligent tutoring in English and Hindi
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
├── index.py   Main API with chat, tracks, transliteration endpoints
├── __init__.py Package initialization

public/        Progressive Web App frontend
├── index.html PWA-enabled HTML with Hindi translations
├── app.js     Bilingual UI with speech synthesis & offline features
├── styles.css Modern Indian aesthetic with mobile-first design
├── manifest.json PWA manifest for app installation
├── sw.js      Service worker for offline functionality

code/          Original RAG pipeline (legacy)
docs/          Setup guides and architectural docs
tests/         Comprehensive test suite (21 tests passing)
docker/        Container deployment assets
k8s/          Kubernetes manifests for scaling
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

*Contributing to India's knowledge renaissance through AI-powered Sanskrit education.* 🇮🇳

## Docs

- [project-setup-guide.md](docs/project-setup-guide.md)
- [transformation-roadmap.md](docs/transformation-roadmap.md)
- [original-vs-current.md](docs/original-vs-current.md)
