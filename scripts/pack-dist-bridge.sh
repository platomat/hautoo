#!/usr/bin/env bash
# Pack Astro dist/ into dist/dist-bridge.zip for hautoo-dist-bridge pull deploy.
# Runs automatically after `npm run build` when HAUTOO_DIST_BRIDGE=1 (e.g. Cloudflare Pages).
# Without the env var: exit 0, no ZIP.
#
# Prefers `zip` CLI; falls back to Python 3 zipfile (CF Pages has no zip, but has python3).
#
# Env:
#   HAUTOO_DIST_BRIDGE=1
#   DIST_BRIDGE_ZIP_OUT=/path/to/out.zip
#   DIST_BRIDGE_ZIP_NAME=dist-bridge.zip

set -euo pipefail

flag_on() {
  case "${1:-}" in
    1|true|TRUE|yes|YES|on|ON) return 0 ;;
    *) return 1 ;;
  esac
}

if ! flag_on "${HAUTOO_DIST_BRIDGE:-}"; then
  echo "[pack-dist-bridge] HAUTOO_DIST_BRIDGE not set (or off): skip" >&2
  exit 0
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="${PROJECT_ROOT}/dist"
ZIP_NAME="${DIST_BRIDGE_ZIP_NAME:-dist-bridge.zip}"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "[pack-dist-bridge] error: dist/ not found (run npm run build first)" >&2
  exit 1
fi

OUT="${DIST_BRIDGE_ZIP_OUT:-${PROJECT_ROOT}/${ZIP_NAME}}"
OUT_ABS="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"

rm -f "${DIST_DIR}/${ZIP_NAME}"
rm -f "$OUT_ABS"

pack_with_zip() {
  (
    cd "$DIST_DIR"
    zip -r -q "$OUT_ABS" . -x "./${ZIP_NAME}" -x "${ZIP_NAME}"
  )
}

pack_with_python() {
  python3 - "$DIST_DIR" "$OUT_ABS" "$ZIP_NAME" <<'PY'
import os
import sys
import zipfile

src, dest, skip = sys.argv[1], sys.argv[2], sys.argv[3]
with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    for root, _dirs, files in os.walk(src):
        for name in files:
            if name == skip:
                continue
            path = os.path.join(root, name)
            arc = os.path.relpath(path, src)
            zf.write(path, arcname=arc)
PY
}

if command -v zip >/dev/null 2>&1; then
  pack_with_zip
elif command -v python3 >/dev/null 2>&1; then
  echo "[pack-dist-bridge] zip CLI missing; using python3 zipfile" >&2
  pack_with_python
else
  echo "[pack-dist-bridge] error: need zip CLI or python3" >&2
  exit 1
fi

cp -f "$OUT_ABS" "${DIST_DIR}/${ZIP_NAME}"
echo "[pack-dist-bridge] wrote $OUT_ABS ($(du -h "$OUT_ABS" | cut -f1))"
echo "[pack-dist-bridge] embedded ${DIST_DIR}/${ZIP_NAME} (deploy → /${ZIP_NAME})"
