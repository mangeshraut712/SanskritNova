"""
Vector Store Abstraction for SanskritNova
==========================================
Supports ChromaDB (local) and Pinecone (cloud) backends
with a unified interface for the RAG pipeline.

Usage:
    # ChromaDB (local, zero-config)
    store = VectorStore.create("chromadb", collection="sanskrit_corpus")
    store.add_documents(chunks)
    results = store.search("योगः", k=5)

    # Pinecone (cloud)
    store = VectorStore.create("pinecone", index_name="sanskrit-nova", api_key="...")
    store.add_documents(chunks)
    results = store.search("योगः", k=5)
"""

from __future__ import annotations

import hashlib
import logging
import os
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

logger = logging.getLogger("sanskritnova.vector_store")


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class ChunkMetadata:
    """Metadata tracked per chunk."""
    source: str = ""
    chunk_id: int | str = 0
    text: str = ""
    page: int | None = None
    section: str = ""
    language: str = "sa"
    embedding_model: str = ""
    created_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        d = {
            "source": self.source,
            "chunk_id": self.chunk_id,
            "text": self.text,
            "section": self.section,
            "language": self.language,
            "embedding_model": self.embedding_model,
        }
        if self.page is not None:
            d["page"] = self.page
        if self.created_at:
            d["created_at"] = self.created_at
        return d

    @classmethod
    def from_dict(cls, data: dict) -> ChunkMetadata:
        return cls(
            source=data.get("source", ""),
            chunk_id=data.get("chunk_id", 0),
            text=data.get("text", ""),
            page=data.get("page"),
            section=data.get("section", ""),
            language=data.get("language", "sa"),
            embedding_model=data.get("embedding_model", ""),
            created_at=data.get("created_at", ""),
        )


@dataclass
class SearchResult:
    """A single search result with score and metadata."""
    text: str
    score: float
    metadata: ChunkMetadata = field(default_factory=ChunkMetadata)

    def to_dict(self) -> dict[str, Any]:
        return {
            "text": self.text,
            "score": self.score,
            **self.metadata.to_dict(),
        }


# ---------------------------------------------------------------------------
# Embedding pipeline
# ---------------------------------------------------------------------------

