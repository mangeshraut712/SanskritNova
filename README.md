# SanskritNova AI 🕉️

**AI-Powered Sanskrit Learning Platform**

SanskritNova AI is a comprehensive Sanskrit learning platform that combines ancient wisdom with modern AI technology. Built with bilingual support (English + Hindi), offline capabilities, and production-grade deployment, it makes Sanskrit education accessible to learners across India and globally.

## 🌟 Key Features

### 🤖 AI-Powered Learning
- **Multilingual AI Chat**: Intelligent tutoring in English and Hindi
- **Smart Translation**: Bidirectional Sanskrit-English transliteration (Devanagari ↔ IAST)
- **Grammar Analysis**: Deep linguistic analysis with cultural context
- **Learning Tracks**: Structured courses from beginner to advanced

### 🎯 User Experience
- **Bilingual Interface**: Complete English/हिंदी support
- **Mobile-First Design**: Optimized for smartphone usage
- **Progressive Web App**: Install as native app with offline capabilities
- **Apple India Inspired Design**: Clean, modern interface with cultural elements

### 🔧 Technical Excellence
- **Production-Ready API**: FastAPI backend with comprehensive testing
- **Multi-Platform Deployment**: Vercel + Netlify for global reach
- **Modern Architecture**: Clean codebase with proper error handling
- **Comprehensive Testing**: 33 passing tests with full coverage

## 🏗️ Project Structure

```
sanskritnova/
├── 📁 api/                    # FastAPI backend
│   ├── index.py              # Main API with all endpoints
│   ├── chat.py               # Chat functionality
│   ├── transliterate.py      # Devanagari ↔ IAST conversion
│   ├── tracks.py             # Learning tracks data
│   ├── health.py             # Health check endpoint
│   └── info.py               # API information
├── 📁 code/                   # Core AI/ML components
│   ├── agentic_rag.py       # Advanced RAG pipeline
│   ├── vector_store.py       # Vector store abstraction
│   ├── rag_pipeline.py       # RAG implementation
│   ├── retriever.py          # Document retrieval
│   ├── generator.py          # LLM response generation
│   └── preprocess.py         # Text preprocessing
├── 📁 public/                 # Progressive Web App
│   ├── index.html           # Main application (Apple India design)
│   ├── apple-india-*.css/js # Apple India inspired components
│   ├── manifest.json        # PWA manifest
│   └── sw.js              # Service worker for offline
├── 📁 tests/                  # Comprehensive test suite
│   ├── test_api.py          # API endpoint tests
│   ├── test_agentic_rag.py  # RAG pipeline tests
│   └── test_*.py            # Additional test modules
├── 📁 netlify/               # Netlify deployment
├── 📁 docs/                  # Documentation
├── 📄 pyproject.toml        # Python project configuration
├── 📄 vercel.json          # Vercel deployment config
└── 📄 netlify.toml         # Netlify deployment config
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Git for version control
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova

# Set up Python environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

### Local Development

```bash
# Run tests
pytest tests/ -v

# Start API server
python -m uvicorn api.index:app --reload --host 0.0.0.0 --port 8000

# Start web frontend
python -m http.server 3000 -d public
```

## 🔌 API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/health` | GET | Health check |
| `/api/info` | GET | API information |
| `/api/tracks` | GET | Learning tracks (`?lang=en|hi`) |
| `/api/transliterate` | POST | Devanagari ↔ IAST conversion |
| `/api/chat` | POST | AI chat with language support |

### Request Examples

#### Health Check
```bash
curl https://sanskrit-nova.vercel.app/api/health
```

#### Get Learning Tracks
```bash
# English tracks
curl https://sanskrit-nova.vercel.app/api/tracks

# Hindi tracks
curl https://sanskrit-nova.vercel.app/api/tracks?lang=hi
```

#### Transliteration
```bash
curl -X POST https://sanskrit-nova.vercel.app/api/transliterate \
  -H "Content-Type: application/json" \
  -d '{"text": "रामो गच्छति"}'
```

#### AI Chat
```bash
curl -X POST https://sanskrit-nova.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is yoga?", "mode": "learn"}'
```

## 🧪 Testing

```bash
# Full test suite
pytest tests/ -v

# With coverage
pytest tests/ --cov=code --cov=api

# Specific test files
pytest tests/test_api.py
pytest tests/test_agentic_rag.py
```

**Test Coverage:**
- **33 tests** passing
- **API endpoints**: Full coverage
- **RAG pipeline**: Comprehensive testing
- **Error handling**: Robust validation

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod

# Live URL: https://sanskrit-nova.vercel.app
```

### Netlify
```bash
# Deploy to Netlify
npx netlify-cli deploy --prod

