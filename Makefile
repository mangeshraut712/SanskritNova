.PHONY: help install dev test lint format typecheck security serve index clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install production dependencies
	pip install -e .

dev: ## Install all dependencies (dev + nlp)
	pip install -e ".[all]"

test: ## Run all tests with coverage
	pytest tests/ -v --cov=src/sanskrit_rag --cov-report=term-missing

test-unit: ## Run unit tests only
	pytest tests/unit/ -v

lint: ## Run linter
	ruff check src/ tests/

format: ## Format code
	ruff format src/ tests/

typecheck: ## Run type checker
	mypy src/ --ignore-missing-imports

security: ## Run security checks
	pip-audit
	bandit -r src/ -q

serve: ## Start the API server
	python -m sanskrit_rag.cli serve

index: ## Build the vector index
	python -m sanskrit_rag.cli build-index

clean: ## Clean build artifacts
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .mypy_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .ruff_cache -exec rm -rf {} + 2>/dev/null || true
	rm -rf dist/ build/ *.egg-info/ htmlcov/ coverage.xml
