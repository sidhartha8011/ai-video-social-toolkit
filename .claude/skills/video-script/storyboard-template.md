# STEP 2 — STORYBOARD SHEET (mandatory before any video generation)

Built **FROM the concept frame the user picked** in step 1
([concept-board-template.md](concept-board-template.md)). Never generate video without an
approved board; never build a board without an approved concept.

Model: **`gpt_image_2`**, quality `high`, resolution `2k`. Sheet aspect **9:16** for
vertical reels. Attach the concept board (+ product/character refs) as `medias`.

**Panel math:** 15s → **6 panels** (2×3 grid, 2.5s beats). 30s → 2 sheets (P01–06,
P07–12) with IDENTICAL locks. Cinematic-realistic register may use 5 panels × 3s.

---

## Block order (write every block, in this order)

### 1. Header line
> Generate a designed {duration}s {MODE} brand reel storyboard sheet — {N} panel
> compositions BUILT FROM @Image 1 as foundation, {REGISTER} register.

### 2. FOUNDATION DECLARATION
> BUILD FROM the {TOP-LEFT/…} frame of @Image 1 (a 4-up moodboard) as foundation. The
> picked frame IS the visual world of this storyboard. Ignore the other 3 frames.

### 3. GRID LAYOUT
> {N} panels in 2×3 grid — 2 cols × 3 rows VERTICAL. Sheet aspect 9:16. Panels read
> top-to-bottom, left-to-right: Row1 P01/P02, Row2 P03/P04, Row3 P05/P06. Use a
> {background extracted from foundation register}. Thin 1pt hairline gutters, 12–20px
> gap. NO panel borders inside.

### 4. MIN-TEXT RULE (HR-2) — verbatim
> Any text inside panel frames ≥ cap-height of 'cities' headline baseline (~10-12% panel
> height). Big display headlines + brand wordmark at full scale. Latin sub-labels /
> tracked monospace / faux-data chips STRIPPED.

### 5. REALISM BAN (HR-3) — verbatim, STRICT for highMD only
> REALISM BAN: photoreal humans / documentary cinema register / ARRI Alexa / 35mm grain /
> real-skin texture = STRICTLY BANNED. Use silhouettes / abstract human forms / stylized
> 3D characters (chibi / sculpted / low-poly / designer-toy) / illustrated 2D /
> motion-trace forms / particle-form figures / lit volumetric silhouettes / abstract
> shapes. Tier 4 photographic cinematic register is BANNED in highMD — that's
> productMD-flow exception territory.

> ⚠️ SKIP this block for photoreal/documentary registers (founder-to-camera, real shop
> footage). Those use the cinematic-realistic variant at the bottom of this file.

### 6. MASTER CAMERA DOCTRINE — pick one, paste verbatim

**HYPERKINETIC CHAOS** (highMD default):
> MASTER CAMERA: HYPERKINETIC CHAOS — peak-action moment per panel. Subject at apex of
> motion: mid-jump, mid-splash, mid-shatter, mid-explosion, mid-streak. Camera vocabulary:
> VERTIGO PULL (Hitchcock dolly-zoom) / CRASH-OUT REVEAL (extreme close-up snaps to wide)
> / SHATTER PUSH-THROUGH (camera punches through glass/membrane) / HYPERKINETIC ORBITAL
> SWEEP / DROP-DIVE PAST (vertical plunge) / MATCH-FRAME SWING (pendulum arc) / WHIP-PAN
> SMEAR. Speed ramps + stutter cuts + frame-freeze acceptable. Aggressive parallax
> FG 100% / MG 40% / BG 15%.

Other doctrines: **CONTROLLED PRECISION** (locked-off, slow push, macro rack-focus — for
product/premium), **HANDHELD INTIMATE** (documentary warmth — for story/human).

### 7. PEAK-ACTION MANDATE — verbatim (highMD)
> PEAK-ACTION MANDATE: every panel captures a frozen peak-action moment. NOT idle product
> on void. NOT subject in resting state. Subject MID-action — at the apex of jump, splash,
> explosion, shatter, streak. Frozen peak energy. Camera POV captures the action moment in
> cinematic frame.

