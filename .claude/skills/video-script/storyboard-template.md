# Storyboard sheet template (MANDATORY before any video generation)

One board covers **up to 15 seconds = 5 panels × 3s beats**. Longer videos split:
30s → 2 boards (panels 1–5 = 0–15s, panels 6–10 = 15–30s), 45s → 3 boards. Never
generate video without an approved board.

## Board prompt anatomy (all 5 blocks, in order)

**1. Header** — format + layout lock:
> Create a {N}-panel cinematic STORYBOARD sheet for a {duration}-second vertical (9:16)
> {platform} {format} titled "{title}", laid out as a clean numbered grid on a soft cream
> background with a thin caption bar under each panel.

**2. Global style lock** — one sentence, repeated on every board of the set:
> Keep a consistent look across all panels: {photorealistic setting/region}, cinematic
> commercial ad grade, {brand color accents}, {light/mood}.

**3. Character lock** — full description VERBATIM, repeated on every board where they appear:
> Keep the SAME {role} character in the panels where he/she appears — {age, look, facial
> details, wardrobe, setting anchor}; consistent face and build.

**4. Panels** — for each: number, timecode, ONE continuous moment (not a sequence),
mood/light, then the caption:
> Panel {n} ({t0}–{t1}s): {scene — subject, action, composition, light}. Caption:
> "{caption in brand language}"

Panel beats follow the video's hook logic: P1 = hook/problem · P2 = product/hero ·
P3–P4 = trust/proof · P5 = CTA end-card (logo, button graphic, phone/CTA space).

**5. Footer rules** — always verbatim:
> Label each panel with its number and timecode. Storyboard / animatic panel style. No
> misspelled text inside the scenes; keep captions only in the caption bars.

## Generation settings

- Model: **`gpt_image_2`** (best text rendering for caption bars/timecodes)
- `quality: "high"`, `resolution: "2k"`, sheet aspect `3:4` (grid of vertical panels)
- **Attach reference images** via medias (see checklist below)

## Reference checklist (resolve BEFORE generating the board)

List what the board needs and where it comes from — missing refs get created first:

| Ref | Source (in order) |
|---|---|
| Character/founder | `social-pages/<brand>/assets/` photo → else generate once with `soul_cast`/`soul_2` and LOCK it for the whole set |
| Product | brand assets / client photo → else DTC Ads shot |
| Logo / brand mark | brand assets (never generate a logo) |
| Location/texture | optional: real photos of the shop/site |

Same refs are then REUSED for the video clips — board and video stay consistent.

## After the board

1. Show the board to the user → approval gate (cheap fix here, expensive after video).
2. Each video clip prompt = its panel(s) expanded through the 8-layer anatomy; pass the
   SAME reference images (+ the board itself as an image_reference where the model
   supports it) to `seedance_2_0_mini` / `gemini_omni`.
3. Save the board to `social-pages/<brand>/drafts/<slug>/storyboard-{n}.png`.

## Gold-standard example (steel-trader client, 15s — use this as the quality bar; real numbers/city live in the brand folder, never here)

> Create a 5-panel cinematic STORYBOARD sheet for a 15-second vertical (9:16) Instagram
> Reel titled "Iss Monsoon, Chhat Nahi Tapkegi", laid out as a clean numbered grid on a
> soft cream background with a thin caption bar under each panel. Keep a consistent look
> across all panels: photorealistic Indian small-town Assam setting, cinematic commercial
> ad grade, deep navy-blue + amber brand accents, moody monsoon light. Keep the SAME
> founder character in the panels where he appears — a friendly middle-aged Indian
> businessman, neat trimmed beard, dark navy shirt, standing in a steel warehouse with
> stacked wire-rod coils behind him; consistent face and build.
>
> Panel 1 (0–3s): Interior of a modest home during heavy monsoon — rainwater dripping
> through an old rusted tin roof into a steel bucket, damp stained ceiling, worried mood,
> cool blue light. Caption: "Har monsoon yehi kahani?" Panel 2 (3–6s): Hero product shot —
> a newly installed blue + terracotta colour-coated metal roof, rain sheeting cleanly off
> the glossy ribbed sheets, storm sky behind, water repelled. Caption: "Iss baar — Colour
> Coated Roofing." Panel 3 (6–9s): The founder stands in his steel godown, mid-gesture
> talking to camera, warm confident expression, coils of steel behind him. Caption:
> "Tata · Jindal · JSW — sab authorized." Panel 4 (9–12s): The founder again, calm and
> assured, slight smile, hand on a bundle of steel — trust and legacy feel. Caption:
> "1982 se {city} ka bharosa." Panel 5 (12–15s): Clean end-card composition — the
> colour-coated roof under a clearing sky, a bold green WhatsApp call button graphic,
> brand triangle mark, phone number space. Caption: "Aaj hi rate lein — WhatsApp {phone}."
>
> Label each panel with its number and timecode. Storyboard / animatic panel style. No
> misspelled text inside the scenes; keep captions only in the caption bars.
