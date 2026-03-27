from code.preprocess import chunk_text, clean_text


def test_clean_text_preserves_sanskrit_markers():
    text = "अथ योगानुशासनम्। Yoga 101!"
    cleaned = clean_text(text)
    assert "अथ" in cleaned
    assert "।" in cleaned


def test_chunk_text_splits_on_sentence_boundaries():
    text = "अथ योगानुशासनम्। योगः चित्तवृत्तिनिरोधः॥ तदा द्रष्टुः स्वरूपेऽवस्थानम्॥"
    chunks = chunk_text(text, chunk_size=25, overlap=5)
    assert len(chunks) >= 2
    assert all(chunk.strip() for chunk in chunks)
