from __future__ import annotations

import json

import faiss
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

try:
    from .config import settings
    from .ingest import load_document_records
    from .preprocess import chunk_text, clean_text
except ImportError:  # pragma: no cover
    from config import settings
    from ingest import load_document_records
    from preprocess import chunk_text, clean_text


def _sentence_transformer_embeddings(texts: list[str]) -> np.ndarray:
    import multiprocessing
    import os

    # Fix for segmentation fault on macOS with Python 3.13+
    # Set environment variables BEFORE importing sentence_transformers
    os.environ["TOKENIZERS_PARALLELISM"] = "false"
    os.environ["OMP_NUM_THREADS"] = "1"
    
    # Try to set multiprocessing start method if not already set
    try:
        multiprocessing.set_start_method('spawn', force=False)
    except RuntimeError:
        pass  # Already set
    
    from sentence_transformers import SentenceTransformer
    
    # Use single-threaded execution to avoid fork issues
    model = SentenceTransformer(
        settings.embedding_model,
        device="cpu",  # Force CPU to avoid CUDA fork issues
    )
    embeddings = model.encode(
        texts, 
        convert_to_numpy=True,
        show_progress_bar=True,
        batch_size=1,  # Single batch to reduce memory pressure
    )
    return embeddings.astype("float32")


def _tfidf_embeddings(texts: list[str]) -> np.ndarray:
    vectorizer = TfidfVectorizer(analyzer="char_wb", ngram_range=(2, 5), lowercase=False)
    matrix = vectorizer.fit_transform(texts)
    settings.tfidf_vectorizer_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(vectorizer, settings.tfidf_vectorizer_path)
    return matrix.toarray().astype("float32")


def build_faiss_index():
    records = load_document_records(settings.data_dir)
    chunk_records = []

    for record in records:
        cleaned = clean_text(record["text"])
        for chunk_id, chunk in enumerate(
            chunk_text(cleaned, settings.chunk_size, settings.chunk_overlap)
        ):
            if chunk:
                chunk_records.append(
                    {
                        "chunk_id": chunk_id,
                        "source": record["source"],
                        "text": chunk,
                    }
                )

    if not chunk_records:
        raise ValueError(f"No indexable Sanskrit content found in {settings.data_dir}")

    chunk_texts = [record["text"] for record in chunk_records]
    backend = settings.embedding_backend.strip().lower()
    if backend == "sentence-transformers":
        embeddings = _sentence_transformer_embeddings(chunk_texts)
    elif backend == "tfidf":
        embeddings = _tfidf_embeddings(chunk_texts)
    else:
        raise ValueError(
            f"Unsupported embedding backend: {settings.embedding_backend}. "
            "Use 'tfidf' or 'sentence-transformers'."
        )

    faiss.normalize_L2(embeddings)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(embeddings)

    settings.index_path.parent.mkdir(parents=True, exist_ok=True)
    settings.chunks_path.parent.mkdir(parents=True, exist_ok=True)

    with settings.chunks_path.open("w", encoding="utf-8") as f:
        json.dump(chunk_records, f, ensure_ascii=False, indent=2)

    np.save(settings.legacy_chunks_path, np.array(chunk_texts))
    faiss.write_index(index, str(settings.index_path))

    print(f"Index built with {len(chunk_records)} chunks using {backend}")


if __name__ == "__main__":
    build_faiss_index()
