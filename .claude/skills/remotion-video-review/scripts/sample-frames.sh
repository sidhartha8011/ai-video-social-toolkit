#!/usr/bin/env bash
# sample-frames.sh — render N evenly-spaced still frames from a Remotion composition
# for key-free, vision-based video review (a local replacement for TwelveLabs).
#
# Run from inside the Remotion project directory (e.g. remotion-video/).
#
# Usage:
#   sample-frames.sh <comp-id> <total-frames|auto> [count] [outdir] [entry]
#
# Args:
#   comp-id       Composition id (see: npx remotion compositions src/index.ts)
#   total-frames  durationInFrames of the composition, or "auto" to detect it
#   count         How many frames to sample (default 8)
#   outdir        Output directory (default public/review)
#   entry         Remotion entry point (default src/index.ts)
#
# Examples:
#   sample-frames.sh history-of-venus auto 8
#   sample-frames.sh history-of-venus 1651 12
set -euo pipefail

COMP_ID="${1:?comp-id required — run: npx remotion compositions src/index.ts}"
TOTAL="${2:?total-frames required (a number, or the word auto)}"
COUNT="${3:-8}"
OUTDIR="${4:-public/review}"
ENTRY="${5:-src/index.ts}"

# Auto-detect durationInFrames from `remotion compositions` output.
# Row format: <id> <fps> <WxH> <frames> (<seconds> sec)
# NOTE: --log=error suppresses the table, so detection runs at default log level.
if [ "$TOTAL" = "auto" ]; then
  echo "Detecting durationInFrames for '$COMP_ID'..."
  TOTAL=$(npx remotion compositions "$ENTRY" 2>/dev/null \
    | awk -v id="$COMP_ID" '$1 == id {print $4; exit}')
  if [ -z "$TOTAL" ]; then
    echo "error: composition '$COMP_ID' not found. Available ids:" >&2
    npx remotion compositions "$ENTRY" --quiet 2>/dev/null >&2
    exit 1
  fi
  echo "Detected $TOTAL frames."
fi

if ! [[ "$TOTAL" =~ ^[0-9]+$ ]] || [ "$TOTAL" -le 0 ]; then
  echo "error: total-frames must be a positive integer or 'auto' (got '$TOTAL')" >&2
  exit 1
fi
if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [ "$COUNT" -le 0 ]; then
  echo "error: count must be a positive integer (got '$COUNT')" >&2
  exit 1
fi

mkdir -p "$OUTDIR"
last=$((TOTAL - 1))
[ "$last" -lt 0 ] && last=0

echo "Sampling $COUNT frame(s) from '$COMP_ID' across frames 0..$last -> $OUTDIR"
for ((i = 0; i < COUNT; i++)); do
  if [ "$COUNT" -gt 1 ]; then
    frame=$(( i * last / (COUNT - 1) ))
  else
    frame=0
  fi
  idx=$(printf "%02d" "$i")
  out="$OUTDIR/frame-${idx}-f${frame}.png"
  echo "  [$((i + 1))/$COUNT] frame $frame -> $out"
  npx remotion still "$ENTRY" "$COMP_ID" "$out" --frame="$frame" --log=error
done

echo "Done. Read the PNGs in $OUTDIR with the Read tool to review."
