from __future__ import annotations

import json

import faiss
import joblib
import numpy as np

try:
    from .config import settings
except ImportError:  # pragma: no cover
    from config import settings


class Retriever:
    def __init__(self):
        self.backend = settings.embedding_backend.strip().lower()
        self.model = self._load_model()
        if not settings.index_path.exists():
            raise FileNotFoundError(
                f"Missing FAISS index at {settings.index_path}. Run build_index first."
            )

        self.index = faiss.read_index(str(settings.index_path))
        self.chunks = self._load_chunks()

    def _load_model(self):
        if self.backend == "sentence-transformers":
            from sentence_transformers import SentenceTransformer

            return SentenceTransformer(settings.embedding_model)
        if self.backend == "tfidf":
            if not settings.tfidf_vectorizer_path.exists():
                raise FileNotFoundError(
                    f"Missing TF-IDF vectorizer at {settings.tfidf_vectorizer_path}. "
                    "Run build_index first."
                )
            return joblib.load(settings.tfidf_vectorizer_path)
        raise ValueError(
            f"Unsupported embedding backend: {settings.embedding_backend}. "
            "Use 'tfidf' or 'sentence-transformers'."
        )

    def _load_chunks(self):
        if settings.chunks_path.exists():
            try:
                with settings.chunks_path.open("r", encoding="utf-8") as f:
                    chunks = json.load(f)
                if isinstance(chunks, list) and all(
                    isinstance(chunk, dict) and "text" in chunk for chunk in chunks
                ):
                    return chunks
            except (OSError, json.JSONDecodeError, TypeError, ValueError):
                pass

        if settings.legacy_chunks_path.exists():
            return [
                {"chunk_id": index, "source": "unknown", "text": text}
                for index, text in enumerate(
                    np.load(settings.legacy_chunks_path, allow_pickle=False).tolist()
                )
            ]

        raise FileNotFoundError(
            f"Missing chunk metadata at {settings.chunks_path} or {settings.legacy_chunks_path}."
        )

    def retrieve(self, query, k=3):
        if not query.strip():
            return []

        k = max(1, min(k, len(self.chunks)))
        if self.backend == "sentence-transformers":
            query_emb = self.model.encode([query], convert_to_numpy=True).astype("float32")
        else:
            query_emb = self.model.transform([query]).toarray().astype("float32")
        faiss.normalize_L2(query_emb)
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
