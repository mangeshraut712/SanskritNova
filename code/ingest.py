from __future__ import annotations

import os
from pathlib import Path

import docx
import pdfplumber


def load_txt(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def load_pdf(path):
    with pdfplumber.open(path) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
        return "\n".join(pages)

def load_docx(path):
    doc = docx.Document(path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def load_document_records(data_path="data"):
    records = []
    data_dir = Path(data_path)

    if not data_dir.exists():
        raise FileNotFoundError(f"Data directory not found: {data_dir}")

    for path in sorted(data_dir.iterdir()):
        if not path.is_file():
            continue

        suffix = path.suffix.lower()
        if suffix == ".txt":
            text = load_txt(path)
        elif suffix == ".pdf":
            text = load_pdf(path)
        elif suffix == ".docx":
            text = load_docx(path)
        else:
            print("Skipping unsupported file:", path.name)
            continue

        records.append({"source": path.name, "text": text})

    return records


def load_documents(data_path="data"):
    return [record["text"] for record in load_document_records(data_path)]


if __name__ == "__main__":
    docs = load_documents()
    print("Loaded documents:", len(docs))
