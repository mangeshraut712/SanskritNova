# SanskritNova AI

A modern Sanskrit learning platform with AI-powered tutoring, RAG-based grounded answers, and Devanagari ↔ IAST transliteration.

[![Python 3.13](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green.svg)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black.svg)](https://vercel.com)

[🌐 Live Demo](https://sanskritnova-ai.vercel.app) • [📖 API Docs](#api-endpoints) • [🚀 Quick Start](#quick-start)

## ✨ What Makes SanskritNova AI Special

SanskritNova AI bridges the gap between traditional Sanskrit learning and modern AI technology. Unlike generic chatbots or research-only tools, it provides:

- **Contextual Learning**: AI responses grounded in authentic Sanskrit texts
- **Script Mastery**: Seamless transliteration between Devanagari and IAST
- **Structured Progress**: Curated study tracks from beginner to advanced
- **Cultural Respect**: Developed with input from Sanskrit scholars

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
- OpenRouter API key (get from [openrouter.ai](https://openrouter.ai))

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

# Required: OpenRouter API key
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: Custom model and settings
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
OPENROUTER_APP_NAME="SanskritNova AI"
OPENROUTER_APP_URL="http://localhost:8001"
```

## 💬 Chat Modes

| Mode | Description | Example |
|------|-------------|---------|
| **Learn** | Interactive explanations and teaching | "What is dharma?" |
| **Translate** | Bidirectional translation with context | "Translate: yoga means..." |
| **Analyze** | Grammar and linguistic analysis | "Analyze sandhi in रामो गच्छति" |
| **Grounded** | Corpus-backed answers with sources | "What does the Gita say about karma?" |

## 🔤 Transliteration

Convert between Devanagari script and IAST romanization:

```bash
Input:  नमस्ते
Output: namaste

Input: rāmo gacchati
Output: रामो गच्छति
```

**Features:**
- Phonetic accuracy
- Real-time conversion
- Bidirectional support
- Unicode compliant

## 📚 Study Tracks

Structured learning paths for Sanskrit learners:

- **Sanskrit Foundations**: Script basics, pronunciation, essential vocabulary
- **Bhagavad Gita Guided Reading**: Verse-by-verse study with transliteration
- **Grammar Lab**: Advanced sandhi, compounds, morphology, and syntax analysis

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/info` | API information and capabilities |
| `GET` | `/api/tracks` | Available study tracks |
| `POST` | `/api/chat` | AI chat with mode selection |
| `POST` | `/api/grounded-answer` | RAG-powered grounded answers |
| `POST` | `/api/transliterate` | Devanagari ↔ IAST conversion |

### Example Usage

```python
import requests

# Chat with AI
response = requests.post("https://sanskritnova-ai.vercel.app/api/chat", json={
    "message": "Explain योगः चित्तवृत्तिनिरोधः",
    "mode": "learn"
})

# Get grounded answer with sources
response = requests.post("https://sanskritnova-ai.vercel.app/api/grounded-answer", json={
    "message": "What is yoga according to ancient texts?",
    "k": 3  # Number of sources
})

# Transliterate text
response = requests.post("https://sanskritnova-ai.vercel.app/api/transliterate", json={
    "text": "रामो गच्छति"
})
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mangeshraut712/SanskritNova)

1. Import GitHub repository to Vercel
2. Configure build settings:
   - **Framework**: Other
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: (leave empty)
3. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL=anthropic/claude-3.5-sonnet`
4. Deploy automatically

### Docker

```bash
# Build and run
docker build -t sanskritnova -f docker/Dockerfile .
docker run -p 8001:8001 --env-file .env sanskritnova

# Or with Docker Compose
docker-compose up --build
```

### Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
```

## 🧪 Development

```bash
# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest tests/ -v

# Code quality checks
ruff check .
ruff format .

# Start development server
make serve-api

# Serve frontend locally
make serve-site
```

## 🔒 Security & Performance

### Security Features
- **API Key Protection**: Secure environment variable handling
- **Input Validation**: Pydantic v2 schema validation
- **Rate Limiting**: Built-in request throttling
- **CORS Configuration**: Proper cross-origin handling

### Performance Optimizations
- **Async Operations**: Full asyncio implementation
- **Edge Deployment**: Global CDN with Vercel
- **Caching**: Efficient dependency management
- **Optimized Bundles**: Minimal deployment footprint

## 📁 Project Structure

```
sanskritnova-ai/
├── api/                 # FastAPI backend
│   └── index.py         # Main API with endpoints
├── public/              # Frontend assets
│   ├── index.html       # Main UI
│   ├── app.js          # Frontend logic
│   └── styles.css      # Glass-morphism CSS
├── src/sanskrit_rag/    # Core modules
│   ├── api/            # API schemas
│   ├── processing/     # NLP & transliteration
│   ├── retrieval/      # RAG components
│   └── generation/     # AI generation
├── code/                # Original RAG modules
├── docker/              # Container configurations
├── k8s/                 # Kubernetes manifests
├── tests/               # Test suite
├── docs/                # Documentation
└── .github/             # CI/CD workflows
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run the test suite: `pytest tests/`
5. Submit a pull request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📈 Roadmap

### Phase 1 (Current) ✅
- AI chat modes (Learn, Translate, Analyze)
- RAG-powered grounded answers
- Devanagari ↔ IAST transliteration
- Glass-morphism UI design
- Production deployment

### Phase 2 (Q2 2026)
- Multimodal RAG (images + text)
- Advanced Sanskrit grammar analysis
- Personalized learning paths
- Mobile PWA optimization

### Phase 3 (Q4 2026)
- Sanskrit speech recognition
- VR/AR learning experiences
- Integration with GPT-5 and beyond
- Quantum-resistant security

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/mangeshraut712/SanskritNova/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mangeshraut712/SanskritNova/discussions)
- **Documentation**: [Project Wiki](https://github.com/mangeshraut712/SanskritNova/wiki)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sanskrit Scholars**: For preserving ancient wisdom and linguistic accuracy
- **OpenRouter**: For democratizing access to advanced AI models
- **Open Source Community**: For the tools and frameworks that make this possible
- **Contributors**: For helping build the future of Sanskrit learning

---

**योगः कर्मसु कौशलम्** - Yoga is skill in action

Made with ❤️ for Sanskrit learners worldwide.
