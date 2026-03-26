from __future__ import annotations

import json

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

try:
    from .config import settings
    from .ingest import load_document_records
    from .preprocess import chunk_text, clean_text
except ImportError:  # pragma: no cover - supports direct script execution
    from config import settings
    from ingest import load_document_records
    from preprocess import chunk_text, clean_text

def build_faiss_index():
    model = SentenceTransformer(settings.embedding_model)
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

    embeddings = model.encode(
        [record["text"] for record in chunk_records],
        convert_to_numpy=True,
    )

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    settings.index_path.parent.mkdir(parents=True, exist_ok=True)
    settings.chunks_path.parent.mkdir(parents=True, exist_ok=True)

    with settings.chunks_path.open("w", encoding="utf-8") as f:
        json.dump(chunk_records, f, ensure_ascii=False, indent=2)

    np.save(settings.legacy_chunks_path, np.array([record["text"] for record in chunk_records]))
    faiss.write_index(index, str(settings.index_path))

    print("Index built with", len(chunk_records), "chunks")

if __name__ == "__main__":
    build_faiss_index()