### 8. AMBIENT DENSITY MANDATE — verbatim (all registers)
> AMBIENT DENSITY MANDATE: every panel needs at least 2 ambient fill layers behind subject
> (not counting subject itself). Pick 2+ per panel: particle drift (sparks / dust / streak
> particles / atmospheric haze) / background gradient breath (palette saturation cycle) /
> volumetric beam (rim light / god-rays / spot) / surface texture (concrete / sand /
> liquid pool / mirror floor) / foreground depth element (out-of-focus prop in front of
> subject). Pure peak-action on bare void × {N} panels = flat AE-template feel = FAIL.
> Ambient density gives the frame breathing room.

### 9. TEXT-ANCHOR MANDATE
> Use Pattern A text panels = {01, 03, 05}. Other panels are no-text pure peak-action.

Patterns: **A** = odd panels carry text (default) · **B** = first + last only ·
**C** = every panel (typography-led concepts).

### 10. VISUAL-CONCEPT ARC (Visual World Lock) — derive ALL from the picked frame
> SUBJECT LOCK: {hero object, always in-frame}.
> MATERIAL LOCK: {surface, finish, wear, micro-detail}.
> STYLE LOCK: {register + graphic character}.
> PALETTE LOCK (3 hex codes, pulled from foundation world): #XXXXXX ({name}), #XXXXXX
> ({name}), #XXXXXX ({accent}).
> ATMOSPHERE LOCK: {weather, particulate, depth, light behavior}.

### 11. SCENE VARIATION MANDATE
> {N} DIFFERENT peak-action moments within the same {world}. Show {product variants}
> across the reel while keeping the same lighting logic and atmosphere. Use ≥3 distinct
> framings across panels (extreme macro, medium, wide/impact vista).

### 12. CHROME TIER
> Default Tier (b) PANEL-CAPTIONS for {MODE}. Add a top header strip OUTSIDE panels:
> "{DURATION} {MODE} REEL — {CAMPAIGN TITLE}". Add a bottom strip OUTSIDE panels:
> "{KEYWORD / KEYWORD / KEYWORD / KEYWORD}". NO metadata chips inside panel frames.

### 13. PHOTOGRAPHIC FRAME PURITY (Rule 10)
> no document-metadata chips inside panel frames. Chrome in margins outside panels only.

### 14. PANEL CONTENT
Per panel: `P{nn} {t0}–{t1}: {peak-action moment, framing, product variant, camera move}.
Text "{HEADLINE}" or "no text". {ambient layers}.`

### 15. LOCKS recap (final line)
> LOCKS: palette #XXXXXX #XXXXXX #XXXXXX; {CAMERA DOCTRINE}; {subject}; {material};
> {atmosphere}. Direct like a premium flagship motion designer.

---

## Reference checklist (resolve BEFORE generating)

| Ref | Source (in order) |
|---|---|
| **Concept board** | step 1 output — REQUIRED, it's the foundation |
| Product | brand assets / client photo → else DTC Ads shot |
| Character (realistic register only) | `social-pages/<brand>/assets/` → else generate once with `soul_cast`/`soul_2` and LOCK |
| Logo / brand mark | brand assets (never generate a logo) |

Same refs + the approved board are REUSED for the video clips — one consistent world.

## After the board

1. Show the sheet → **approval gate** (cheap to fix here, expensive after video).
2. Each clip prompt = its panel(s) expanded via the 8-layer anatomy, carrying the LOCKS
   verbatim; pass the same refs + board as image_reference to `seedance_2_0_mini` /
   `gemini_omni`.
3. Save to `social-pages/<brand>/drafts/<slug>/storyboard-{n}.png`.

---

## Gold-standard example — HIGH MOTION register (6-panel, roofing flagship)

