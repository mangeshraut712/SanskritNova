# SanskritNova AI

<div align="center">

![SanskritNova AI](https://img.shields.io/badge/SanskritNova-AI-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Powered-0366d6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white)
![License](https://img.shields.io/github/license/mangeshraut712/SanskritNova?style=for-the-badge)

**Premium AI-powered Sanskrit learning platform**

[Live Demo](https://sanskrit-nova.vercel.app) • [Documentation](#documentation) • [API](#api)

</div>

## Overview

SanskritNova AI is a premium Sanskrit learning platform that combines cutting-edge AI technology with traditional Indian knowledge systems. Experience the elegance of Sanskrit through intelligent tutoring, real-time transliteration, and cultural context.

## Features

### 🤖 AI Sanskrit Tutor
- **Intelligent Conversations**: GPT-4 powered Sanskrit learning
- **Cultural Context**: Learn through Indian festivals, mythology, and traditions
- **Personalized Learning**: AI adapts to your learning style and pace

### ✍️ Handwriting Recognition
- **Devanagari Writing**: Draw Sanskrit characters with instant AI recognition
- **Real-time Feedback**: Get immediate guidance on stroke accuracy
- **Progress Tracking**: Monitor your handwriting improvement over time

### 🎤 Voice Learning
- **Pronunciation Analysis**: AI-powered feedback on Sanskrit pronunciation
- **Indian Accent Support**: Optimized for Indian English speakers
- **Audio Examples**: Hear perfect Sanskrit pronunciation

### 📚 Comprehensive Tools
- **Transliteration**: Convert between Devanagari and IAST scripts
- **Dictionary**: Extensive Sanskrit-English dictionary
- **Grammar Learning**: Interactive grammar lessons and exercises

### 🎮 Gamification
- **Cultural Badges**: Earn badges for mastering Sanskrit concepts
- **Leaderboards**: Compete with learners across India
- **Progress Tracking**: Visual progress charts and achievements

## Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/SanskritNova.git
cd SanskritNova

# Install dependencies
npm install
pip install -r requirements.txt

# Start development servers
npm run dev          # Frontend
python api/index.py  # Backend
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Add your API keys
# OPENAI_API_KEY=your_openai_key
# FIREBASE_CONFIG=your_firebase_config
```

### Usage

1. **Open the application**: Navigate to `http://localhost:3000`
2. **Choose your learning mode**: AI Tutor, Handwriting, or Voice
3. **Start learning**: Begin your Sanskrit journey with AI guidance

## Documentation

### API Reference

#### Chat API
```http
POST /api/chat
Content-Type: application/json

{
  "message": "नमस्ते",
  "mode": "learn",
  "lang": "en"
}
```

#### Transliteration API
```http
POST /api/transliterate
Content-Type: application/json

{
  "text": "रामो गच्छति"
}
```

#### Learning Tracks API
```http
GET /api/tracks?lang=en
```

### Frontend Architecture

```
public/
├── scripts/
│   ├── utils.js              # Shared utilities
│   ├── luxury-app.js         # Main application
│   └── viral-ai-features.js  # AI features
├── styles/
│   ├── shared-variables.css  # Common styles
│   ├── luxury-styles.css     # Main styles
│   └── viral-features.css    # Feature styles
└── index.html                # Main application
```

### Backend Architecture

```
api/
├── index.py          # Main FastAPI application
├── chat.py           # Chat functionality
├── transliterate.py   # Transliteration service
└── tracks.py         # Learning tracks data
```

## Technology Stack

### Frontend
- **React**: Modern, component-based architecture
- **TailwindCSS**: Utility-first CSS framework
- **PWA**: Progressive Web App capabilities
- **Service Worker**: Offline functionality

### Backend
- **FastAPI**: High-performance Python web framework
- **PostgreSQL**: Robust database solution
- **Redis**: Fast caching layer
- **OpenAI**: GPT-4 integration

### AI/ML
- **GPT-4**: Advanced language understanding
- **TensorFlow.js**: Handwriting recognition
- **Web Speech API**: Voice analysis
- **Vector Database**: Semantic search capabilities

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Install development dependencies
npm install --save-dev prettier

# Format code before committing
npm run format

# Run linting
npm run lint:prettier
```

### Code Standards

- Use Prettier for code formatting
- Follow ES6+ JavaScript standards
- Write meaningful commit messages
- Include tests for new features

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t sanskritnova .

# Run container
docker run -p 3000:3000 sanskritnova
```

### Manual Deployment

```bash
# Build frontend
npm run build

# Start backend
python api/index.py

# Serve frontend
serve -s public
```

## Performance

- **Loading Time**: < 3 seconds
- **Bundle Size**: ~139KB optimized
- **Lighthouse Score**: 95+
- **Mobile Responsive**: Fully optimized
- **Offline Support**: PWA enabled

## Security

- **CORS**: Properly configured
- **Input Validation**: Sanitized user inputs
- **API Security**: Rate limiting and authentication
- **Data Privacy**: No personal data collection

## Support

- **Documentation**: Available in this repository
- **Issues**: [GitHub Issues](https://github.com/mangeshraut712/SanskritNova/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mangeshraut712/SanskritNova/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenAI**: For GPT-4 API access
- **Google Fonts**: For beautiful typography
- **FastAPI**: For the excellent web framework
- **Vercel**: For hosting and deployment

---

<div align="center">

**Made with ❤️ in India**

[⭐ Star](https://github.com/mangeshraut712/SanskritNova) • [🍴 Fork](https://github.com/mangeshraut712/SanskritNova/fork) • [🐛 Report Issue](https://github.com/mangeshraut712/SanskritNova/issues)

</div>
