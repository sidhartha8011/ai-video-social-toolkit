---
name: produce
description: |
  One small call that produces a planned content item for the ACTIVE brand, end to end:
  script → asset generation (Higgsfield images/video with native audio, Remotion
  assembly) → humanize pass → virality check → ready-to-post package saved to the brand
  folder and marked drafted on the calendar. Wraps video-script, platform-content,
  higgsfield-studio, make-video, humanize-copy, and the virality_predictor loop.

  Triggers:
  - "/produce", "/produce next", "/produce monday", "/produce <topic>", "make the next post"
  - "produce the reel", "generate this week's content"
---

# produce — planned item → finished draft, one call

**Scope:** active brand (`social-pages/.active`). **Target:**
- `/produce next` → first calendar item with status `idea` (default when bare).
- `/produce monday` / `/produce <hook fragment>` → that calendar item.
- `/produce <new topic>` → unplanned one-off; add it to the calendar first, then produce.
- `/produce week` → every `idea` item this week, sequentially (state credit cost first).

## Route by format (from the calendar line)

**Reel / video item:**
1. video-script → timed shot table. **Default engine: REAL generated video clips** —
   `seedance_2_0_mini` (>10s clips, identity/product refs, native audio) or
   `gemini_omni` (ref-driven realism, v2v, ≤10s, native audio), chosen by fit;
   "budget" keyword → `kling3_0_turbo`+VO — never photo-slides unless the user explicitly asks for the budget
   slide route (Remotion stills + Ken Burns). Use the item's pre-selected hook
   (hook-factory reserve if it needs alternatives).
2. **Storyboard gate** (mandatory): build the board(s) per video-script's
   storyboard-template.md — refs resolved from brand assets, `gpt_image_2` sheet,
   user approval — never skip to clips.
3. Generate per higgsfield-studio plumbing: images (`soul_2`/`nano_banana_pro`, 9:16) or
   clips at the MODEL'S MAX duration with full 8-layer prompts (`get_cost` preflight;
   fewest-longest-clips rule) — prefer models with NATIVE audio (`kling3_0`/Veo-class,
   pass `generate_audio` when declared); VO (Higgsfield `text2speech_v2`,
   variant elevenlabs, voice via `list_voices`); slide-route beds: native-audio clips
   or user-supplied track;
   assemble → make-video / `build-timeline.ts` when Remotion route.
4. QA: remotion-video-review (frames) → **virality_predictor** → fix weakest axis →
   re-check (cap 2 loops). Attach the final score to the draft.

**Carousel:** platform-content slide architecture → `nano_banana_pro` slide art (4:5) →
caption. **Post/graphic:** platform-content copy + DTC Ads/`nano_banana_pro` visual.
**Blog/web:** platform-content website anatomy.

**Always:** humanize-copy as the final text pass (hook mechanics preserved); brand
constraints from `page.md` applied as the last filter.

## Package & bookkeeping (every item)

1. Save to `social-pages/<brand>/drafts/<date>-<slug>/` — final copy (paste-ready),
   asset files/paths, hook + mechanism, virality score, posting time suggestion.
2. Calendar: item status → `drafted`, link to the draft folder.
3. Present compactly: the content itself + one-line rationale + what approval/posting
   needs (client pages → social-manager op 7 approval flow).

## Rules

- Costs: state Higgsfield/Suno credit spend up front for `/produce week` or any video
  batch; single small items just proceed.
- Never publish — output is always a draft package (posting ops = social-manager op 8).
- A produce call that hits a missing prerequisite (no calendar, no active brand) says so
  in one line and points to /plan or /brand — it doesn't improvise a brandless draft.
