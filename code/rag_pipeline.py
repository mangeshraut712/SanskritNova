from retriever import Retriever
from generator import Generator

class SanskritRAG:
    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()

    def answer(self, query):
        context = self.retriever.retrieve(query)

        prompt = f"""
    You are a Sanskrit knowledge assistant.

    Rules:
    - Use ONLY the context given below.
    - Answer in simple, classical Sanskrit.
    - If unsure, say: "सन्दर्भे उत्तरं न लभ्यते।"
    - Do NOT mix Hindi or English.
    -Answer in Sanskrit. If needed, add a short English explanation in brackets.

    Context:
    {context}

    Question:
    {query}

    Answer (Sanskrit only):
    """
        return self.generator.generate(prompt)


if __name__ == "__main__":
    rag = SanskritRAG()
    print(rag.answer("योगः किम्?"))
