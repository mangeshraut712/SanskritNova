# SanskritNova AI

A modern Sanskrit learning platform with AI-powered tutoring, RAG-based grounded answers, and Devanagari ↔ IAST transliteration.

[![Python 3.13](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green.svg)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black.svg)](https://vercel.com)

[🌐 Live Demo](https://sanskritnova-ai.vercel.app) • [📖 API Docs](#api-endpoints) • [🚀 Quick Start](#quick-start)

## ✨ Features

### 🤖 Intelligent Learning
- **AI Chat Modes**: Learn, Translate, and Analyze with context-aware AI
- **Grounded Answers**: RAG-powered responses from authentic Sanskrit corpus
- **Real-time Transliteration**: Devanagari ↔ IAST conversion

### 🎨 Modern Interface
- **Glass-morphism Design**: Inspired by ancient Indian art aesthetics
- **Responsive UI**: Optimized for desktop, tablet, and mobile
- **Progressive Web App**: Offline capabilities and native app experience

### 🚀 Production Ready
- **Global Deployment**: Vercel edge network for worldwide performance
- **Container Support**: Docker and Kubernetes manifests included
- **CI/CD Pipeline**: Automated testing and deployment

## 🏗️ Tech Stack

- **Backend**: Python 3.13, FastAPI, Pydantic v2
- **AI/ML**: OpenRouter API, ChromaDB, sentence-transformers
- **Frontend**: Vanilla JavaScript, CSS3, Glass-morphism
- **Deployment**: Vercel, Docker, Kubernetes
- **DevOps**: GitHub Actions, automated testing

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- OpenRouter API key

### Installation

```bash
# Clone repository
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova

# Install dependencies
pip install -r requirements.txt

# Run locally
make serve-api
# Open http://localhost:8001
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Add your API key
OPENROUTER_API_KEY=your_key_here
```

## 💬 Chat Modes

| Mode | Description | Example |
|------|-------------|---------|
| **Learn** | Interactive explanations | "What is dharma?" |
| **Translate** | Bidirectional translation | "Translate: yoga" |
| **Analyze** | Grammar analysis | "Analyze sandhi in रामो गच्छति" |
| **Grounded** | Corpus-backed answers | "What does the Gita say about karma?" |

## 🔤 Transliteration

Convert between Devanagari script and IAST romanization:

```bash
Input:  नमस्ते
Output: namaste

Input: rāmo gacchati
Output: रामो गच्छति
```

## 📚 Study Tracks

Structured learning paths for Sanskrit learners:

- **Foundations**: Script basics, pronunciation, vocabulary
- **Gita Study**: Verse-by-verse Bhagavad Gita analysis
- **Grammar Lab**: Advanced sandhi, compounds, syntax

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/info` | API information |
| `GET` | `/api/tracks` | Study tracks |
| `POST` | `/api/chat` | AI chat with mode selection |
| `POST` | `/api/grounded-answer` | RAG-powered answers |
| `POST` | `/api/transliterate` | Script conversion |

### Example Usage

```python
import requests

# Chat with AI
response = requests.post("https://sanskritnova-ai.vercel.app/api/chat", json={
    "message": "Explain योगः चित्तवृत्तिनिरोधः",
    "mode": "learn"
})

# Transliterate text
response = requests.post("https://sanskritnova-ai.vercel.app/api/transliterate", json={
    "text": "रामो गच्छति"
})
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mangeshraut712/SanskritNova)

1. Import GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Add environment variables
4. Deploy automatically

### Docker

```bash
# Build and run
docker build -t sanskritnova -f docker/Dockerfile .
docker run -p 8001:8001 --env-file .env sanskritnova
```

### Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
```

## 🧪 Development

```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run tests
pytest tests/ -v

# Code quality
ruff check .
ruff format .

# Start development server
make serve-api
```

## 📁 Project Structure

```
sanskritnova-ai/
├── api/                 # FastAPI backend
├── public/              # Frontend assets
├── src/sanskrit_rag/    # Core modules
├── docker/              # Container configs
├── k8s/                 # Kubernetes manifests
├── tests/               # Test suite
└── docs/                # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pytest tests/`
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Sanskrit scholars and linguistic community
- OpenRouter for AI infrastructure
- Open source contributors

---

**योगः कर्मसु कौशलम्** - Yoga is skill in action

Made with ❤️ for Sanskrit learners worldwide.
