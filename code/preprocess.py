import re

def clean_text(text):
    # Keep Devanagari content, common Latin references, and sentence punctuation.
    text = re.sub(r"[^0-9A-Za-z\u0900-\u097F\s।॥,;:!?()'\"-]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def chunk_text(text, chunk_size=300, overlap=50):
    if not text:
        return []

    units = [unit.strip() for unit in re.split(r"(?<=[।॥.!?])\s+", text) if unit.strip()]
    if not units:
        return [text[:chunk_size]]

    chunks = []
    current_units = []
    current_length = 0

    for unit in units:
        next_length = current_length + len(unit) + (1 if current_units else 0)
        if current_units and next_length > chunk_size:
            chunks.append(" ".join(current_units))
            if overlap > 0 and current_units:
                trailing = current_units[-1]
                current_units = [trailing]
                current_length = len(trailing)
            else:
                current_units = []
                current_length = 0

        current_units.append(unit)
        current_length += len(unit) + (1 if current_units[:-1] else 0)

    if current_units:
        chunks.append(" ".join(current_units))

    return chunks

if __name__ == "__main__":
    sample = "अथ योगानुशासनम्। योगः चित्तवृत्तिनिरोधः॥"
    print(chunk_text(clean_text(sample)))