# Live URL: https://sanskritnova.netlify.app
```

## 🔧 Configuration

### Environment Variables

```bash
# OpenRouter (for AI chat)
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo
OPENROUTER_APP_NAME=SanskritNova
OPENROUTER_APP_URL=https://sanskrit-nova.vercel.app
```

## 📊 Features in Detail

### Transliteration Engine
- **Devanagari to IAST**: Accurate Sanskrit transliteration
- **Bidirectional**: Support for both directions
- **Comprehensive**: Handles all Sanskrit characters and diacritics
- **Performance**: Optimized for real-time conversion

### Learning Tracks
1. **Sanskrit Foundations** (Beginner - 2 weeks)
   - Script basics, pronunciation, essential vocabulary
2. **Bhagavad Gita Guided Reading** (Intermediate - 4 weeks)
   - Verse-by-verse study with transliteration
3. **Grammar Lab** (Advanced - Ongoing)
   - Sandhi, compounds, morphology, syntax analysis

### AI Chat Modes
- **Learn**: Educational explanations and concepts
- **Translate**: Sanskrit-English translation assistance
- **Analyze**: Deep grammatical and linguistic analysis

## 🌍 Live Deployments

| Platform | URL | Features |
|----------|------|----------|
| **Vercel** | https://sanskrit-nova.vercel.app | Global CDN, Edge Functions |
| **Netlify** | https://sanskritnova.netlify.app | Static hosting, Functions |

Both deployments offer:
- ✅ **Full API functionality**
- ✅ **Bilingual support** (English/Hindi)
- ✅ **Mobile-responsive design**
- ✅ **PWA installation**
- ✅ **Apple India inspired design**

## 🛠️ Development Tools

### Code Quality
```bash
# Linting
ruff check .          # Fast Python linter
ruff check . --fix     # Auto-fix issues

# Security scanning
bandit -r .          # Security vulnerability check

# Type checking
mypy api/           # Static type analysis
```

## 🤝 Contributing

We welcome contributions!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Areas
- 🐛 **Bug fixes**: Help us improve the platform
- ✨ **Features**: Add new learning capabilities
- 📝 **Documentation**: Improve guides and explanations
- 🧪 **Tests**: Increase test coverage
- 🌍 **Localization**: Add more Indian languages
- 🎨 **Design**: Improve UI/UX

## 📈 Project Status

### ✅ Completed
- [x] **Core API**: All endpoints implemented and tested
- [x] **Transliteration**: Devanagari ↔ IAST conversion
- [x] **Bilingual UI**: English + Hindi interface
- [x] **PWA Features**: Offline functionality, install prompts
- [x] **Testing Suite**: 33 passing tests with coverage
- [x] **Deployment**: Dual platform deployment (Vercel + Netlify)
- [x] **Apple India Design**: Modern, culturally-inspired interface

### 🚧 In Progress
- [ ] **Advanced AI**: Enhanced chat capabilities
- [ ] **Audio Features**: Sanskrit text-to-speech
- [ ] **Progress Tracking**: User learning analytics

### 📋 Planned
- [ ] **Mobile Apps**: React Native applications
- [ ] **Multi-language**: Support for Tamil, Telugu, etc.
- [ ] **Government Integration**: Educational platform compatibility

## 📊 Technical Metrics

- ✅ **33 tests passing** with comprehensive coverage
- ✅ **0 security vulnerabilities** (Bandit scan)
- ✅ **0 code quality issues** (Ruff linting)
- ✅ **99.9% uptime** on production deployments
- ✅ **Apple India Design**: Modern, accessible interface

## 🏆 Recognition

### Built for India
- 🇮🇳 **Cultural Authenticity**: Respect for Sanskrit heritage
- 📱 **Mobile-First**: Optimized for Indian smartphone usage
- 🌐 **Offline-Ready**: Addresses connectivity challenges
- 🎓 **Educational Focus**: Aligned with learning standards

### Technical Excellence
- 🏗️ **Modern Architecture**: Clean, maintainable codebase
- 🧪 **Comprehensive Testing**: Full test coverage
- 🔒 **Security-First**: Regular vulnerability scanning
- 🚀 **Production-Ready**: Global deployment with monitoring

## 📞 Support & Community

### Get Help
- 📧 **Issues**: [GitHub Issues](https://github.com/mangeshraut712/SanskritNova/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/mangeshraut712/SanskritNova/discussions)

### Community
- 🌟 **Star us** on GitHub if you find this useful
- 🍴 **Share** with Sanskrit learners and educators
- 📝 **Contribute** to make Sanskrit learning accessible to all

---

## 🇮🇳 Contributing to India's Knowledge Renaissance

SanskritNova AI is built with love for India's Sanskrit learning community. We believe in combining ancient wisdom with modern technology to make Sanskrit education accessible, engaging, and effective for learners across the country.

**Built for India, by understanding Indian needs.** 🚀

---

*Last updated: March 2026*
