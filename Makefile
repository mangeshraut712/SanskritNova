.PHONY: help install install-local serve-api serve-site rag-index rag-cli test lint format build

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

install: ## Install the web app and developer dependencies
	pip install -e ".[dev]"

install-local: ## Install original local RAG dependencies
	pip install -e ".[local]"

serve-api: ## Run the FastAPI backend locally (port 8000)
	uvicorn api.index:app --reload --host 0.0.0.0 --port 8000

serve-site: ## Serve the static frontend locally
	python -m http.server 3000 --directory public

rag-index: ## Build the original local index
	python -m sanskrit_rag.build_index

rag-cli: ## Run the original local CLI
	python -m sanskrit_rag.app

test: ## Run tests
	pytest tests

lint: ## Run ruff on API, RAG modules, and tests
	ruff check api code sanskrit_rag tests

format: ## Format code with ruff
	ruff format api code sanskrit_rag tests

build: ## Byte-compile source for a quick build sanity check
	python -m compileall api code sanskrit_rag
