# 🌟 SanskritNova AI

<p align="center">
  <img src="https://img.shields.io/badge/Sanskrit-Learning_AI-FF6B35?style=for-the-badge&logo=brain" alt="Sanskrit Learning AI">
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=python" alt="FastAPI">
  <img src="https://img.shields.io/badge/Frontend-HTML5/CSS3-1572B6?style=for-the-badge&logo=html5" alt="HTML5/CSS3">
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>Next-Generation AI Portal for Sanskrit Learning & Research</strong><br>
  Unlock ancient wisdom through modern technology
</p>

---

## 📚 About SanskritNova

SanskritNova AI is a comprehensive Sanskrit learning web application powered by AI. It combines traditional learning methods with cutting-edge machine learning to provide an immersive Sanskrit education experience.

### ✨ Key Features

- 🤖 **AI Chat Interface** - Interactive learning through AI-powered conversations
- 🔄 **Neural Translation** - Multi-layered translation engine
- 📝 **Devanagari to IAST** - High-fidelity script transliteration
- 📖 **Grounded Answers** - Context-aware responses from Sanskrit corpus
- 📚 **Learning Pathways** - Structured curriculum for all levels

---

## 🏗️ Project Architecture

```
SanskritNova/
├── api/                 # FastAPI backend server
│   └── index.py         # Main API endpoints
├── public/              # Static frontend
│   ├── index.html       # Main HTML page
│   ├── app.js          # Client-side JavaScript
│   └── styles.css       # Styling
├── code/               # Original RAG modules
├── docs/               # Documentation
├── tests/              # Test suite
└── docker/             # Container assets
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- pip package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running Locally

```bash
# Start API server
make serve-api

# Or using uvicorn directly
uvicorn api.index:app --host 0.0.0.0 --port 8000

# Serve static frontend (in another terminal)
make serve-site
```

---

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features | ✅ Yes |
| `OPENROUTER_MODEL` | Model to use (default: openai/gpt-4o-mini) | No |
| `GOOGLE_API_KEY` | Google Cloud API for translation/vision | ✅ Yes |
| `OPENROUTER_APP_URL` | Your app URL for API referer | No |

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/info` | GET | API information |
| `/api/tracks` | GET | Learning pathways |
| `/api/chat` | POST | AI chat interface |
| `/api/grounded-answer` | POST | RAG-powered answers |
| `/api/transliterate` | POST | Script conversion |

---

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI/ML**: OpenRouter API, sentence-transformers
- **Database**: FAISS, NumPy
- **Deployment**: Vercel

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Sanskrit scholars and educators
- OpenRouter for AI capabilities
- Vercel for hosting

---

<p align="center">
  Made with ❤️ for Sanskrit Learning
</p>
