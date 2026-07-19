---
name: social-reporting
description: |
  Generate client-ready social media performance reports — weekly or monthly — from the
  page's performance log plus real organic data pulled via the Meta Ads MCP (IG accounts/
  media). Not a metrics dump: leads with narrative (what worked, why, what's next),
  computes the metrics that matter per the current algorithms (sends, saves, completion —
  not vanity likes), compares against the previous period, and ends with next-period
  recommendations that feed the calendar. Output as markdown, a polished Artifact page,
  or docx for email.

  Triggers:
  - "monthly report", "client report", "how did <page> do this month", "social report"
  - "performance summary", "report for <client>", "/social-reporting"
---

# social-reporting — reports clients actually read

A report's job: prove value + set direction. Lead with the story, back it with numbers,
end with the plan. Never a wall of metrics.

## Data gathering (in priority order)

1. **`social-pages/<page>/performance.md`** — the logged post table + Learnings.
2. **Live organic pull** (when the page's IG is linked to the connected Meta account):
   `ads_get_ig_accounts` → `ads_get_ig_media` for the period's posts and their metrics.
   Cross-fill the performance log while you're there (that's the automation win — logs
   stop being manual).
3. **Paid, if running**: meta-ads-pro insights (keep organic and paid CLEARLY separated
   in the report — never blend reach).
4. Gaps: say "not tracked this period" — never estimate or invent a number.

## Report anatomy

```
1. TL;DR (5 lines max): the period's story — headline win, headline problem, next focus.
2. Scorecard vs previous period: followers Δ, reach, engagement rate,
   sends & saves (the algorithm currencies), top format. Arrows, not tables of raw rows.
3. What worked: top 3 posts WITH the why (hook mechanism, format, pillar) — screenshots/
   links. Tie each to a Learning.
4. What didn't: bottom posts + honest diagnosis (weak hook? wrong format? off-pillar?).
5. Algorithm/context notes: any platform changes this period (from platform-content's
   snapshot refresh) that explain shifts — reach drops aren't always our fault, say so
   with evidence.
6. Next period plan: 3–5 concrete moves (from Learnings + content-research), each tied
   to a calendar slot.
```

Tone: plain language for clients (no "sends-per-reach ratio" without a gloss), numbers
rounded, zero filler. Run humanize-copy on the narrative.

## Output formats

- **Markdown** → save to `social-pages/<page>/reports/<YYYY-MM>.md` (always, as the record).
- **Artifact page** → when the user wants a shareable polished version (load
  artifact-design skill first; charts per the dataviz skill if used).
- **docx/pdf** → via the docx/pdf skills when the client expects an attachment; draft the
  send via Gmail MCP (draft only — user sends).

## Cadence & feedback loop

- Monthly full report; optional weekly pulse (TL;DR + scorecard only).
- Every report run MUST end by updating `performance.md` Learnings and proposing
  calendar adjustments to social-manager — a report that doesn't change next month's
  plan is decoration.
- Multi-client: one report per page, never combined; respect page.md constraints
  (client-facing tone, approval flow).
