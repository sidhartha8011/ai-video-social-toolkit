---
name: social-manager
description: |
  Manage one or many social media pages/brands with a file-based knowledge bank. Each page
  gets a profile (voice, audience, pillars, goals), a content calendar, and a performance
  log with distilled learnings. All content creation is routed through the
  platform-content skill so every post is on-brand (knowledge bank) AND on-algorithm
  (current ranking signals). Includes a performance feedback loop: log results, distill
  learnings, and feed them into the next piece.

  Triggers:
  - "manage my page", "add a page/brand", "onboard <brand> socials", "social media manager"
  - "content for <page>", "plan the week/calendar", "what should <page> post"
  - "log performance", "how did the post do", "/social-manager"
---

# social-manager — multi-page social media management

Knowledge bank lives at **`social-pages/<page-slug>/`** (project root):

```
social-pages/
├── _template/            ← blank templates (page.md, calendar.md, performance.md)
└── <page-slug>/
    ├── page.md           ← identity, voice, audience, pillars, goals, constraints
    ├── calendar.md       ← planned + backlog content, status flow
    ├── performance.md    ← post log + distilled learnings (the page's memory)
    └── assets/           ← optional: logos, brand imagery, reference posts
```

**Cardinal rule: never create content for a page without first reading its `page.md`
AND the Learnings section of `performance.md`.** If no knowledge-bank entry exists for
the page mentioned, offer to onboard it first.

## Operations

### 1. Onboard a page (`add page`, "manage <brand>")
1. Copy the three `_template/` files into `social-pages/<page-slug>/`.
2. Fill `page.md` from what the user tells you + anything already known (check memory for
   existing brand canon — brand tokens, client style notes).
3. Ask ONE consolidated question for critical gaps only (voice, audience, goal, cadence) —
   not an interrogation. Mark the rest TBD.
4. Confirm the profile back in a short summary table.

### 2. Create content ("content for <page>", "what should X post")
1. Read `page.md` + `performance.md` Learnings (+ calendar for planned slots).
2. Invoke the **platform-content** skill for the actual creation — pass it the page's
   voice, audience, pillar, goal, and learnings as context. platform-content owns the
   algorithm side (including its freshness refresh); this skill owns the brand side.
3. Apply page constraints LAST as a hard filter (banned claims, approval notes).
4. Save drafts into `calendar.md` (status: drafted) with the hook + full copy, and tell
   the user where it landed. Assets: route to higgsfield-studio (images/video/ads/avatars)
   / make-video / suno-music as needed; virality-check videos before they ship.

### 3. Plan a calendar ("plan the week/month")
1. Read pillars + % mix from `page.md`, cadence from Platform notes, learnings from
   `performance.md`.
2. Fill `calendar.md`: pillar-balanced, format-diverse (respect platform-content's
   format-by-goal table), one clear goal per post. Batch-friendly ordering (e.g. all
   Reels shot together).
3. Multi-page mode: do this per page; flag conflicts (same-day competing launches) and
   reuse angles across pages ONLY as adaptations, never copy-paste.

### 4. Log performance ("the reel got 12k reach", "log this week")
1. Append a row to the `performance.md` post log with whatever metrics the user gives
   (reach, saves, sends, completion — sends & saves matter most on IG; retention on FB).
2. **Distill:** if a pattern emerges (2+ posts confirming), add/update a bullet in
   Learnings; move disproven ones to "Doesn't work". Keep Learnings ≤10 bullets.
3. Suggest ONE concrete adjustment to the calendar based on the new data.

### 5. Status ("where are we", "what's pending")
Read all pages' `calendar.md` → report drafted/approved/scheduled counts, gaps vs
cadence, and the next 3 actions.

## Multi-page hygiene

- Every page keeps its own voice — never let brands bleed into each other.
- When the user says "post about X" without naming a page and multiple pages exist,
  ask which page (one question) unless context makes it obvious.
- Client pages with approval flows (see page.md Constraints): output is always a DRAFT
  for approval, never "publish this now".

## What this skill does NOT do

- It does not publish. Organic posting is manual (Meta Ads MCP is for paid campaigns).
- It does not invent metrics — performance rows only from user-provided or tool-fetched data.
- It does not override platform-content's algorithm guidance — brand voice adapts THE HOW,
  the algorithm decides THE FORMAT.
