import pdfplumber
import docx
import os


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

def load_documents(data_path="data"):
    texts = []

    for filename in os.listdir(data_path):
        path = os.path.join(data_path, filename)

        if filename.endswith(".txt"):
            texts.append(load_txt(path))

        elif filename.endswith(".pdf"):
            texts.append(load_pdf(path))

        elif filename.endswith(".docx"):
            texts.append(load_docx(path))

        else:
            print("Skipping unsupported file:", filename)

    return texts


if __name__ == "__main__":
    docs = load_documents()
    print("Loaded documents:", len(docs))