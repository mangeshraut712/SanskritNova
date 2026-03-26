from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    repo_root: Path
    data_dir: Path
    index_path: Path
    chunks_path: Path
    legacy_chunks_path: Path
    embedding_model: str
    model_path: Path
    chunk_size: int
    chunk_overlap: int
    default_k: int
    llm_ctx: int
    llm_threads: int
    llm_batch: int
    llm_max_tokens: int
    llm_temperature: float


def _int_env(name: str, default: int) -> int:
    value = os.getenv(name)
    return int(value) if value else default


def _float_env(name: str, default: float) -> float:
    value = os.getenv(name)
    return float(value) if value else default


def load_settings() -> Settings:
    repo_root = Path(__file__).resolve().parent.parent
    data_dir = repo_root / os.getenv("SANSKRIT_RAG_DATA_DIR", "data")
    return Settings(
        repo_root=repo_root,
        data_dir=data_dir,
        index_path=repo_root / os.getenv("SANSKRIT_RAG_INDEX_PATH", "code/faiss_index.bin"),
        chunks_path=repo_root / os.getenv("SANSKRIT_RAG_CHUNKS_PATH", "code/chunks.json"),
        legacy_chunks_path=repo_root / os.getenv("SANSKRIT_RAG_LEGACY_CHUNKS_PATH", "code/chunks.npy"),
        embedding_model=os.getenv(
            "SANSKRIT_RAG_EMBEDDING_MODEL",
            "distiluse-base-multilingual-cased-v1",
        ),
        model_path=repo_root / os.getenv("SANSKRIT_RAG_MODEL_PATH", "models/phi3.gguf"),
        chunk_size=_int_env("SANSKRIT_RAG_CHUNK_SIZE", 300),
        chunk_overlap=_int_env("SANSKRIT_RAG_CHUNK_OVERLAP", 50),
        default_k=_int_env("SANSKRIT_RAG_TOP_K", 3),
        llm_ctx=_int_env("SANSKRIT_RAG_LLM_CTX", 2048),
        llm_threads=_int_env("SANSKRIT_RAG_LLM_THREADS", 8),
        llm_batch=_int_env("SANSKRIT_RAG_LLM_BATCH", 256),
        llm_max_tokens=_int_env("SANSKRIT_RAG_MAX_TOKENS", 300),
        llm_temperature=_float_env("SANSKRIT_RAG_TEMPERATURE", 0.2),
    )


settings = load_settings()