class EmbeddingProvider(ABC):
    """Abstract embedding provider."""

    @abstractmethod
    def embed(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for a batch of texts."""
        ...

    @abstractmethod
    def embed_query(self, query: str) -> list[float]:
        """Generate embedding for a single query."""
        ...


class SentenceTransformerEmbedding(EmbeddingProvider):
    """Embedding provider using sentence-transformers (local)."""

    def __init__(self, model_name: str = "distiluse-base-multilingual-cased-v1"):
        try:
            from sentence_transformers import SentenceTransformer
        except ImportError:
            raise ImportError(
                "sentence-transformers required. Install: pip install sentence-transformers"
            )
        self.model = SentenceTransformer(model_name)
        self.model_name = model_name
        logger.info("Loaded SentenceTransformer: %s", model_name)

    def embed(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        return embeddings.tolist()

    def embed_query(self, query: str) -> list[float]:
        return self.model.encode([query], convert_to_numpy=True)[0].tolist()


class OpenAIEmbedding(EmbeddingProvider):
    """Embedding provider using OpenAI/OpenRouter API."""

    def __init__(
        self,
        model: str = "text-embedding-3-small",
        api_key: str | None = None,
        base_url: str = "https://openrouter.ai/api/v1",
    ):
        try:
            import httpx
        except ImportError:
            raise ImportError("httpx required for OpenAI embeddings")
        self.model = model
        self.api_key = api_key or os.getenv("OPENROUTER_API_KEY", "")
        self.base_url = base_url
        self._httpx = httpx
        logger.info("OpenAI embedding provider: %s", model)

    def _embed_batch(self, texts: list[str]) -> list[list[float]]:
        resp = self._httpx.post(
            f"{self.base_url}/embeddings",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            json={"model": self.model, "input": texts},
            timeout=60.0,
        )
        resp.raise_for_status()
        data = resp.json()
        return [item["embedding"] for item in sorted(data["data"], key=lambda x: x["index"])]

    def embed(self, texts: list[str], batch_size: int = 100) -> list[list[float]]:
        all_embeddings = []
        for i in range(0, len(texts), batch_size):
            batch = texts[i : i + batch_size]
            all_embeddings.extend(self._embed_batch(batch))
        return all_embeddings

    def embed_query(self, query: str) -> list[float]:
        return self._embed_batch([query])[0]


def create_embedding_provider(
    backend: str = "auto",
    **kwargs,
) -> EmbeddingProvider:
    """Factory for embedding providers."""
    if backend == "auto":
        try:
            return SentenceTransformerEmbedding(**kwargs)
        except ImportError:
            return OpenAIEmbedding(**kwargs)
    elif backend == "sentence-transformers":
        return SentenceTransformerEmbedding(**kwargs)
    elif backend == "openai":
        return OpenAIEmbedding(**kwargs)
    else:
        raise ValueError(f"Unknown embedding backend: {backend}")


# ---------------------------------------------------------------------------
# Abstract vector store
# ---------------------------------------------------------------------------

class VectorStore(ABC):
    """Abstract vector store interface."""

    @abstractmethod
    def add_documents(
        self,
        texts: list[str],
        metadatas: list[dict[str, Any]] | None = None,
        ids: list[str] | None = None,
    ) -> list[str]:
        """Add documents with optional metadata. Returns document IDs."""
        ...

    @abstractmethod
    def search(self, query: str, k: int = 5, filter_dict: dict | None = None) -> list[SearchResult]:
        """Search for similar documents."""
        ...

    @abstractmethod
    def delete(self, ids: list[str]) -> None:
        """Delete documents by ID."""
        ...

    @abstractmethod
    def count(self) -> int:
        """Return number of documents in the store."""
        ...

    @staticmethod
    def _generate_id(text: str, source: str = "") -> str:
        """Generate a deterministic ID from text + source."""
        raw = f"{source}:{text}"
        return hashlib.sha256(raw.encode()).hexdigest()[:16]

    @classmethod
    def create(cls, backend: str = "chromadb", **kwargs) -> VectorStore:
        """Factory method for creating vector stores."""
        if backend == "chromadb":
            return ChromaDBStore(**kwargs)
        elif backend == "pinecone":
            return PineconeStore(**kwargs)
        else:
            raise ValueError(f"Unknown vector store backend: {backend}")


# ---------------------------------------------------------------------------
# ChromaDB store (local)
# ---------------------------------------------------------------------------

class ChromaDBStore(VectorStore):
    """Local vector store backed by ChromaDB."""

    def __init__(
        self,
        collection: str = "sanskrit_corpus",
        persist_directory: str | Path | None = None,
        embedding_provider: EmbeddingProvider | None = None,
    ):
        try:
            import chromadb
        except ImportError:
            raise ImportError("chromadb required. Install: pip install chromadb")

        self.embedding_provider = embedding_provider or create_embedding_provider("auto")

        if persist_directory:
            self._client = chromadb.PersistentClient(path=str(persist_directory))
        else:
            self._client = chromadb.PersistentClient(path=str(Path(".chroma")))

        self._collection = self._client.get_or_create_collection(
            name=collection,
            metadata={"hnsw:space": "cosine"},
        )
        self._collection_name = collection
        logger.info("ChromaDB store initialized: collection=%s, count=%d", collection, self.count())

    def add_documents(
        self,
        texts: list[str],
        metadatas: list[dict[str, Any]] | None = None,
        ids: list[str] | None = None,
    ) -> list[str]:
        if not texts:
            return []

        if ids is None:
            ids = [
                self._generate_id(
                    t, 
                    (metadatas or [{}])[i].get("source", "")
                ) 
                for i, t in enumerate(texts)
            ]

        embeddings = self.embedding_provider.embed(texts)

        # ChromaDB needs string values for metadata
        clean_metadatas = []
        for m in (metadatas or [{}] * len(texts)):
            clean = {}
            for k, v in m.items():
                if isinstance(v, (str, int, float, bool)):
                    clean[k] = v
                else:
                    clean[k] = str(v)
            clean_metadatas.append(clean)

        self._collection.add(
            ids=ids,
            documents=texts,
            embeddings=embeddings,
            metadatas=clean_metadatas or None,
        )
        logger.info("Added %d documents to ChromaDB", len(texts))
        return ids

    def search(self, query: str, k: int = 5, filter_dict: dict | None = None) -> list[SearchResult]:
        embedding = self.embedding_provider.embed_query(query)
        results = self._collection.query(
            query_embeddings=[embedding],
            n_results=k,
            where=filter_dict,
        )

        search_results = []
        for i in range(len(results.get("documents", [[]])[0])):
            text = results["documents"][0][i]
            distance = results["distances"][0][i] if results.get("distances") else 0.0
            score = 1.0 - distance  # Convert cosine distance to similarity
            meta_raw = results.get("metadatas", [[{}]])[0][i] or {}
            meta = ChunkMetadata.from_dict({**meta_raw, "text": text})
            search_results.append(SearchResult(text=text, score=score, metadata=meta))

        return search_results

    def delete(self, ids: list[str]) -> None:
        self._collection.delete(ids=ids)

    def count(self) -> int:
        return self._collection.count()


# ---------------------------------------------------------------------------
# Pinecone store (cloud)
# ---------------------------------------------------------------------------

class PineconeStore(VectorStore):
    """Cloud vector store backed by Pinecone."""

    def __init__(
        self,
        index_name: str = "sanskrit-nova",
        api_key: str | None = None,
        namespace: str = "default",
        embedding_provider: EmbeddingProvider | None = None,
    ):
        try:
            from pinecone import Pinecone
        except ImportError:
            raise ImportError("pinecone required. Install: pip install pinecone")

        self.api_key = api_key or os.getenv("PINECONE_API_KEY", "")
        if not self.api_key:
            raise ValueError("PINECONE_API_KEY is required for Pinecone store")

        self.embedding_provider = embedding_provider or create_embedding_provider("auto")
        self.namespace = namespace

        pc = Pinecone(api_key=self.api_key)
        existing = [idx.name for idx in pc.list_indexes()]

        if index_name not in existing:
            # Get embedding dimension from a test embed
            test_dim = len(self.embedding_provider.embed_query("test"))
            logger.info("Creating Pinecone index '%s' with dimension %d", index_name, test_dim)
            pc.create_index(
                name=index_name,
                dimension=test_dim,
                metric="cosine",
                spec={"serverless": {"cloud": "aws", "region": "us-east-1"}},
            )

        self._index = pc.Index(index_name)
        self._index_name = index_name
        logger.info("Pinecone store initialized: index=%s, namespace=%s", index_name, namespace)

    def add_documents(
        self,
        texts: list[str],
        metadatas: list[dict[str, Any]] | None = None,
        ids: list[str] | None = None,
    ) -> list[str]:
        if not texts:
            return []

        if ids is None:
            ids = [
                self._generate_id(
                    t, 
                    (metadatas or [{}])[i].get("source", "")
                ) 
                for i, t in enumerate(texts)
            ]

        embeddings = self.embedding_provider.embed(texts)

        vectors = []
        for i, (id_, emb, text) in enumerate(zip(ids, embeddings, texts)):
            meta = (metadatas or [{}] * len(texts))[i].copy()
            meta["text"] = text
            vectors.append({"id": id_, "values": emb, "metadata": meta})

        # Upsert in batches
        batch_size = 100
        for i in range(0, len(vectors), batch_size):
            self._index.upsert(vectors=vectors[i : i + batch_size], namespace=self.namespace)

        logger.info("Upserted %d documents to Pinecone", len(vectors))
        return ids

    def search(self, query: str, k: int = 5, filter_dict: dict | None = None) -> list[SearchResult]:
        embedding = self.embedding_provider.embed_query(query)
        results = self._index.query(
            vector=embedding,
            top_k=k,
            include_metadata=True,
            namespace=self.namespace,
            filter=filter_dict,
        )

        search_results = []
        for match in results.matches:
            meta_raw = match.metadata or {}
            text = meta_raw.pop("text", "")
            meta = ChunkMetadata.from_dict({**meta_raw, "text": text})
            search_results.append(SearchResult(text=text, score=match.score, metadata=meta))

        return search_results

    def delete(self, ids: list[str]) -> None:
        self._index.delete(ids=ids, namespace=self.namespace)

    def count(self) -> int:
        stats = self._index.describe_index_stats()
        return stats.get("namespaces", {}).get(self.namespace, {}).get("vector_count", 0)


# ---------------------------------------------------------------------------
# Convenience: load chunks into store
# ---------------------------------------------------------------------------

def load_chunks_into_store(
    store: VectorStore,
    chunks: list[dict[str, Any]],
    batch_size: int = 200,
) -> int:
    """
    Load chunk dicts (with 'text', 'source', 'chunk_id' keys) into a vector store.
    Returns the number of documents loaded.
    """
    total = 0
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        texts = [c["text"] for c in batch]
        metadatas = [
            {
                "source": c.get("source", "unknown"),
                "chunk_id": c.get("chunk_id", i + j),
                "language": "sa",
            }
            for j, c in enumerate(batch)
        ]
        store.add_documents(texts=texts, metadatas=metadatas)
        total += len(batch)
    logger.info("Loaded %d chunks into vector store", total)
    return total
