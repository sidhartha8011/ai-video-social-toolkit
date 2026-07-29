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
2. **Engine** → clip physics (table below). If unstated, pick between the TWO defaults
   by fit: **`seedance_2_0_mini`** (clips >10s, product/identity consistency, audio
   refs) or **`gemini_omni`** (reference-driven realism, v2v, ≤10s). User says
   "budget" → `kling3_0_turbo` (+VO). Premium models only on explicit request.
   Image-slides only when explicitly requested.
3. **Goal** → reach (sends/completion), saves (utility), conversion (CTA) — from
   platform-content's format-by-goal logic.

## Step 2 — Engine physics (what the script must obey)

| Engine | Unit | Clip length | Prompt style | Gotchas |
|---|---|---|---|---|
| **Remotion slides** (make-video pipeline; stills via Higgsfield `generate_image`) | still image + Ken Burns | scene = narration length (4–8s) | Rich still-image prompt: subject, setting, mood, lighting, "vertical 9:16, no text" | Scene duration = voiceover duration; needs audioTimestamps; motion comes from Remotion, not the image |
| **`seedance_2_0_mini`** (DEFAULT for length/identity — verified 2026-07-20) | video clip | **4–15s (request 15)** | Full 8-layer prompt anatomy (below) | NATIVE AUDIO default ON; refs: start/end_image, image/video/audio_references (identity + multi-SKU); genre hints; 480/720p; budget-fast |
| **`gemini_omni`** (DEFAULT for refs/realism ≤10s) | video clip | **4–10s (request 10)** | 8-layer anatomy | NATIVE audio; image_references + video_references (t2v, i2v, **v2v**); 720p; 9:16 ✓ |
| **`kling3_0_turbo`** — ONLY when user says "budget" | video clip | 3–15s | 8-layer anatomy | ⚠️ NO native audio — pair with text2speech_v2 VO; 720/1080p |
| **Premium on request**: `seedance_2_0` (4K/identity), `veo3_1` (ultra-real, 4/6/8s), `kling3_0` (multi-shot/motion-transfer), `cinematic_studio_3_0` (cinema-grade, 4–15s) | video clip | per model | 8-layer anatomy | user asks for premium/4K/cinematic explicitly |
| **Veo-class** (via Higgsfield catalog, `models_explore`) | video clip | 5–8s | One shot per prompt; physical realism, camera grammar ("slow dolly-in, 35mm, golden hour"); native audio on Veo 3.1 | Never script multi-shot sequences in one prompt; verify the model via `models_explore` before promising specs |
| **Marketing Studio video** (product ads) | preset-driven ad | preset-set | No prose prompt needed — product URL + preset + hooks (UGC/Tutorial/Unboxing) | Script the HOOK LINE + beat order, not shots; pass `aspect_ratio:"9:16"` (defaults 16:9!) |
| **Stock** (Magnific `stock_search`, if connected) | found clip | any (trim) | Search keywords, not prose | Script the trim: which 3–5s of the found clip |

**Clip-length rule — MAXIMIZE, don't fragment:** before scripting, get the chosen
model's REAL max duration (`models_explore action=get` — never assume). Then:
**clips = ceil(total ÷ model max)** — the fewest, longest clips the model allows, NOT
many 5s fragments. One 15s clip beats three 5s clips: no seams, continuous motion,
coherent native audio. Only cut where the NARRATIVE needs a hard scene change.
Inside a long single take, choreograph an evolving motion arc (see prompt anatomy) so
there's still visual change every ~2s for retention.
Narration = duration × **~2.3 words/sec** (140 wpm); a 30s VO script is ~70 words — cut
until it fits. Hero loops: script the LOOP (last frame ≈ first frame).

**Video prompt anatomy (use for EVERY clip prompt — 60–120 words, all 8 layers):**
```
[SHOT]    camera move + lens + framing: "slow dolly-in, 35mm, low angle, shallow DOF"
[SUBJECT] specific visual detail: materials, textures, wardrobe — "corrugated steel
          sheet, galvanized shine, rain beading on the ridges"
[ACTION]  the motion ARC across the full clip: start state → beats → end state
          ("rain intensifies; camera pushes past the worker to the roofline; he
          slaps the sheet — water sprays off, roof holds")
[SETTING] place, time of day, weather, atmosphere
[LIGHT]   lighting + grade: "overcast monsoon light, teal-orange commercial grade"
[STYLE]   finish reference: "shot-on-Arri commercial, crisp product detail"
[AUDIO]   native-audio direction: ambience, SFX beats, music mood (audio models only)
[PACING]  where the beat lands: "impact at the midpoint, settle on logo-ready final frame"
```
One continuous shot per prompt — never "scene 1… scene 2…" inside a single prompt.
Repeat subject/style descriptors VERBATIM across clips for consistency (engines have
no memory).

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

## Step 3.5 — STORYBOARD (mandatory — no video generation without it)

Before ANY clip generates, turn the shot table into a **storyboard sheet** per
[storyboard-template.md](storyboard-template.md):
- 1 board = up to 15s = 5 panels × 3s. 30s → 2 boards (1–5, 6–10). Same style/character
  locks VERBATIM on every board of the set.
- Resolve the **reference checklist first** (founder/product/logo images from
  `social-pages/<brand>/assets/` — generate-and-lock missing ones), attach refs to the
  board generation.
- Generate with **`gpt_image_2`** (quality high, 2k, sheet 3:4) → show the user →
  **approval gate** → only then video. Save board(s) to the draft folder.
- Each clip prompt then expands its panel(s) via the 8-layer anatomy, reusing the SAME
  refs (+ the board as image_reference on models that take it).

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
