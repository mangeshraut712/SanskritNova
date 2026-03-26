import os

from llama_cpp import Llama

try:
    from .config import settings
except ImportError:  # pragma: no cover - supports direct script execution
    from config import settings


os.environ["LLAMA_CPP_LOG_LEVEL"] = "ERROR"
class Generator:
    def __init__(self):
        if not settings.model_path.exists():
            raise FileNotFoundError(
                f"Model file not found at {settings.model_path}. "
                "Set SANSKRIT_RAG_MODEL_PATH or place the GGUF there."
            )

        self.llm = Llama(
            model_path=str(settings.model_path),
            n_ctx=settings.llm_ctx,
            n_threads=settings.llm_threads,
            n_batch=settings.llm_batch,
        )

    def generate(self, prompt):
        result = self.llm(
            prompt,
            max_tokens=settings.llm_max_tokens,
            temperature=settings.llm_temperature,
            stop=["<|end|>","<|assistant|>"]
        )
        return result["choices"][0]["text"].strip()


if __name__ == "__main__":
    g = Generator()
    print(g.generate("योगः किम्?"))
