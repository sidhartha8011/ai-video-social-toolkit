# STEP 1 — CONCEPT BOARD (4-up direction moodboard)

**The first artifact of every video. Always.** Before any storyboard, generate a 2×2 board
of **4 different visual directions** so the user picks the world. Nothing downstream
happens until a frame is chosen.

Model: **`gpt_image_2`**, quality `high`, resolution `2k`, aspect `1:1` (or `4:3`).

## Prompt anatomy

**1. Register header**
> behance / dribbble style design, {year} motion design vibe.

**2. Style-diversity mandate** (the point of the board — 4 DIFFERENT languages)
> pick 4 DIFFERENT random current motion design styles — doesn't have to be 3D, could be
> 2D flat / kinetic typography / abstract liquid / editorial poster / glassmorphic /
> brutalist / collage / etc. something that could be made in After Effects. each of the 4
> elements is a DIFFERENT random visual language — different palette per frame, different
> texture register per frame, different energy per frame. 4 distinct random styles across
> 4 frames, each beautiful in its own way.

**3. Layout lock**
> make a board of 4 elements in one image, 2x2 layout, clean dark or cream background
> between frames.

**4. MODE modifier** — pick ONE per the brief's energy:

| Mode | Text to paste |
|---|---|
| **HIGH MOTION** | `HIGH MOTION mode: lean toward CGI commercial register with powerful kinetic energy, action tier intensity, hyperkinetic vibe (peak-action moments, smash energy, sport / music / fashion-drop / tech-action / AI-reveal flavor). AVOID generic 3D rendered look — that's the AI cliche trap; CGI commercial means cinematic kinetic register, not stock 3D.` |
| **PRODUCT / DTC** | `PRODUCT mode: lean toward premium product-hero register — macro material detail, studio-controlled light, tactile surface, considered negative space, editorial commercial polish. AVOID stock-3D packshot cliche.` |
| **STORY / HUMAN** | `STORY mode: lean toward documentary-warm narrative register — real environments, human presence, natural light, lived-in texture, emotional beat per frame.` |
| **GRAPHIC / TYPO** | `GRAPHIC mode: lean toward editorial poster + kinetic typography register — bold type as the hero, grid tension, print-inspired layout, restrained palette per frame.` |

**5. Brand lean** — one sentence tying it to this specific product/campaign:
> lean additionally toward {campaign energy} for {product}: {motifs, elements, materials,
> flagship-campaign framing}.

## Output & approval gate

1. Generate the 4-up → **show the user**.
2. User picks a frame (TOP-LEFT / TOP-RIGHT / BOTTOM-LEFT / BOTTOM-RIGHT). If they want
   a remix, regenerate with adjusted mode/lean — cheap at this stage.
3. Save to `social-pages/<brand>/drafts/<slug>/concept-board.png`.
4. The **picked frame becomes the FOUNDATION** for the storyboard (step 2) — its palette,
   texture register, and energy get extracted into the Visual World Locks.
5. Pull 3 hex codes from the picked frame for the storyboard's PALETTE LOCK.

## Gold-standard example (roofing-sheet flagship, HIGH MOTION)

> behance / dribbble style design, 2026 motion design vibe. pick 4 DIFFERENT random
> current motion design styles — doesn't have to be 3D, could be 2D flat / kinetic
> typography / abstract liquid / editorial poster / glassmorphic / brutalist / collage /
> etc. something that could be made in After Effects. each of the 4 elements is a
> DIFFERENT random visual language — different palette per frame, different texture
> register per frame, different energy per frame. 4 distinct random styles across 4
> frames, each beautiful in its own way. make a board of 4 elements in one image, 2x2
> layout, clean dark or cream background between frames. HIGH MOTION mode: lean toward
> CGI commercial register with powerful kinetic energy, action tier intensity,
> hyperkinetic vibe (peak-action moments, smash energy, sport / music / fashion-drop /
> tech-action / AI-reveal flavor). AVOID generic 3D rendered look — that's the AI cliche
> trap; CGI commercial means cinematic kinetic register, not stock 3D. lean additionally
> toward storm-proof power for premium roofing sheets: rain, wind, lightning, steel
> impact, elemental protection, flagship campaign energy.
