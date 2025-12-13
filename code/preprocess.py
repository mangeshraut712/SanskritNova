import re

def clean_text(text):
    # allow only devanagari + spaces
    text = re.sub(r"[^\u0900-\u097F\s।॥]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def chunk_text(text, chunk_size=300, overlap=50):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

if __name__ == "__main__":
    sample = "अथ योगानुशासनम्। योगः चित्तवृत्तिनिरोधः॥"
    print(chunk_text(clean_text(sample)))
