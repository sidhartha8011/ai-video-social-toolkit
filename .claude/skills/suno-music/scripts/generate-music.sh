#!/usr/bin/env bash
# generate-music.sh — generate a track via sunoapi.org and download the mp3.
# Prompt-craft adapted from bitwize-music suno-engineer (CC0-1.0).
#
# Run in the BACKGROUND (it sleeps between status polls).
#
# Usage:
#   generate-music.sh <out.mp3> <style> [title] [model] [instrumental] [prompt]
#
#   out.mp3       Output file path (dirs are created).
#   style         Suno style box: genre, instrumentation, mood, tempo (BPM), production.
#   title         Track title (default "Generated Track").
#   model         V4_5 | V4_5PLUS | V5 | V5_5  (default V5; auto-falls back to V4_5
#                 if the API rejects the requested model, e.g. plan restrictions).
#   instrumental  true|false (default true — no vocals, for video beds).
#   prompt        Lyrics/description; used only when instrumental=false.
#
# SUNO_KEY resolution order: env var -> ./.env -> remotion-video/.env (relative to CWD
# or to this script). Never commit the key.
set -euo pipefail

OUT="${1:?output mp3 path required}"
STYLE="${2:?style string required (the Suno style box)}"
TITLE="${3:-Generated Track}"
MODEL="${4:-V5}"
INSTRUMENTAL="${5:-true}"
PROMPT="${6:-}"

# Auto-load SUNO_KEY from a .env if it's not already in the environment.
if [ -z "${SUNO_KEY:-}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  for envfile in \
    "$PWD/.env" \
    "$PWD/remotion-video/.env" \
    "$SCRIPT_DIR/../../../../remotion-video/.env"; do
    if [ -f "$envfile" ]; then
      set -a; . "$envfile"; set +a
      [ -n "${SUNO_KEY:-}" ] && break
    fi
  done
fi
: "${SUNO_KEY:?SUNO_KEY not set — add it to remotion-video/.env or export SUNO_KEY}"

API="https://api.sunoapi.org"
mkdir -p "$(dirname "$OUT")"

# Informational: credits before generating (non-fatal if it fails).
CREDITS=$(curl -sS "$API/api/v1/generate/credit" -H "Authorization: Bearer $SUNO_KEY" \
  | python3 -c "import sys,json;print(json.load(sys.stdin).get('data','?'))" 2>/dev/null || echo "?")
echo "Credits available: $CREDITS"

build_body() { # $1 = model
  python3 - "$STYLE" "$TITLE" "$1" "$INSTRUMENTAL" "$PROMPT" <<'PY'
import json, sys
style, title, model, inst, prompt = sys.argv[1:6]
body = {
    "customMode": True,
    "instrumental": inst.lower() == "true",
    "style": style,
    "title": title,
    "model": model,
    "callBackUrl": "https://example.com/callback",
}
if not body["instrumental"]:
    body["prompt"] = prompt or title
print(json.dumps(body))
PY
}

request_generation() { # $1 = model; echoes raw response
  curl -sS -X POST "$API/api/v1/generate" \
    -H "Authorization: Bearer $SUNO_KEY" -H "Content-Type: application/json" \
    -d "$(build_body "$1")"
}

get_code() { echo "$1" | python3 -c "import sys,json;print(json.load(sys.stdin).get('code',''))" 2>/dev/null || echo ""; }

echo "Requesting generation (model=$MODEL, instrumental=$INSTRUMENTAL)..."
RESP=$(request_generation "$MODEL")
CODE=$(get_code "$RESP")

# Auto-fallback: if the requested model is rejected, retry once on proven V4_5.
if [ "$CODE" != "200" ] && [ "$MODEL" != "V4_5" ]; then
  echo "Model $MODEL rejected ($RESP)"
  echo "Falling back to V4_5..."
  MODEL="V4_5"
  RESP=$(request_generation "$MODEL")
  CODE=$(get_code "$RESP")
fi
if [ "$CODE" != "200" ]; then
  echo "generate failed: $RESP" >&2
  exit 1
fi

TASK_ID=$(echo "$RESP" | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['taskId'])")
echo "taskId=$TASK_ID (model=$MODEL) — polling status..."

for i in $(seq 1 60); do
  sleep 10
  R=$(curl -sS "$API/api/v1/generate/record-info?taskId=$TASK_ID" -H "Authorization: Bearer $SUNO_KEY")
  ST=$(echo "$R" | python3 -c "import sys,json;print(json.load(sys.stdin).get('data',{}).get('status'))" 2>/dev/null || echo "?")
  echo "[poll $i] status=$ST"
  if [ "$ST" = "SUCCESS" ]; then
    URL=$(echo "$R" | python3 -c "import sys,json;print(json.load(sys.stdin)['data']['response']['sunoData'][0]['audioUrl'])")
    echo "audioUrl=$URL"
    curl -sSL "$URL" -o "$OUT"
    echo "SAVED:"; ls -la "$OUT"
    exit 0
  fi
  case "$ST" in
    *ERROR*|*FAIL*|SENSITIVE*|CREATE_TASK_FAILED) echo "FAILED: $R"; exit 1;;
  esac
done
echo "Timed out after ~600s waiting for SUCCESS"; exit 1
