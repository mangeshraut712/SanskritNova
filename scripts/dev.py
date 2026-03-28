#!/usr/bin/env python3
"""Run the FastAPI backend and static frontend together for local development."""

from __future__ import annotations

import argparse
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--api-host", default="127.0.0.1", help="Host to bind the API server to.")
    parser.add_argument("--api-port", type=int, default=8000, help="Port for the API server.")
    parser.add_argument(
        "--web-host", default="127.0.0.1", help="Host to bind the frontend server to."
    )
    parser.add_argument("--web-port", type=int, default=3000, help="Preferred frontend port.")
    return parser.parse_args()


def terminate_process(process: subprocess.Popen[bytes]) -> None:
    if process.poll() is not None:
        return

    process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)


def main() -> int:
    args = parse_args()

    api_command = [
        sys.executable,
        "-m",
        "uvicorn",
        "api.index:app",
        "--reload",
        "--host",
        args.api_host,
        "--port",
        str(args.api_port),
    ]
    web_command = [
        sys.executable,
        str(REPO_ROOT / "scripts" / "serve_public.py"),
        "--host",
        args.web_host,
        "--port",
        str(args.web_port),
    ]

    print(f"Starting API server on http://{args.api_host}:{args.api_port}")
    api_process = subprocess.Popen(api_command, cwd=REPO_ROOT)

    print("Starting frontend server")
    web_process = subprocess.Popen(web_command, cwd=REPO_ROOT)

    processes = {
        "api": api_process,
        "web": web_process,
    }

    try:
        while True:
            for name, process in processes.items():
                exit_code = process.poll()
                if exit_code is not None:
                    print(f"{name} server exited with code {exit_code}. Stopping remaining processes.")
                    for other_name, other_process in processes.items():
                        if other_name != name:
                            terminate_process(other_process)
                    return exit_code
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nStopping development servers.")
        for process in processes.values():
            terminate_process(process)
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
