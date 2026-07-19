---
name: video-script
description: |
  Write production-ready video scripts engineered for a SPECIFIC generation engine and a
  SPECIFIC duration. Outputs a timed shot table (scene-by-scene) where every scene carries
  the exact prompt formatted for the target engine (Remotion image-slides, Higgsfield
  Kling/Seedance/Veo-class clips, Marketing Studio ad presets) plus narration timed to
  words-per-second, hooks placed per current platform algorithms, and correct clip-length
  budgeting. The script IS the production plan — make-video or manual generation can
  execute it directly.

  Triggers:
  - "video script", "script for a reel/short/video", "shot list", "storyboard"
  - "script this for kling/seedance/veo/remotion", "30 second script", "/video-script"
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
| **Remotion slides** (make-video pipeline; stills via Higgsfield `generate_image`) | still image + Ken Burns | scene = narration length (4–8s) | Rich still-image prompt: subject, setting, mood, lighting, "vertical 9:16, no text" | Scene duration = voiceover duration; needs audioTimestamps; motion comes from Remotion, not the image |
| **Higgsfield `kling3_0_turbo`** (default clips) | video clip | ~5–10s | Cinematic shot prompt: subject + ACTION verb + camera move (dolly/pan/orbit) + lighting | Fast text-to-video or animate one start-frame; chain a `generate_image` job_id as keyframe for consistency |
| **Higgsfield `kling3_0` / `seedance_2_0`** | video clip | 5–10s | Same, plus dialogue/audio (kling3_0) or identity refs (seedance) | seedance for recurring characters; audio refs via medias role `audio`; `get_cost` preflight |
| **Veo-class** (via Higgsfield catalog, `models_explore`) | video clip | 5–8s | One shot per prompt; physical realism, camera grammar ("slow dolly-in, 35mm, golden hour"); native audio on Veo 3.1 | Never script multi-shot sequences in one prompt; verify the model via `models_explore` before promising specs |
| **Marketing Studio video** (product ads) | preset-driven ad | preset-set | No prose prompt needed — product URL + preset + hooks (UGC/Tutorial/Unboxing) | Script the HOOK LINE + beat order, not shots; pass `aspect_ratio:"9:16"` (defaults 16:9!) |
| **Stock** (Magnific `stock_search`, if connected) | found clip | any (trim) | Search keywords, not prose | Script the trim: which 3–5s of the found clip |

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
AUDIO BRIEF: <native-audio direction per scene for kling3_0/Veo-class — ambience, SFX,
music mood — written INTO the clip prompts; separate bed via Higgsfield generate_audio
only for slide-route videos>
COVER/THUMB: <one still prompt>
```

Rules: every scene has a visual CHANGE (retention); prompts are self-contained (no "same
as before" — engines have no memory; repeat character/style descriptors verbatim for
consistency); VO lines timed to the scene's seconds; on-screen text ≤6 words per beat;
no engine-impossible asks (no 30s single clips, no text rendering inside AI video).

## Step 4 — Handoff

- Remotion route → this script's scenes map 1:1 to `descriptor.json` scenes (make-video).
- Clip route → generate each prompt (Higgsfield `generate_video`, per higgsfield-studio
  plumbing) with NATIVE audio where the model supports it (`kling3_0`/Veo-class), then
  Remotion `<Video>` sequences to stitch; run the finished cut through
  `virality_predictor` before posting.
- Multiple durations requested (e.g. 15s + 30s + 60s cuts) → write the LONGEST first,
  then cut scenes (don't compress narration speed).

## Anti-patterns

Prose screenplays with no timing · prompts that ignore clip length · narration faster
than 2.6 w/s · hooks that start with a logo · "scene 1 establishes…" filler — the hook IS
scene 1 · promising an engine spec you haven't checked this session.
