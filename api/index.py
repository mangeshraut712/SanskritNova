from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/info")
def info():
    return {"version": "1.0.0", "name": "SanskritNova API"}


handler = None
try:
    from mangum import Mangum
    handler = Mangum(app)
except Exception as e:
    import sys
    print(f"Error: {e}", file=sys.stderr)
