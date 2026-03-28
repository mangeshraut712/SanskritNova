from __future__ import annotations

import re
import unicodedata


INDEPENDENT_VOWELS = {
    "अ": "a",
    "आ": "ā",
    "इ": "i",
    "ई": "ī",
    "उ": "u",
    "ऊ": "ū",
    "ऋ": "ṛ",
    "ॠ": "ṝ",
    "ऌ": "ḷ",
    "ॡ": "ḹ",
    "ए": "e",
    "ऐ": "ai",
    "ओ": "o",
    "औ": "au",
}

CONSONANTS = {
    "क": "k",
    "ख": "kh",
    "ग": "g",
    "घ": "gh",
    "ङ": "ṅ",
    "च": "c",
    "छ": "ch",
    "ज": "j",
    "झ": "jh",
    "ञ": "ñ",
    "ट": "ṭ",
    "ठ": "ṭh",
    "ड": "ḍ",
    "ढ": "ḍh",
    "ण": "ṇ",
    "त": "t",
    "थ": "th",
    "द": "d",
    "ध": "dh",
    "न": "n",
    "प": "p",
    "फ": "ph",
    "ब": "b",
    "भ": "bh",
    "म": "m",
    "य": "y",
    "र": "r",
    "ल": "l",
    "व": "v",
    "श": "ś",
    "ष": "ṣ",
    "स": "s",
    "ह": "h",
}

VOWEL_SIGNS = {
    "ा": "ā",
    "ि": "i",
    "ी": "ī",
    "ु": "u",
    "ू": "ū",
    "ृ": "ṛ",
    "ॄ": "ṝ",
    "ॢ": "ḷ",
    "ॣ": "ḹ",
    "े": "e",
    "ै": "ai",
    "ो": "o",
    "ौ": "au",
}

MARKS = {"ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "।": ".", "॥": ".."}
DIGITS = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
}
VIRAMA = "्"
DEVANAGARI_RE = re.compile(r"[\u0900-\u097F]")
TOKEN_RE = re.compile(r"[a-z0-9āīūṛṝḷḹṅñṭḍṇśṣṃḥ]+")


def _collapse_whitespace(text: str) -> str:
    return " ".join(text.lower().split())


def _strip_diacritics(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in normalized if not unicodedata.combining(ch))


def transliterate_devanagari_to_iast(text: str) -> str:
    output: list[str] = []
    index = 0

    while index < len(text):
        char = text[index]

        if char in INDEPENDENT_VOWELS:
            output.append(INDEPENDENT_VOWELS[char])
            index += 1
            continue

        if char in CONSONANTS:
            chunk = CONSONANTS[char]
            next_char = text[index + 1] if index + 1 < len(text) else ""

            if next_char == VIRAMA:
                output.append(chunk)
                index += 2
                continue

            if next_char in VOWEL_SIGNS:
                output.append(chunk + VOWEL_SIGNS[next_char])
                index += 2
                continue

            output.append(chunk + "a")
            index += 1
            continue

        if char in MARKS:
            output.append(MARKS[char])
            index += 1
            continue

        if char in DIGITS:
            output.append(DIGITS[char])
            index += 1
            continue

        if char in VOWEL_SIGNS or char == VIRAMA:
            index += 1
            continue

        output.append(char)
        index += 1

    return "".join(output)


def get_search_variants(text: str) -> list[str]:
    base = _collapse_whitespace(text)
    if not base:
        return []

    variants: list[str] = []
    for variant in (
        base,
        transliterate_devanagari_to_iast(base) if DEVANAGARI_RE.search(base) else base,
    ):
        normalized = _collapse_whitespace(variant)
        ascii_variant = _collapse_whitespace(_strip_diacritics(normalized))
        for candidate in (normalized, ascii_variant):
            if candidate and candidate not in variants:
                variants.append(candidate)

    return variants


def build_search_text(text: str) -> str:
    return " ".join(get_search_variants(text))


def _tokens(text: str) -> set[str]:
    return set(TOKEN_RE.findall(text))


def _char_ngrams(text: str, n: int = 3) -> set[str]:
    compact = re.sub(r"\s+", "", text)
    if not compact:
        return set()
    if len(compact) < n:
        return {compact}
    return {compact[i : i + n] for i in range(len(compact) - n + 1)}


def _variant_score(query_variant: str, candidate_variant: str) -> float:
    query_tokens = _tokens(query_variant)
    candidate_tokens = _tokens(candidate_variant)
    query_ngrams = _char_ngrams(query_variant)
    candidate_ngrams = _char_ngrams(candidate_variant)

    phrase_bonus = 1.5 if query_variant and query_variant in candidate_variant else 0.0
    token_overlap = (
        len(query_tokens & candidate_tokens) / len(query_tokens) if query_tokens else 0.0
    )
    ngram_overlap = (
        len(query_ngrams & candidate_ngrams) / len(query_ngrams) if query_ngrams else 0.0
    )

    return phrase_bonus + (2.0 * token_overlap) + ngram_overlap


def lexical_score(query: str, candidate_text: str) -> float:
    query_variants = get_search_variants(query)
    candidate_variants = get_search_variants(candidate_text)
    if not query_variants or not candidate_variants:
        return 0.0

    return max(
        _variant_score(query_variant, candidate_variant)
        for query_variant in query_variants
        for candidate_variant in candidate_variants
    )
