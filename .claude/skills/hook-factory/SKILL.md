---
name: hook-factory
description: |
  Engineer scroll-stopping hooks — the first 3 seconds / first line that every algorithm
  actually ranks on (watch completion, sends, retention). A library of named hook
  mechanisms with the psychology behind each, per-format adaptation (Reel spoken+text,
  carousel slide 1, caption first line, ad primary text, blog title/H1, email subject),
  batch generation with scoring, and validation via Higgsfield's virality_predictor and
  the Meta Ad Library. Feeds video-script, platform-content, and meta-ads-pro.

  Triggers:
  - "hook", "opening line", "first 3 seconds", "make it scroll-stopping", "title ideas"
  - "10 hooks for", "why is retention low", "/hook-factory", "thumbnail text"
---

# hook-factory — the first 3 seconds are the product

Every algorithm ranks on what the hook controls: completion (IG watch time), the 50%
midpoint (FB), sends ("watch this"), CTR (ads/titles). A great video with a weak hook
performs like a weak video. So hooks get engineered separately, in batches, and tested.

## The mechanism library (name the mechanism when you deliver)

| Mechanism | Pattern | Psychology | Example shape |
|---|---|---|---|
| **Curiosity gap** | Withhold the payload | Open loop demands closing | "The pricing mistake 90% of agencies make" |
| **Pattern interrupt** | Visually/verbally wrong-footed start | Novelty spikes attention | Start mid-action, unexpected object, silence |
| **Callout** | Name the exact viewer | Self-relevance filter | "If you run Meta ads under ₹50k/month—" |
| **Contrarian** | Attack accepted advice | Conflict = attention | "Posting daily is killing your reach" |
| **Stakes/loss** | What it costs to not know | Loss aversion > gain | "This mistake cost us 12 lakh" |
| **Specific number** | Oddly precise detail | Specificity = credibility | "We tested 47 hooks. 3 worked." |
| **Result-first** | Show the after, then rewind | Proof before ask | Final render first, "here's how" |
| **Challenge/bet** | Stake a claim against time | Anticipation loop | "I'll fix this ad in 60 seconds" |
| **Question trap** | Unanswerable-without-watching | Instinctive self-test | "Would your thumbnail survive 0.5s?" |
| **Insider reveal** | Behind-the-curtain framing | Forbidden knowledge | "What ad buyers never post publicly" |
| **Story cold-open** | Drop into scene mid-conflict | Narrative gravity | "The client called at 11pm—" |
| **Before/after tease** | Show gap, promise bridge | Visual proof of change | Split-screen transformation |

Bans: "Ready to…?", "Let's dive in", "In this video…", logo intros, anything the first
2 seconds could lose. Curiosity gap must be REAL (payload delivered) — clickbait is
punished by FB's UTIS survey model and kills sends.

## Per-format anatomy

- **Reel/Short**: three channels at once — spoken line + on-screen text (≤6 words,
  different from spoken) + visual event in frame 1. Payoff must land where promised.
- **Carousel slide 1**: one claim, huge type, visual tension; the swipe is the CTA.
- **Caption line 1**: keyword-bearing (IG SEO) AND curiosity-bearing — it's the preview.
- **Ad primary text + headline**: hook mechanism + one concrete proof element; the first
  125 chars decide.
- **Blog title/H1**: search intent phrase + mechanism (specific number, contrarian).
- **Email subject**: mechanism in ≤7 words; preview text extends, never repeats.

## Workflow

1. **Intake**: topic, audience, format(s), page voice (read `social-pages/<page>/` if
   set), goal metric (completion/sends/CTR).
2. **Batch**: generate **10 hooks minimum** across ≥5 different mechanisms — never 10
   variants of one mechanism.
3. **Score** each 1–5 on: stop-power, audience-match, payload honesty, brand-voice fit.
   Present top 3 with mechanism named + why they should win; full list below.
4. **Validate when possible**:
   - Video: build top hook into the cut → higgsfield-studio `virality_predictor` →
     read the hook-strength axis → iterate weakest part.
   - Ads: `ads_library_search` long-running competitor ads → which mechanisms your
     niche has proven (longevity = performance) → bias the batch, don't copy lines.
   - Organic: A/B across posts, log winners in `social-pages/<page>/performance.md`
     Learnings ("callout hooks 2× sends for this page").
5. Run humanize-copy on final wording (mechanism intact — humanize the words, never
   remove the curiosity gap).

## Retention rescue ("retention is low")

Diagnose in order: hook honesty (payoff missing?) → payload delay (>20% of runtime
before value = cut cold-open) → visual stasis (no change in 2s+) → re-hook missing
(30s+ needs a second open loop mid-way; FB needs its 50% midpoint beat).
