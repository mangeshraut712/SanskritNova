from __future__ import annotations

from ._loader import load_code_module

_module = load_code_module("ingest")
load_txt = _module.load_txt
load_pdf = _module.load_pdf
load_docx = _module.load_docx
load_document_records = _module.load_document_records
load_documents = _module.load_documents
