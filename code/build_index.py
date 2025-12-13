from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from ingest import load_documents
from preprocess import clean_text, chunk_text

def build_faiss_index():
    model = SentenceTransformer("distiluse-base-multilingual-cased-v1")

    docs = load_documents("data")
    all_chunks = []

    for doc in docs:
        cleaned = clean_text(doc)
        chunks = chunk_text(cleaned)
        all_chunks.extend(chunks)

    embeddings = model.encode(all_chunks, convert_to_numpy=True)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    np.save("code/chunks.npy", np.array(all_chunks))
    faiss.write_index(index, "code/faiss_index.bin")

    print("Index built with", len(all_chunks), "chunks")

if __name__ == "__main__":
    build_faiss_index()
