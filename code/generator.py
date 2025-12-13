from llama_cpp import Llama
import os

os.environ["LLAMA_CPP_LOG_LEVEL"] = "ERROR"
class Generator:
    def __init__(self):
        self.llm = Llama(
            model_path="model\Phi-3-mini-4k-instruct-q4.gguf",
            n_ctx=2048,
            n_threads=8,   
            n_batch=256
        )

    def generate(self, prompt):
        result = self.llm(
            prompt,
            max_tokens=300,
            temperature=0.2,
            stop=["<|end|>","<|assistant|>"]
        )
        return result["choices"][0]["text"]


if __name__ == "__main__":
    g = Generator()
    print(g.generate("योगः किम्?"))
