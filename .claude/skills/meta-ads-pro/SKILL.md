---
name: meta-ads-pro
description: |
  Audit, build, and optimize Meta (Facebook + Instagram) ad campaigns using the connected
  Meta Ads MCP. Persists per-account business context so every later run is smarter.
  Covers: read-only account audits (structure, pixel/CAPI health, benchmarks, opportunity
  score), competitor research via the Meta Ad Library, campaign/ad-set/ad creation with
  2026 best practices (Advantage+, creative diversification), A/B experiments, and the
  creative pipeline via higgsfield-studio (DTC Ads, UGC video). Audit never mutates;
  every mutation needs explicit user confirmation.

  Triggers:
  - "audit my meta/facebook ads", "create a campaign", "meta ads", "ad set", "boost"
  - "competitor ads", "ad library", "scale the ads", "why is CPA up", "/meta-ads-pro"
---

# meta-ads-pro — Meta advertising on the connected MCP

Architecture adapted from NotFair's meta-ads skills (audit/manage split, persisted
context). Tools: the `ads_*` MCP toolset (load via ToolSearch — search "ads_" for the
catalog; key ones named below).

## Hard rules

- **Audit = read-only.** Creation/updates (`ads_create_*`, `ads_update_entity`,
  `ads_activate_entity`, budget changes) happen ONLY after showing the user exactly what
  will be created/changed and getting a yes. Create paused, activate as a separate
  confirmed step.
- **Money = the user's.** Never invent performance numbers; every metric cited comes from
  an insights call. State spend implications of every recommendation.
- Errors → `ads_get_errors`; preview before launch → `ads_get_ad_preview`.

## Business context (the compounding asset)

Persist to `social-pages/_meta/<account-id>/business-context.json`:
`{business_name, industry, website, services[], target_audience, brand_voice, offers[],
unit_economics{aov, margin, ltv}, funnel_events{tof, mof, conversion},
pixel_health{pixel_id, capi_enabled, emq}, personas[{name, pains[], creative_angles[],
visual_cues[]}], audit_date}`.
Refresh if >90 days old. Every operation reads it first; the first audit creates it
(ask the user for unit economics — never guess AOV/margin). Reuse `social-pages/<page>/`
knowledge where the brand already has a profile.

## Operations

### 1. Audit ("how's my account")
1. `ads_get_ad_accounts` → select account → `ads_get_ad_entities` (campaigns → ad sets →
   ads), insights at each level (last 30d), `ads_get_dataset_quality` +
   `ads_get_dataset_stats` (pixel/CAPI health — EMQ matters), `ads_get_opportunity_score`,
   `ads_insights_industry_benchmark` + `ads_insights_auction_ranking_benchmarks` (context
   for "is this good?"), `ads_insights_anomaly_signal` (what changed).
2. Report: account health score, top 3 fixes ranked by expected impact, structure issues
   (fragmented ad sets, learning-limited), creative fatigue (frequency >2.5, declining
   CTR), pixel/CAPI gaps. Cite numbers. Write business-context.json.

### 2. Competitor research ("what are competitors running")
`ads_library_search` for competitor pages/keywords → catalog their angles, hooks,
formats, longevity (long-running ad = working ad) → feed findings to hook-factory and
the creative matrix. Adapt patterns, never copy creative.

### 3. Build ("create a campaign")
1. Read business context (run mini-audit if missing).
2. Propose ONE structure (2026 defaults): consolidated campaign, Advantage+ placements,
   broad-or-1%-lookalike audiences (`ads_create_custom_audience` for retargeting),
   3–5 diversified creatives per ad set (different concepts, not colorways — UGC video +
   DTC static + carousel; produce via higgsfield-studio, 9:16 + 1:1), budget at
   ~5–10× target CPA per ad set per day for learning exit, correct `promoted_object`.
3. On confirm: `ads_create_campaign` → `ads_create_ad_set` → `ads_create_creative` →
   `ads_create_ad` — **all paused** → preview → confirmed activation.

### 4. Optimize ("CPA is up", "scale this")
Insights + `ads_insights_performance_trend` + anomaly signal → diagnose in order:
delivery (learning-limited? frequency?) → creative (CTR trend by ad; kill fatigued, brief
replacements) → funnel (CAPI/EMQ, landing page) → THEN budget/bids. Scale winners ≤20%
budget steps every 2–3 days (protect learning); duplicate-and-broaden rather than
touching a winning ad set. A/B via `ads_experiment_abtest_create_test` — one variable.

### 5. IG boost ("boost this post")
`ads_get_ig_accounts` → `ads_get_ig_media` → `ads_boost_ig_post` (confirm spend first).

## Creative pipeline

Brief → hook-factory (hooks) → platform-content (copy) → higgsfield-studio (DTC Ads
image / UGC video via Marketing Studio presets; virality-check videos) → upload via
`ads_create_creative`. Name convention: `concept_format_date` so insights stay readable.

## Policy freshness

Meta shifts fast (Advantage+, attribution, formats). If a recommendation hinges on
platform behavior and the knowledge here is >60 days old (see date in repo history),
WebSearch `"meta ads <topic> change <current month year>"` before asserting it.
