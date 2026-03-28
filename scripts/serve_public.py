#!/usr/bin/env python3
"""Serve the static frontend from ./public on a predictable local URL."""

from __future__ import annotations

import argparse
import functools
import http.server
import socket
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = REPO_ROOT / "public"


def find_available_port(host: str, preferred_port: int, attempts: int = 20) -> int:
    for port in range(preferred_port, preferred_port + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
            probe.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                probe.bind((host, port))
            except OSError:
                continue
        return port

    raise RuntimeError(
        f"Could not find an open port between {preferred_port} and {preferred_port + attempts - 1}."
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind the frontend server to.")
    parser.add_argument(
        "--port", type=int, default=3000, help="Preferred port for the frontend server."
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if not PUBLIC_DIR.is_dir():
        print(f"Frontend directory not found: {PUBLIC_DIR}", file=sys.stderr)
        return 1

    port = find_available_port(args.host, args.port)
    if port != args.port:
        print(f"Port {args.port} is in use, serving frontend on {port} instead.")

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(PUBLIC_DIR))
    server = http.server.ThreadingHTTPServer((args.host, port), handler)

    print(f"Serving SanskritNova frontend from {PUBLIC_DIR}")
    print(f"Open http://{args.host}:{port}/")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping frontend server.")
    finally:
        server.server_close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
