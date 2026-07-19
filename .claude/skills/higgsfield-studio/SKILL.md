---
name: higgsfield-studio
description: |
  The ultimate digital-marketing production suite on the Higgsfield MCP — the PRIMARY
  generation engine for this workspace. Covers: social content (images, UGC, avatars),
  video (Kling 3.0 / Seedance 2.0 / Veo-class, motion control, upscale, reframe),
  photo & graphics (Soul 2, Nano Banana Pro 4K/text/infographics, background removal,
  outpaint), Marketing Studio (product-URL → DTC ads, brand kits, UGC hooks), Shorts
  Studio & Personal Clipper (long video → viral vertical clips), explainer videos,
  voice/dubbing, AND the Virality Predictor — score any video's hook strength and
  retention risk BEFORE posting. Includes the generate → predict-virality → fix → re-check
  loop and correct media/job plumbing.

  Triggers:
  - "generate with higgsfield", "make an ad", "product video", "ugc video", "avatar"
  - "check virality", "will this go viral", "viral clips from this video", "shorts from"
  - "infographic", "brand kit", "dubbing", "/higgsfield-studio", "dtc ad", "explainer"
---

# higgsfield-studio — full-stack digital marketing production

Higgsfield is the **primary engine** for all visual generation in this workspace.
Account: Max plan. Always `get_cost:true` preflight on big jobs; check `balance` when a
batch is planned.

## Plumbing rules (get these wrong and nothing works)

- **Web URL media** → `media_import_url` first → pass returned `media_id`. **Local file**
  → `media_upload_widget`. `medias[].value` takes media_id/job_id — **never an https URL**.
- **Chaining**: a completed generation's `job_id` is a valid media value for the next tool
  (image job → video keyframe → virality check).
- **Results**: poll `job_display` / `show_generations`; download final URLs with curl into
  the project when assets are needed locally (e.g. `remotion-video/public/content/`).
- If a tool returns `recovery_tool` → call it immediately, no explaining first.
- **Vertical output**: Marketing Studio defaults to 16:9 — pass `aspect_ratio: "9:16"`
  explicitly for Reels/TikTok/Shorts.
- Unknown model constraints → `models_explore` (action=get/recommend). Never guess params.

## Model routing (defaults, per Higgsfield's own guidance)

| Need | Model | Notes |
|---|---|---|
| Product/commercial image ("DTC Ads") | `marketing_studio_image` | Call it "DTC Ads" to the user, never `ms_image` |
| Portraits, fashion, UGC, editorial | `soul_2` | + `soul_id` for a trained character |
| One-off character/avatar from text | `soul_cast` | |
| 4K, text-in-image, diagrams, **infographics** | `nano_banana_pro` | The graphics workhorse |
| Product/ad video | `marketing_studio_video` | URL flow below |
| Fast text-to-video / animate one image | `kling3_0_turbo` | ~5–10s clips |
| Multi-shot, audio, motion transfer | `kling3_0` | |
| Identity-consistent video | `seedance_2_0` | Audio refs via medias role `audio` |
| YouTube URL → short clips | `clipify` / `personal_clipper_create` | |
| Video virality score | `virality_predictor` | See loop below |

## 🔥 The virality loop (use for every video meant to perform)

1. Produce the video (any route below) — or take the user's upload/URL.
2. `virality_predictor` action=create, medias `[{role:"video", id:<media_id|job_id>}]` →
   dashboard scores: **hook strength, retention risk, engagement, audience response**.
3. Read the weakest axis → fix precisely that (new hook first 3s, tighter cut, re-order
   beats — align with platform-content's algorithm snapshot).
4. Re-generate → re-check. Ship when hook + retention are strong. Cap ~3 loops.
   (`action=preview` + job_id re-opens a past dashboard.)

## Production routes

**Social image/carousel art** → `generate_image` (routing table) with `aspect_ratio`
per platform (1:1 / 4:5 / 9:16). Graphics/infographics → `nano_banana_pro`.
Finish with `remove_background` / `outpaint_image` / `upscale_image` / `reframe` as needed.

**Product ad from a URL** (the money flow): `show_marketing_studio(action='fetch', url=…)`
— `product` = a specific sellable item; `webproduct` = a site/app/SaaS as a whole
(App Store/Play links → webproduct; when unsure omit type). Then follow `next_step` to
`generate_video` — remember `aspect_ratio:"9:16"` for social. UGC presets (UGC, Tutorial,
Unboxing, Product Review, Virtual Try-On) take hooks/settings — list them first.

**Brand kit**: `show_marketing_studio(action='fetch', type='brand_kit', scrap_url=<site>)`
auto-builds colors/fonts/voice from the website → reuse across all ads. Pairs with
social-pages/<page>/page.md (knowledge bank stays the source of truth for voice).

**Reusable character (Soul)**: 5–20 photos → `show_characters(action='train')` (~10 min)
→ use with `soul_2` + soul_id for a consistent brand face across campaigns. Offer
training vs one-off explicitly — never train silently.

**Long video → shorts**: uploaded file → **Shorts Studio** (`shorts_studio_list_presets`
→ `shorts_studio_create`, 4–120s source, 720p, 9:16 default, poll status). YouTube URL →
**Personal Clipper**. Then virality-check the best clips before posting.

**Explainer video**: `get_explainer_presets` → `resolve_explainer_preset` →
`explainer_video`.

**Analyze a reference video** ("make one like this"): `video_analysis_create` → scene-by-
scene prompt breakdown → feed into video-script for our own version. Adapt, never copy.

**Voice/audio**: `list_voices` → `generate_audio` (TTS), `create_voice` (clone),
`voice_change`, `dubbing` (localize a finished video). **Music/soundtrack: prefer NATIVE
audio from the video engine** — `kling3_0` and Veo-class generate audio with the video
(pass `generate_audio`/`sound` only when the model declares it; check `models_explore`);
for slide-based videos needing a bed, use `generate_audio`. (suno-music exists but is
out of the default chain for now.)

**Sites/funnels**: `create_website` → `deploy_website` → `publish_website` for landing
pages tied to campaigns (get user confirmation before publishing anything public).

## Integration with the rest of the toolkit

- **What to post** → content-research · **which page/voice** → social-manager ·
  **copy + algorithm fit** → platform-content · **shot-by-shot script** → video-script
  (Higgsfield engine rows) · **assembly/captions** → remotion-video + make-video ·
  **music** → suno-music · **QA** → remotion-video-review + **virality loop** (this skill).
- Costs: preflight `get_cost` on video jobs; mention credit spend on batches ≥3 jobs.
- Never publish (websites, public posts) without explicit user confirmation.
