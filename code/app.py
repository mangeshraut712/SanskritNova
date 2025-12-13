from rag_pipeline import SanskritRAG

rag = SanskritRAG()

while True:
    q = input("\nEnter Sanskrit query: ")
    print("\nAnswer:\n", rag.answer(q))

