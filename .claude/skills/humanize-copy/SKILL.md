---
name: humanize-copy
description: |
  Strip AI-generated writing patterns from any copy — captions, scripts, blogs, emails,
  ad text — so it reads like a human wrote it. Runs as the final polish pass on
  everything the content skills produce. Detects and rewrites: inflated symbolism,
  promotional puffery, rule-of-three overuse, em-dash abuse, AI vocabulary, negative
  parallelisms, vague attributions, filler — then adds actual voice (opinions, rhythm
  variation, mess) matched to the brand or a writing sample.

  Adapted from blader/humanizer (MIT), based on Wikipedia's "Signs of AI writing".

  Triggers:
  - "humanize", "sounds like AI", "make it natural", "de-AI this", "polish the copy"
  - "/humanize-copy", "final pass", "does this sound human"
---

# humanize-copy — kill the AI tells, add a pulse

Two jobs, in order: **(1) remove AI patterns, (2) add voice.** Clean-but-sterile is
still slop. Rewrite, never just delete — the result covers everything the original did,
at roughly the same length.

## Pass 1 — AI tells to hunt (rewrite each on sight)

**Vocabulary** — delve, tapestry, landscape (abstract), leverage, robust, seamless,
pivotal, foster, testament, boast, vibrant, crucial, comprehensive, "in today's
fast-paced world", "digital age", game-changer, unlock, elevate, journey (metaphorical),
dive into, navigate (abstract), realm, harness, unleash. → Say the plain thing.

**Structures**
- **Rule of three everywhere** ("fast, reliable, and secure") → vary counts; one strong
  item beats three weak ones.
- **Negative parallelism** ("It's not just X, it's Y" / "more than a tool") → state Y.
- **Inflated symbolism** ("stands as a testament to", "underscores its commitment") →
  the fact, minus the ceremony.
- **-ing analysis tails** ("...highlighting the importance of", "...showcasing") → new
  sentence or cut.
- **Vague attribution** ("experts say", "many believe", "studies show" unsourced) →
  name the source or own the claim.
- **Em-dash chains** — more than ~1 per paragraph → commas, periods, parentheses.
- **Filler frames** ("It's worth noting that", "In conclusion", "Ultimately", "At the
  end of the day") → cut; start where the point starts.
- **Uniform paragraph/sentence rhythm** (every sentence 15–20 words, every para 3
  sentences) → break the meter.
- **Both-sides hedging on everything** → commit where the author would commit.

**Platform-specific tells** (this workspace's content): captions that open "Ready to
X?"/"Let's dive in", every carousel slide ending in an exclamation, CTAs stacked with
emoji triplets, "Save this for later! 🔖✨" formulae. One CTA, one register.

## Pass 2 — voice (only where a human voice belongs)

Marketing/social/blog: yes. Legal, spec, reference text: neutral IS the human voice —
stop after pass 1.

- **Match the brand:** read `social-pages/<page>/page.md` voice section, or any writing
  sample the user provides — mirror its sentence lengths, word register, punctuation
  habits, recurring tics. Don't "upgrade" their casual words.
- **Have a take.** React to facts, don't just report. Uncertainty ("honestly not sure
  this matters, but") is human.
- **Vary rhythm.** Short. Then a longer one that takes its time. 
- **Let mess in.** An aside, a tangent, a parenthetical — sparingly.
- **Cut the last sentence** if it's a summary of what was just said. It usually is.

## Process

1. Scan → list the violations found (pattern: instance) — brief, grouped.
2. Rewrite in the author/brand voice.
3. Re-scan your own rewrite once (AI rewrites reintroduce AI patterns).
4. Deliver: the clean text first, then a 3–5 line "what changed" note.

## Integration

- Auto-apply as the LAST step of platform-content, social-manager drafts, video-script
  VO lines, and meta-ads-pro ad copy — no need to be asked.
- Keep hooks intact: a hook engineered by hook-factory keeps its mechanics (curiosity
  gap, specificity); humanize the wording, not the mechanism.

Attribution: pattern taxonomy adapted from blader/humanizer (MIT), rooted in
Wikipedia's "Signs of AI writing" (WikiProject AI Cleanup).
