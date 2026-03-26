from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

try:
    from .config import settings
except ImportError:  # pragma: no cover - supports direct script execution
    from config import settings


class Retriever:
    def __init__(self):
        self.model = SentenceTransformer(settings.embedding_model)
        if not settings.index_path.exists():
            raise FileNotFoundError(
                f"Missing FAISS index at {settings.index_path}. Run build_index first."
            )

        self.index = faiss.read_index(str(settings.index_path))
        self.chunks = self._load_chunks()

    def _load_chunks(self):
        if settings.chunks_path.exists():
            with settings.chunks_path.open("r", encoding="utf-8") as f:
                return json.load(f)

        if settings.legacy_chunks_path.exists():
            return [
                {"chunk_id": index, "source": "unknown", "text": text}
                for index, text in enumerate(
                    np.load(settings.legacy_chunks_path, allow_pickle=True).tolist()
                )
            ]

        raise FileNotFoundError(
            f"Missing chunk metadata at {settings.chunks_path} or {settings.legacy_chunks_path}."
        )

    def retrieve(self, query, k=3):
        if not query.strip():
            return []

        query_emb = self.model.encode([query], convert_to_numpy=True)
        _, indices = self.index.search(query_emb, k)
        results = []
        for rank, index in enumerate(indices[0], start=1):
            if index < 0 or index >= len(self.chunks):
                continue

            chunk = self.chunks[index]
            results.append(
                {
                    "rank": rank,
                    "source": chunk.get("source", "unknown"),
                    "chunk_id": chunk.get("chunk_id", index),
                    "text": chunk["text"],
                }
            )

        return results

if __name__ == "__main__":
    r = Retriever()
    print(r.retrieve("योगः"))
