#!/usr/bin/env bash
set -euo pipefail

# Determine project root (script directory parent)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/.."
BACKEND_DIR="${ROOT_DIR}/FieldSense_backend"
REQ_FILE="${ROOT_DIR}/requirements.txt"

# Activate venv if present
if [[ -d "${ROOT_DIR}/.venv" ]]; then
  # shellcheck disable=SC1091
  source "${ROOT_DIR}/.venv/bin/activate"
  echo "[run_backend] Activated virtualenv .venv"
else
  echo "[run_backend] No .venv found; creating one."
  python3 -m venv "${ROOT_DIR}/.venv"
  # shellcheck disable=SC1091
  source "${ROOT_DIR}/.venv/bin/activate"
  pip install --upgrade pip
fi

# Ensure dependencies (idempotent)
if [[ -f "${REQ_FILE}" ]]; then
  echo "[run_backend] Installing requirements.txt..."
  pip install -q -r "${REQ_FILE}" || true
fi

# Ensure critical runtime deps individually (covers mismatch issues)
REQUIRED_PKGS=(httpx python-multipart requests)
for pkg in "${REQUIRED_PKGS[@]}"; do
  PKG="$pkg" python - <<'PY'
import importlib, subprocess, os, sys
pkg = os.environ.get('PKG')
if not pkg:
    sys.exit(0)
mod_name = pkg.replace('-', '_')
try:
    importlib.import_module(mod_name)
    print(f"[run_backend] {pkg} already installed")
except ImportError:
    print(f"[run_backend] Installing missing {pkg}")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', pkg])
PY
done

echo "[run_backend] Using Python: $(which python)"

# Detect LAN IP (en0 fallback) for CORS + frontend origin
LAN_IP=${LAN_IP:-$(ipconfig getifaddr en0 2>/dev/null || echo 127.0.0.1)}
export LAN_IP
: "${FRONTEND_ORIGIN:=http://$LAN_IP:3000}"; export FRONTEND_ORIGIN

echo "[run_backend] LAN_IP=$LAN_IP FRONTEND_ORIGIN=$FRONTEND_ORIGIN"

cd "$BACKEND_DIR"
exec python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
