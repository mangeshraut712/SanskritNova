from code.search_normalization import build_search_text, lexical_score


def test_build_search_text_includes_devanagari_iast_and_ascii_variants():
    search_text = build_search_text("रामो गच्छति")

    assert "रामो गच्छति" in search_text
    assert "rāmo gacchati" in search_text
    assert "ramo gacchati" in search_text


def test_lexical_score_bridges_ascii_query_and_devanagari_text():
    score = lexical_score("ramo gacchati", "रामो गच्छति")

    assert score > 1.0
