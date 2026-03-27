# Makefile for SanskritNova AI

.PHONY: help test lint format clean serve-api serve-site dev install-deps check-deps

# Default target
help:
	@echo "SanskritNova AI - Development Commands"
	@echo ""
	@echo "🚀 Available targets:"
	@echo "  test           - Run all tests"
	@echo "  test-watch     - Run tests in watch mode"
	@echo "  lint           - Run code quality checks"
	@echo "  format         - Format code with ruff"
	@echo "  security       - Run security scan"
	@echo "  coverage       - Run tests with coverage"
	@echo "  serve-api      - Start API server"
	@echo "  serve-site     - Start web frontend"
	@echo "  dev            - Start both API and web"
	@echo "  clean          - Clean cache and artifacts"
	@echo "  install-deps   - Install development dependencies"
	@echo "  check-deps     - Check dependency versions"
	@echo ""
	@echo "🌐 Live URLs:"
	@echo "  Vercel:  https://sanskrit-nova.vercel.app"
	@echo "  Netlify: https://sanskritnova.netlify.app"

# Installation
install-deps:
	@echo "📦 Installing Python development dependencies..."
	pip install -e ".[dev]"
	@echo "✅ Python dependencies installed"

install-node-deps:
	@echo "📦 Installing Node.js dependencies..."
	npm install
	@echo "✅ Node.js dependencies installed"

# Dependency checks
check-deps:
	@echo "🔍 Checking dependency versions..."
	@echo "Python: $(shell python --version)"
	@echo "Node: $(shell node --version)"
	@echo "Git: $(shell git --version)"
	pip list | grep -E "(fastapi|uvicorn|pytest|ruff|bandit)"

# Code quality
lint:
	@echo "🔍 Running code quality checks..."
	ruff check .
	@echo "✅ Linting complete"

format:
	@echo "📝 Formatting code..."
	ruff check . --fix
	@echo "✅ Code formatted"

security:
	@echo "🔒 Running security scan..."
	bandit -r .
	@echo "✅ Security scan complete"

# Testing
test:
	@echo "🧪 Running test suite..."
	python -m pytest tests/ -v
	@echo "✅ Tests complete"

test-watch:
	@echo "🧪 Running tests in watch mode..."
	python -m pytest tests/ -v --watch

coverage:
	@echo "📊 Running tests with coverage..."
	python -m pytest tests/ --cov=code --cov=api --cov-report=html
	@echo "📈 Coverage report generated in htmlcov/"

build: ## Byte-compile source for a quick build sanity check
	python -m compileall api code sanskrit_rag
