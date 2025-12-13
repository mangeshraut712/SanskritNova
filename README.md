# Sanskrit Document Retrieval-Augmented Generation (RAG) System

## Project Overview
This project implements a **Retrieval-Augmented Generation (RAG)** system for answering user queries based on **Sanskrit documents**, operating entirely on **CPU-only inference**.

The system ingests Sanskrit text documents, preprocesses and indexes them using vector embeddings, retrieves relevant context for a given query, and generates responses using a lightweight Large Language Model (LLM).

---

## Objectives
- Process Sanskrit documents in `.txt` and `.pdf` formats
- Support Sanskrit queries
- Perform semantic retrieval using embeddings
- Generate context-grounded answers
- Ensure **CPU-only** execution without GPU dependency

---

## System Architecture
```

User Query
↓
Query Embedding
↓
Vector Retriever (FAISS)
↓
Relevant Sanskrit Chunks
↓
Prompt Construction
↓
CPU-based LLM (Phi-3 Mini)
↓
Generated Answer

```

---

## Technologies Used
- **Python 3.11**
- **SentenceTransformers** – multilingual embeddings
- **FAISS (CPU)** – vector similarity search
- **llama-cpp-python** – CPU-based LLM inference
- **Phi-3 Mini (GGUF)** – lightweight LLM
- **pdfplumber** – PDF text extraction

---

## Folder Structure
```

RAG_Sanskrit_VidhiSaxena/
│
├── code/
│   ├── ingest.py
│   ├── preprocess.py
│   ├── build_index.py
│   ├── retriever.py
│   ├── generator.py
│   ├── rag_pipeline.py
│   └── app.py
│
├── data/
│   └── Sanskrit documents (.txt / .pdf)
│
├── models/
│   └── phi3.gguf
│
├── report/
│   └── RAG_Sanskrit_Report.pdf
│
└── README.md

````

---

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
````

### 2. Install Dependencies

```bash
pip install sentence-transformers faiss-cpu pdfplumber llama-cpp-python
```

### 3. Add Sanskrit Documents

Place `.txt` or `.pdf` Sanskrit files inside the `data/` folder.

---

## Model Setup (CPU Only)

Download **Phi-3 Mini GGUF** manually:

[https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf)

Rename and place it as:

```
models/phi3.gguf
```

---

## Running the System

### Step 1: Build Vector Index

```bash
python code/build_index.py
```

### Step 2: Run the RAG Application

```bash
python code/app.py
```

Enter a Sanskrit query when prompted.

---

## Example Query

```
योगः किम्?
```

## Example Output

```
योगः चित्तवृत्तिनिरोधः।
```

---

## Notes

* Entire system runs on **CPU**
* Embeddings are precomputed for fast retrieval
* Designed to follow standard RAG modular architecture