> Generate a designed 15s High Motion brand reel storyboard sheet — 6 panel compositions
> BUILT FROM @Image 1 as foundation, HYPERKINETIC CHAOS register.
> **FOUNDATION DECLARATION:** BUILD FROM the TOP-LEFT frame of @Image 1 (a 4-up
> moodboard) as foundation. The picked frame IS the visual world of this storyboard.
> Ignore the other 3 frames.
> **GRID LAYOUT:** 6 panels in 2×3 grid — 2 cols × 3 rows VERTICAL. Sheet aspect 9:16.
> Panels read top-to-bottom, left-to-right: Row1 P01/P02, Row2 P03/P04, Row3 P05/P06. Use
> a stormy industrial background extracted from foundation register (dark turbulent
> cloud-void + wet steel particulate). Thin 1pt hairline gutters, 12–20px gap. NO panel
> borders inside.
> …[MIN-TEXT RULE · REALISM BAN · HYPERKINETIC CHAOS DOCTRINE · PEAK-ACTION MANDATE ·
> AMBIENT DENSITY MANDATE · TEXT-ANCHOR Pattern A {01,03,05}]…
> **VISUAL-CONCEPT ARC:** SUBJECT LOCK: premium corrugated / ribbed metal roofing sheets
> as hero object, always in-frame. MATERIAL LOCK: wet brushed steel + impact dents + sharp
> machined edges, water beading, grit, micro-scratches. STYLE LOCK: premium industrial
> storm-proof power; graphic punch, kinetic debris, lightning energy, high-contrast.
> PALETTE LOCK: #0B1624 (storm navy), #8E98A2 (steel gray), #D8E400 (electric
> storm-accent). ATMOSPHERE LOCK: violent rain + wind shear + lightning flash + flying
> stone/metal particulate; oppressive storm sky depth.
> **SCENE VARIATION:** 6 DIFFERENT peak-action moments within the same storm-industrial
> world. Show multiple premium roofing colors (graphite, deep blue, forest green,
> terracotta red, silver) with the same lighting logic. ≥3 distinct framings.
> **CHROME:** top strip "15s HIGH MOTION REEL — STORM-PROOF ROOFING: COLOR GAUNTLET";
> bottom strip "KINETIC / INDUSTRIAL / RAIN-SHEAR / LIGHTNING IMPACT".
> **PANELS:** P01 00.0–02.5 extreme macro graphite rib edge with water beads, snap to
> sheet mid-slam like a shield catching debris. Text "STORM-PROOF." · P02 02.5–05.0
> vertical plunge past stacked deep-blue and silver sheets mid-tumble in a wind vortex, no
> text · P03 05.0–07.5 forest-green sheet collides with flying stone, camera punches
> through bursting rain membrane, stone fractures, sheet holds. Text "DEFY IMPACT." · P04
> 07.5–10.0 terracotta-red sheet spirals through a debris wind tunnel, hyperkinetic
> orbital sweep, no text · P05 10.0–12.5 five sheets fan outward like armor petals with a
> vertigo pull. Text "COLOR ARMORED." · P06 12.5–15.0 silver hero sheet slams into
> protective canopy over swirling rain core, lightning forks behind, freeze-frame closer.
> Text "BUILT TO ENDURE."
> **LOCKS:** palette #0B1624 #8E98A2 #D8E400; HYPERKINETIC CHAOS; premium corrugated metal
> sheets; wet brushed steel; rain, wind shear, lightning and debris. Direct like a premium
> flagship motion designer.

## Variant — CINEMATIC-REALISTIC register (5-panel × 3s, human/founder led)

Skip the REALISM BAN; use CONTROLLED PRECISION or HANDHELD INTIMATE; keep character lock
verbatim across panels; captions in caption bars under panels.

> Create a 5-panel cinematic STORYBOARD sheet for a 15-second vertical (9:16) Instagram
> Reel titled "{title}", laid out as a clean numbered grid on a soft cream background with
> a thin caption bar under each panel. Keep a consistent look across all panels:
> {photorealistic setting/region}, cinematic commercial ad grade, {brand accents}, {mood}.
> Keep the SAME {role} character in the panels where they appear — {age, features,
> wardrobe, setting anchor}; consistent face and build.
> Panel 1 (0–3s): {hook/problem scene}. Caption: "{line}" … Panel 5 (12–15s): {end-card —
> product, CTA button graphic, brand mark, contact space}. Caption: "{CTA}"
> Label each panel with its number and timecode. Storyboard / animatic panel style. No
> misspelled text inside the scenes; keep captions only in the caption bars.
