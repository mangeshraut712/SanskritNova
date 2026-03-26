# Contributing to Sanskrit RAG System

Thank you for your interest in contributing to the Sanskrit RAG System! This project aims to make Sanskrit education accessible through AI-powered tools.

## 🙏 Code of Conduct

Be respectful and inclusive. We welcome contributors of all backgrounds, particularly those passionate about Sanskrit, NLP, and education technology.

## 🚀 Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Sanskrit_RagSystem.git
cd Sanskrit_RagSystem
```

### 2. Set Up Development Environment

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e ".[all]"
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

## 📐 Code Standards

- **Python 3.11+** with full type annotations
- **Ruff** for linting and formatting (`ruff check`, `ruff format`)
- **MyPy** for type checking (`mypy src/`)
- **Pytest** for testing (target ≥70% coverage)
- **Structured logging** via `structlog` (no `print()` statements in library code)

### Before Submitting

```bash
make lint        # Check linting
make format      # Auto-format code
make typecheck   # Type checking
make test        # Run all tests
```

## 🏗️ Project Structure

```
src/sanskrit_rag/
├── api/          # FastAPI endpoints
├── generation/   # LLM inference & prompts
├── indexing/     # Embeddings & vector store
├── ingest/       # Document loaders
├── processing/   # Text cleaning & chunking
├── retrieval/    # Search interface
├── utils/        # Logging, errors, helpers
├── config.py     # Centralized settings
├── pipeline.py   # RAG orchestrator
└── cli.py        # CLI entry point
```

## 📝 Pull Request Process

1. Update tests for any new functionality
2. Ensure all checks pass (`make lint test typecheck`)
3. Update documentation if needed
4. Write a clear PR description explaining *why* the change was made
5. Link any related issues

## 🐛 Reporting Issues

Please include:
- Python version and OS
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs or error messages

## 💡 Areas Where Help Is Needed

- **Sanskrit NLP**: Sandhi splitting, morphological analysis, compound decomposition
- **Corpus expansion**: Digitized Sanskrit texts (public domain)
- **Translations**: UI and documentation in multiple languages
- **Testing**: More comprehensive test coverage
- **Documentation**: Tutorials, API guides, Sanskrit learning resources

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
