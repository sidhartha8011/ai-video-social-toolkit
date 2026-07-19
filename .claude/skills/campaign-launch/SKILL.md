---
name: campaign-launch
description: |
  Full-funnel campaign orchestrator: one brief → a complete, coordinated launch kit
  across organic social (IG/FB), short-form video, paid Meta ads, landing copy, and
  email — produced by composing the toolkit's specialist skills in the right order with
  one shared message architecture. Outputs a launch timeline, every asset draft, and a
  measurement plan. For product launches, offers, seasonal pushes, and client campaigns.

  Triggers:
  - "launch campaign", "product launch", "promote <thing> everywhere", "full campaign"
  - "go-to-market content", "launch kit", "/campaign-launch", "campaign for <offer>"
---

# campaign-launch — one brief, one message, every channel

The orchestrator. It produces nothing novel itself — its value is **sequencing the
specialist skills against ONE message architecture** so every asset reinforces the same
campaign instead of being ten disconnected pieces.

## Phase 0 — Brief & message architecture (the spine)

From the user's brief establish: **offer** (what + price/incentive), **audience**,
**page/brand** (read `social-pages/<page>/`), **window** (dates), **budget split**
(organic-only? paid? how much), **one measurable goal** (launch sales, leads, signups).

Then write the spine — 5 lines every asset must serve:
```
PROMISE:   the single transformation/benefit
PROOF:     the strongest evidence (number, demo, testimonial)
ENEMY:     the pain/mistake/status quo being displaced
CTA:       one action, one destination
DEADLINE:  the reason to act now
```
Confirm the spine with the user before production — it's cheaper to fix 5 lines than
40 assets.

## Phase 1 — Research (parallel, fast)

- content-research: what's trending in the niche THIS week (angles to ride).
- hook-factory + `ads_library_search`: which hook mechanisms the niche has proven.
- meta-ads-pro business context if paid is in scope (unit economics gate the budget).

## Phase 2 — Asset production (each via its specialist, spine enforced)

| Asset | Skill chain | Typical kit |
|---|---|---|
| Hero video (30–60s) | video-script → make-video/higgsfield-studio → virality loop | 1 |
| Cutdowns (15s) | video-script (cut from hero, don't compress) | 2–3 |
| Reels/organic posts | platform-content (per-platform, NOT copy-paste) | 3–5 across window |
| Carousel (saves play) | platform-content + `nano_banana_pro` slides | 1–2 |
| Ad creatives | meta-ads-pro creative matrix (UGC video + DTC static + carousel) | 3–5 concepts |
| Landing copy | platform-content website anatomy (answer-first, PAS) | 1 |
| Email(s) | hook-factory subjects + spine body; draft via Gmail MCP if connected | 1–3 |

Every asset: hook from the batch (hook-factory), copy through humanize-copy, videos
through virality_predictor. Same PROMISE/CTA everywhere; hooks vary, spine doesn't.

## Phase 3 — Launch plan (deliverable)

Produce a single launch doc (save to `social-pages/<page>/campaigns/<slug>.md`):
1. The spine.
2. **Timeline**: tease (2–3 days pre) → launch day (hero + ads live) → proof days
   (testimonials/results) → last-call (deadline). Every asset slotted to a day, synced
   with `calendar.md`.
3. All asset drafts (or links to where they live).
4. **Measurement plan**: the goal metric, per-channel proxies (sends/saves organic,
   ROAS/CPA paid, CTR email), check-in days, and kill/scale rules for ads
   (from meta-ads-pro: ≤20% scale steps, fatigue thresholds).
5. Paid: campaigns created PAUSED via meta-ads-pro; user activates on launch day.

## Phase 4 — During flight

Daily-ish: log organic results to `performance.md` (social-manager), watch ad anomalies
(meta-ads-pro), swap fatigued hooks from the reserve batch. Post-campaign: retro —
what the spine got right/wrong → distill into page Learnings.

## Rules

- One spine per campaign. An asset that doesn't serve it gets cut, however good.
- Nothing publishes or activates without explicit user confirmation — this skill
  prepares; the user (or a confirmed step) ships.
- Client pages: the whole kit is a draft package for approval (page.md Constraints).
- State the total production cost estimate (Higgsfield credits, ad budget) up front.
