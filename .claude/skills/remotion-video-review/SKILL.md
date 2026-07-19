---
name: remotion-video-review
description: |
  Review and analyze a Remotion video (or any rendered video) WITHOUT TwelveLabs or any
  API key. Samples frames locally with `remotion still` (or ffmpeg for video files), then
  uses Claude's own vision to critique composition, legibility, pacing, contrast, framing,
  and brand consistency — and proposes concrete timeline/component edits. Supports an
  iterative render → review → improve loop.

  This is a key-free replacement for the remotion-superpowers TwelveLabs commands
  (/review-video, /analyze-footage).

  Triggers:
  - "review my video", "review the render", "critique the video", "video feedback"
  - "analyze footage", "what's wrong with this video", "improve the video"
  - "review-video without keys", "twelvelabs alternative", "video review loop"
---

# Remotion Video Review (key-free)

Replaces TwelveLabs video understanding for the **"watch the render, give actionable
feedback, improve it"** loop. Instead of an external video-AI API, it renders frames
locally and Claude (a vision model) inspects them directly.

## Scope — what this can and cannot judge

**Can** (well): visual hierarchy, text/caption legibility, safe margins, color &
contrast, 9:16 / 16:9 framing, on-screen clutter, brand consistency, per-frame
composition, and — by sampling across the timeline — coarse pacing/variety. It maps every
problem to a concrete edit in the Remotion code or `timeline.json`.

**Cannot** (be honest about these): true temporal motion understanding, audio
quality/voice analysis, lip-sync, or frame-accurate object timestamps. For audio/caption
**timing**, read `timeline.json` + the source alignment data rather than guessing from
frames. Never claim you "watched" the video — you sampled frames.

## Workflow

### 1. Sample frames (one command — duration auto-detected)

```bash
cd remotion-video
bash ../.claude/skills/remotion-video-review/scripts/sample-frames.sh <comp-id> auto [count]
# example:
bash ../.claude/skills/remotion-video-review/scripts/sample-frames.sh history-of-venus auto 8
```

- Frames land in `public/review/frame-NN-f<frame>.png`, always including first and last.
- Count: 6–10 for a short, 12–20 for 60s+. Unknown comp id? The script lists available ones.
- One specific moment: `npx remotion still src/index.ts <comp-id> public/review/spot.png --frame=<n>`
- A rendered `.mp4`/`.mov` instead of a composition → ffmpeg fallback at the bottom.

### 2. Look at the frames + read the data

- **Read** each PNG with the Read tool (never skip frames — every sampled frame gets looked at).
- **Read** `public/content/<slug>/timeline.json` for segment timing, text chunks, and audio —
  pacing/caption-sync issues live there, not in the pixels.

### 3. Produce a structured review

Score each axis 1–5. Cite the exact frame file (`frame-03-f257.png`) for every issue —
no issue without a frame reference.

| Axis | What to check |
|------|---------------|
| **Hierarchy** | Is the focal point obvious? Competing elements? |
| **Legibility** | Text size, weight, contrast vs background; readable at thumbnail size? |
| **Safe margins** | Nothing critical within ~7% of edges; captions clear of platform UI zones (TikTok/Reels) |
| **Contrast** | Text-vs-bg contrast; needs scrim/stroke/shadow if borderline |
| **Framing** | Correct aspect (1080×1920 vertical here); background fills the FULL frame; subject balanced |
| **Color/brand** | Palette consistency, intro card style, accent usage |
| **Pacing/variety** | Across sampled frames: enough visual change? Repetitive backgrounds? |
| **Clutter** | Too much on screen at once? |

Known defect patterns in this template (check these first):
- Background image not covering the frame (partial-width strip, white gap) → `Background.tsx` needs `width/height: 100%` + `objectFit: "cover"`.
- Caption rendered off-center or hugging an edge despite `position: "center"` → `Subtitle.tsx`.

Output = ranked list of **concrete problems**: frame ref → why it matters → the exact fix.

### 4. Map each fix to code

| Problem area | Edit here |
|---|---|
| Title card look | `src/components/AIVideo.tsx` (the intro `<div>`) |
| Subtitle size/contrast/position | `src/components/Subtitle.tsx` + `timeline.text[].position` |
| Background motion (Ken Burns / zoom) | `cli/timeline.ts` `getBgAnimations()`, or `timeline.json` `elements[].animations` |
| Segment durations / pacing | `timeline.json` `startMs`/`endMs` (Studio hot-reloads) |
| Transitions between slides | `@remotion/transitions` in `AIVideo.tsx` |

### 5. Iterate (the review loop)

1. Apply the top 1–3 fixes (edit code or `timeline.json`).
2. Re-run `sample-frames.sh` (or screenshot the live Studio via preview tools).
3. Re-review only what changed.
4. Stop when every axis is ≥4 or the user is happy. Cap at ~3 loops unless asked.

## ffmpeg fallback (arbitrary video files)

For a `.mp4`/`.mov` not produced by Remotion (requires ffmpeg — `brew install ffmpeg`):

```bash
mkdir -p review-frames
ffmpeg -i input.mp4 -vf fps=1 review-frames/f-%03d.png          # one frame per second
ffmpeg -ss 00:00:12 -i input.mp4 -frames:v 1 review-frames/at-12s.png   # one timestamp
```

Then Read the PNGs and apply steps 3–5.

## Notes

- Cost: local compute only — no API keys, no network. Frames are deterministic → reviews reproducible.
- Clean up `public/review/` when done (it is throwaway output, not project content).
- Pair with Magnific for regenerating any asset a review flags as weak, and with
  `suno-music` if the music bed is the weak point.
