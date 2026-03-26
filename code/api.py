from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

try:
    from .build_index import build_faiss_index
    from .config import settings
    from .rag_pipeline import SanskritRAG
except ImportError:  # pragma: no cover
    from build_index import build_faiss_index
    from config import settings
    from rag_pipeline import SanskritRAG


app = FastAPI(
    title="Sanskrit RAG API",
    version="0.1.0",
    description="Minimal API surface for Sanskrit document search and grounded answers.",
)

RAG_UNAVAILABLE_ERRORS = (FileNotFoundError, ImportError, ValueError)


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1)
    k: int = Field(default=settings.default_k, ge=1, le=10)


rag = None


def get_rag() -> SanskritRAG:
    global rag
    if rag is None:
        rag = SanskritRAG()
    return rag


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/search")
def search(request: QueryRequest):
    try:
        results = get_rag().retriever.retrieve(request.query, k=request.k)
    except RAG_UNAVAILABLE_ERRORS as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return {"query": request.query, "results": results}


@app.post("/answer")
def answer(request: QueryRequest):
    try:
        return get_rag().answer(request.query, k=request.k)
    except RAG_UNAVAILABLE_ERRORS as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@app.post("/ingest/rebuild")
def rebuild_index():
    try:
        build_faiss_index()
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    global rag
    rag = None
    return {"status": "rebuilt", "index_path": str(settings.index_path)}
