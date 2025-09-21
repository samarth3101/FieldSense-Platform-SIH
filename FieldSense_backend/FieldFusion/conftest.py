# Ensures tests can import FieldFusion.* when run via `python -m pytest -q FieldFusion`
import sys
from pathlib import Path

pkg_root = Path(__file__).resolve().parent
backend_root = pkg_root.parent
if str(backend_root) not in sys.path:
    sys.path.insert(0, str(backend_root))
