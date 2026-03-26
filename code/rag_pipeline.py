from __future__ import annotations

try:
    from .generator import Generator
    from .retriever import Retriever
except ImportError:  # pragma: no cover - supports direct script execution
    from generator import Generator
    from retriever import Retriever

class SanskritRAG:
    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()

    def search(self, query, k=None):
        return self.retriever.retrieve(query, k=k or self.retriever.index.ntotal)

    def answer(self, query, k=3):
        results = self.retriever.retrieve(query, k=k)
        if not results:
            return {
                "answer": "सन्दर्भे उत्तरं न लभ्यते।",
                "sources": [],
            }

        context = "\n\n".join(
            f"[{item['source']}#{item['chunk_id']}]\n{item['text']}"
            for item in results
        )

        prompt = f"""
You are a Sanskrit learning assistant.

Rules:
- Use ONLY the supplied context.
- Answer in simple Sanskrit.
- If the context is insufficient, answer exactly: "सन्दर्भे उत्तरं न लभ्यते।"
- Do not invent sources.
- End with a short source line in the form: "स्रोतः: ..."

Context:
{context}

Question:
{query}

Answer:
"""
        answer = self.generator.generate(prompt)
        return {
            "answer": answer,
            "sources": results,
        }


if __name__ == "__main__":
    rag = SanskritRAG()
    print(rag.answer("योगः किम्?"))
