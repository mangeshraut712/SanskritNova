import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

class Retriever:
    def __init__(self):
        self.model = SentenceTransformer("distiluse-base-multilingual-cased-v1")
        self.index = faiss.read_index("code/faiss_index.bin")
        self.chunks = np.load("code/chunks.npy", allow_pickle=True)

    def retrieve(self, query, k=3):
        query_emb = self.model.encode([query])
        _, indices = self.index.search(query_emb, k)
        return [self.chunks[i] for i in indices[0]]

if __name__ == "__main__":
    r = Retriever()
    print(r.retrieve("योगः"))
