from __future__ import annotations

import json

import faiss
import joblib
import numpy as np

try:
    from .config import settings
    from .search_normalization import lexical_score
except ImportError:  # pragma: no cover
    from config import settings
    from search_normalization import lexical_score


class Retriever:
    DENSE_WEIGHT = 1.0
    LEXICAL_WEIGHT = 0.35
    MIN_LEXICAL_SCORE = 0.2

    def __init__(self):
        self.backend = settings.embedding_backend.strip().lower()
        self.model = self._load_model()
        if not settings.index_path.exists():
            raise FileNotFoundError(
                f"Missing FAISS index at {settings.index_path}. Run build_index first."
            )

        self.index = faiss.read_index(str(settings.index_path))
        self.chunks = self._load_chunks()
        self._chunk_texts = [chunk.get("text", "") for chunk in self.chunks]

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

    def _dense_search(self, query: str, k: int) -> dict[int, float]:
        if self.backend == "sentence-transformers":
            query_emb = self.model.encode([query], convert_to_numpy=True).astype("float32")
        else:
            query_emb = self.model.transform([query]).toarray().astype("float32")

        faiss.normalize_L2(query_emb)
        scores, indices = self.index.search(query_emb, k)

        ranked: dict[int, float] = {}
        for score, index in zip(scores[0], indices[0], strict=False):
            if index < 0 or index >= len(self.chunks):
                continue
            ranked[index] = max(float(score), 0.0)
        return ranked

    def _lexical_search(self, query: str) -> dict[int, float]:
        ranked: dict[int, float] = {}
        for index, text in enumerate(self._chunk_texts):
            # This rescues cross-script queries like "ramo gacchati" -> "रामो गच्छति".
            score = lexical_score(query, text)
            if score >= self.MIN_LEXICAL_SCORE:
                ranked[index] = score
        return ranked

    def retrieve(self, query, k=3):
        if not query.strip():
            return []

        k = max(1, min(k, len(self.chunks)))

        dense_scores = self._dense_search(query, k)
        lexical_scores = self._lexical_search(query)

        candidate_indices = set(dense_scores)
        if lexical_scores:
            # Keep the dense path primary, then widen the pool with script-aware lexical matches.
            lexical_top = sorted(
                lexical_scores,
                key=lexical_scores.get,
                reverse=True,
            )[: max(k * 3, 8)]
            candidate_indices.update(lexical_top)

        if not candidate_indices:
            return []

        ranked_indices = sorted(
            candidate_indices,
            key=lambda index: (
                self.DENSE_WEIGHT * dense_scores.get(index, 0.0)
                + self.LEXICAL_WEIGHT * lexical_scores.get(index, 0.0)
            ),
            reverse=True,
        )[:k]

        results = []
        for rank, index in enumerate(ranked_indices, start=1):
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
