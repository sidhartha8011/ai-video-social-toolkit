---
name: content-research
description: |
  Research NEW things to post — fresh, trending, and seasonally relevant content ideas for
  a page/brand/niche, grounded in live web research (never stale training data). Runs a
  multi-angle sweep (news, trends, competitor moves, audience questions, seasonal hooks),
  scores ideas against the page's pillars and current platform algorithms, and delivers a
  ranked, ready-to-produce idea list wired into the social-pages calendar backlog.

  Triggers:
  - "what should we post", "content ideas", "research trends", "what's trending in <niche>"
  - "new things to post", "fill the backlog", "content research", "/content-research"
---

# content-research — find new things to post (grounded, not guessed)

**Cardinal rule: ideas come from LIVE research.** Training data is months old; trends die
in weeks. Every run does real WebSearch sweeps dated to the current month. Never present
a remembered trend as current.

## Step 1 — Frame

Establish: **niche/page** (read `social-pages/<page>/page.md` if it exists — pillars,
audience, banned topics) · **platform(s)** · **how many ideas** (default 10).
If no page profile: ask one question for the niche, then proceed.

## Step 2 — Multi-angle sweep (WebSearch, current month in every query)

Run 3–5 of these angles — each is blind to the others, which is what surfaces
non-obvious ideas:

| Angle | Query shape |
|---|---|
| **News/moments** | `<niche> news <month year>` — react-able events, launches, rulings |
| **Trend formats** | `instagram reels trends <month year>`, `trending audio formats` — formats to ride |
| **Audience questions** | `<niche> reddit questions`, `people also ask <core topic>` — real pain points |
| **Competitor/peer scan** | `best <niche> instagram accounts viral posts <year>` — what's working for others (adapt, never copy) |
| **Seasonal/calendar** | next 4–6 weeks: holidays, industry dates, local events (user's market: India — include IST-relevant moments) |
| **Evergreen gaps** | `<niche> beginner mistakes / myths / checklist` — save-magnet utility topics |

Skim results for SPECIFIC ideas, not category labels. "Post about AI" is not an idea;
"React to <named event this week> with a 20s take" is.

## Step 3 — Score and rank

Score each idea 1–5 on four axes, drop anything under 12/20:
- **Timeliness** — is there a reason to post this THIS week?
- **Algorithm fit** — does it map to a winning signal (sends/saves/completion — per
  platform-content's current snapshot)?
- **Brand fit** — pillar match, voice match, constraint-clean (check page.md)?
- **Effort:payoff** — can our stack produce it well (Magnific/Remotion/suno) at its worth?

## Step 4 — Deliver

For each ranked idea output:
```
#N <IDEA — one specific line>
   Why now: <the dated trigger — event/trend/season, with source>
   Format: <reel/carousel/post/blog — per algorithm fit>  ·  Pillar: <#>
   Hook draft: "<first-line/first-3s hook>"
   Production: <one line: which engine/skill makes it — video-script → make-video, platform-content, etc.>
```
End with **Sources** (markdown links to what you actually used).

Then: append the ideas to `social-pages/<page>/calendar.md` **Backlog** (status: idea) if
the page exists; offer to produce the top pick immediately (video-script for videos,
platform-content for posts/carousels/blog).

## Cadence & hygiene

- Re-run weekly per active page (trends decay); mark stale backlog ideas (>3 weeks old)
  for pruning.
- Competitor scan = pattern-adaptation only. Never plagiarize a creator's content.
- Regulated/sensitive niches (finance, health): flag claims needing verification and
  respect page.md compliance constraints — no invented statistics, ever.
