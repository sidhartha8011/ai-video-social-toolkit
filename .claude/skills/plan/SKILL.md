---
name: plan
description: |
  One small call that plans content for the ACTIVE brand (set via /brand): live trend
  research → ideas scored against pillars + current algorithms → hooks drafted for the
  top picks → a filled calendar week presented for approval. Wraps content-research +
  hook-factory + platform-content format logic + social-manager calendar ops into one
  command.

  Triggers:
  - "/plan", "/plan 2 weeks", "plan content", "plan the week", "what should we post this week"
---

# plan — research → scored ideas → filled calendar, one call

**Scope:** the active brand (`social-pages/.active` — if none, run /brand first).
**Default window:** 1 week (honor "/plan 2 weeks", "/plan month").

## Pipeline (run it all, no pauses except the final approval)

1. **Load context** — active brand's `page.md` (pillars, % mix, cadence, constraints)
   + `performance.md` Learnings + current `calendar.md` (keep unfinished items).
2. **Research** (content-research skill): multi-angle dated sweep for the brand's niche —
   news, trend formats, audience questions, competitor patterns (`ads_library_search`
   where relevant), seasonal (India-aware). 
3. **Score** ideas (content-research's 4 axes: timeliness, algorithm fit, brand fit,
   effort:payoff; drop <12/20). Take enough to fill the window per the brand's cadence,
   pillar-balanced, format-diverse (platform-content's format-by-goal table).
4. **Hooks** (hook-factory): for each slotted idea, 3 candidate hooks (different
   mechanisms), best one pre-selected.
4b. **Visual direction** (video items only): note the intended MODE for the concept board
   — HIGH MOTION / PRODUCT / STORY / GRAPHIC (see video-script's
   concept-board-template.md) — plus intended duration and engine fit
   (`seedance_2_0_mini` >10s/identity · `gemini_omni` ≤10s/ref-driven). This is a NOTE,
   not a generation: the actual concept board + storyboard happen at /produce time,
   each with its own approval gate. Flag that every video needs those two rounds so the
   week's timeline accounts for them.
5. **Write the plan** into `calendar.md` (status: idea) and present the week compactly:
   ```
   Mon · IG Reel · pillar 2 · "<hook>" — why now: <dated trigger> (source)
   Tue · Carousel · pillar 1 · "<hook>" — saves play: <utility angle>
   ...
   Reserve ideas (3): ...
   ```
   Every line carries its "why now", target metric (sends/saves/completion), and — for
   videos — the intended MODE + duration.
6. **One question at the end:** approve as-is / swap items / adjust — then lock
   approved items (status stays `idea` → they move to `drafted` only via /produce).

## Rules

- Research is LIVE (dated queries) — never fill a calendar from memory.
- Respect page constraints and pillar mix; flag any slot that had to break cadence.
- Re-running /plan mid-week: top up remaining slots, never overwrite items already
  drafted/approved.
