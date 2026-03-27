# Project Setup Guide 🛠️

This guide helps you set up SanskritNova AI for development, testing, and deployment.

## 📋 Prerequisites

### Required Software
- **Python 3.11+** - Main runtime for API and ML components
- **Node.js 18+** - For deployment and frontend tooling
- **Git** - Version control
- **Modern browser** - For testing the web interface

### Optional Dependencies
- **Docker** - For containerized development
- **kubectl** - For Kubernetes deployment

## 🚀 Quick Setup

### 1. Clone Repository
```bash
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova
```

### 2. Python Environment Setup
```bash
# Create virtual environment
python -m venv .venv

# Activate environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"
```

### 3. Node.js Environment Setup (Alternative)
```bash
# Install Node.js dependencies
npm install

# This is mainly for deployment tools
```

## 🔧 Development Configuration

### Environment Variables
Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

#### Required for Full AI Chat
```bash
# OpenRouter API configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo
OPENROUTER_APP_NAME=SanskritNova
OPENROUTER_APP_URL=http://localhost:8000
```

#### Optional Vector Store
```bash
# ChromaDB (local development)
CHROMADB_PATH=./data/chroma

# Pinecone (cloud production)
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=sanskrit-nova
```

### Development Settings
```bash
# API configuration
API_HOST=0.0.0.0
API_PORT=8000
LOG_LEVEL=INFO

# RAG configuration
SANSKRIT_RAG_DATA_DIR=./data
SANSKRIT_RAG_INDEX_PATH=./data/index.faiss
```

## 🧪 Testing Setup

### Run All Tests
```bash
# Full test suite
pytest tests/ -v

# With coverage report
pytest tests/ --cov=code --cov=api --cov-report=html

# Specific test categories
pytest tests/test_api.py          # API endpoints
pytest tests/test_agentic_rag.py  # RAG pipeline
pytest tests/test_config.py        # Configuration
```

### Test Categories
- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end functionality
- **API Tests**: All endpoint testing
- **Performance Tests**: Load and timing tests

## 🚀 Local Development

### Start API Server
```bash
# Using make command
make serve-api

# Or directly
python -m uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
```

### Start Web Frontend
```bash
# Using make command
make serve-site

# Or directly
python -m http.server 3000 -d public/
```

### Development Workflow
```bash
# 1. Start API server (terminal 1)
make serve-api

# 2. Start web server (terminal 2)
make serve-site

# 3. Run tests in third terminal
make test

# 4. Make changes and test
# Edit code -> tests pass -> commit
```

## 🐳 Docker Development

### Build and Run
```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Container Configuration
- **API Container**: Python 3.11 with FastAPI
- **Web Container**: Nginx serving static files
- **Database Container**: PostgreSQL (for production setup)

## 🌐 Deployment Setup

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Netlify Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy to production
npx netlify-cli deploy --prod

# Deploy preview
npx netlify-cli deploy
```

### Railway Deployment
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

## 🔍 Troubleshooting

### Common Issues

#### Python Environment Issues
```bash
# Module not found errors
pip install -e ".[dev]"

# Permission denied
chmod +x scripts/*.sh

# Virtual environment issues
rm -rf .venv && python -m venv .venv
```

#### API Server Issues
```bash
# Port already in use
lsof -ti:8000

# API not responding
curl http://localhost:8000/api/health

# Check logs
python -m uvicorn api.index:app --log-level debug
```

#### Testing Issues
```bash
# Import errors
pip install -e ".[dev]"

# Test failures
pytest tests/ -v --tb=short

# Coverage not generating
pip install pytest-cov
```

#### Deployment Issues
```bash
# Vercel build failures
vercel --log-level debug

# Netlify function errors
npx netlify-cli functions:list

# Environment variables not set
vercel env add OPENROUTER_API_KEY
```

## 📚 Development Resources

### Documentation
- **[README.md](README.md)** - Complete project overview
- **[API Documentation](docs/api.md)** - Detailed API reference
- **[Architecture Guide](docs/architecture.md)** - System design
- **[Deployment Guide](docs/deployment.md)** - Production deployment

### Tools and Commands
```bash
# Code quality
make lint          # Run ruff linting
make format        # Format code with ruff
make security       # Run security scan

# Testing
make test           # Run all tests
make test-watch     # Run tests in watch mode
make coverage       # Run tests with coverage

# Development
make serve-api      # Start API server
make serve-site     # Start web frontend
make dev            # Start both API and web
make clean          # Clean cache and build artifacts
```

### IDE Configuration
For VS Code users, install these extensions:
- Python
- Pylance
- GitLens
- Docker
- Thunder Client (for API testing)

## 🔗 Useful Links

- **Project Repository**: https://github.com/mangeshraut712/SanskritNova
- **API Documentation**: https://sanskrit-nova.vercel.app/docs
- **Live Deployments**: 
  - Vercel: https://sanskrit-nova.vercel.app
  - Netlify: https://sanskritnova.netlify.app
- **Issue Tracker**: https://github.com/mangeshraut712/SanskritNova/issues
- **Discussions**: https://github.com/mangeshraut712/SanskritNova/discussions

---

**Need help?** Check our [troubleshooting guide](docs/troubleshooting.md) or [open an issue](https://github.com/mangeshraut712/SanskritNova/issues/new).

*Happy coding! 🚀*
