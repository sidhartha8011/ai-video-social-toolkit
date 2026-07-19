---
name: video-script
description: |
  Write production-ready video scripts engineered for a SPECIFIC generation engine and a
  SPECIFIC duration. Outputs a timed shot table (scene-by-scene) where every scene carries
  the exact prompt formatted for the target engine (Remotion image-slides, Magnific
  video clips, Veo/Kling-class text-to-video, Higgsfield) plus narration timed to
  words-per-second, hooks placed per current platform algorithms, and correct clip-length
  budgeting. The script IS the production plan — make-video or manual generation can
  execute it directly.

  Triggers:
  - "video script", "script for a reel/short/video", "shot list", "storyboard"
  - "script this for veo/kling/magnific/remotion", "30 second script", "/video-script"
---

# video-script — engine-aware, duration-aware video scripts

A script is only "super good" if it can be SHOT as written. Every script must respect the
target engine's clip physics and the platform's algorithm. Never output a wall of prose —
output a timed shot table.

## Step 1 — Establish the production triangle

From the ask (infer aggressively, state your picks):
1. **Platform target** → duration + hook rules (defaults from platform-content skill):
   IG/FB Reel **15–30s** (completion-optimized) · TikTok 15–34s · YT Short ≤60s ·
   explainer 45–90s · website hero loop 8–15s (no narration).
2. **Engine** → clip physics (table below). If unstated: image-slides (cheapest) for
   narration-led content, video clips for cinematic/motion-led content.
3. **Goal** → reach (sends/completion), saves (utility), conversion (CTA) — from
   platform-content's format-by-goal logic.

## Step 2 — Engine physics (what the script must obey)

| Engine | Unit | Clip length | Prompt style | Gotchas |
|---|---|---|---|---|
| **Remotion slides** (make-video pipeline) | still image + Ken Burns | scene = narration length (4–8s) | Rich still-image prompt: subject, setting, mood, lighting, "vertical 9:16, no text" | Scene duration = voiceover duration; needs audioTimestamps; motion comes from Remotion, not the image |
| **Magnific video** (`video_generate`) | video clip | ~5–10s per clip | Cinematic shot prompt: subject + ACTION verb + camera move (dolly/pan/orbit) + lighting | Chain from a generated image (`identifier` as keyframe) for character/style consistency |
| **Veo/Kling-class** (via Replicate/KIE, needs keys) | video clip | 5–8s (Veo), 5–10s (Kling) | One shot per prompt; physical realism, camera grammar ("slow dolly-in, 35mm, golden hour"); Veo 3.1 does native audio/dialogue | Never script multi-shot sequences in one prompt; dialogue only if engine supports audio |
| **Higgsfield** (CLI, needs credits) | video clip / motion preset | ~5–10s | Shot prompt + named camera-motion preset | Check `higgsfield model list --video` for current models before promising specs |
| **Stock** (Magnific `stock_search`) | found clip | any (trim) | Search keywords, not prose | Script the trim: which 3–5s of the found clip |

**Clip-count math (do this explicitly):** scenes = ceil(duration ÷ clip length).
A 30s reel on a 6s engine = 5 clips. Narration = duration × **~2.3 words/sec** (140 wpm);
a 30s VO script is ~70 words — cut until it fits. Hero loops: script the LOOP (last frame
≈ first frame).

## Step 3 — Write the script (output format)

```
TITLE · platform · engine · total duration · goal
HOOK (0–3s): <on-screen text + spoken line + visual — per algorithm: question/unusual
visual/value claim. On FB engineer the 50%-retention midpoint beat too.>

| # | Time | Shot (what viewer sees) | Engine prompt (paste-ready) | VO / on-screen text | Audio/SFX |
|---|------|------------------------|-----------------------------|--------------------|-----------|
| 1 | 0:00–0:06 | ... | ... | ... | ... |

CTA (final scene): <send/save/comment/link per goal>
MUSIC BRIEF: <one line for suno-music — genre, mood, BPM>
COVER/THUMB: <one still prompt>
```

Rules: every scene has a visual CHANGE (retention); prompts are self-contained (no "same
as before" — engines have no memory; repeat character/style descriptors verbatim for
consistency); VO lines timed to the scene's seconds; on-screen text ≤6 words per beat;
no engine-impossible asks (no 30s single clips, no text rendering inside AI video).

## Step 4 — Handoff

- Remotion route → this script's scenes map 1:1 to `descriptor.json` scenes (make-video).
- Clip route → generate each prompt (Magnific `video_generate` / engine of choice), then
  Remotion `<Video>` sequences or `video_concatenate` to stitch; suno-music for the bed.
- Multiple durations requested (e.g. 15s + 30s + 60s cuts) → write the LONGEST first,
  then cut scenes (don't compress narration speed).

## Anti-patterns

Prose screenplays with no timing · prompts that ignore clip length · narration faster
than 2.6 w/s · hooks that start with a logo · "scene 1 establishes…" filler — the hook IS
scene 1 · promising an engine spec you haven't checked this session.
