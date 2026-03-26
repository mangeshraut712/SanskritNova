from __future__ import annotations

try:
    from .rag_pipeline import SanskritRAG
except ImportError:  # pragma: no cover - supports direct script execution
    from rag_pipeline import SanskritRAG


def main():
    rag = SanskritRAG()
    while True:
        try:
            query = input("\nEnter Sanskrit query: ").strip()
        except KeyboardInterrupt:
            print("\nExiting.")
            break

        if not query:
            continue

        response = rag.answer(query)
        print("\nAnswer:\n", response["answer"])
        if response["sources"]:
            print("\nSources:")
            for source in response["sources"]:
                print(f"- {source['source']}#{source['chunk_id']}")


if __name__ == "__main__":
    main()
