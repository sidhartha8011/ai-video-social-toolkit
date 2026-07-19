# AI Video + Social Content Toolkit (Claude Code)

A working toolkit for producing short-form videos and algorithm-aware social content with
[Claude Code](https://claude.com/claude-code), built around a Remotion project, the
Higgsfield MCP (primary generation engine), and the Suno API.

## What's inside

| Path | What it is |
|------|-----------|
| `remotion-video/` | Remotion "Prompt to Video" project (1080×1920). Compositions auto-discovered from `public/content/<slug>/timeline.json`. Includes `cli/build-timeline.ts` to assemble a composition from generated assets. |
| `.claude/skills/make-video/` | One-shot pipeline: brief → script → images/voice (Magnific) → music (Suno) → assemble → QA → render. |
| `.claude/skills/suno-music/` | Music generation via sunoapi.org with expert Suno V5 prompt-craft (CC0-adapted from bitwize-music's suno-engineer). `scripts/generate-music.sh` = generate → poll → download. |
| `.claude/skills/remotion-video-review/` | Key-free video QA: samples frames with `remotion still`, Claude vision critiques them (a TwelveLabs-free review loop). |
| `.claude/skills/platform-content/` | Algorithm-first content for Instagram / Facebook / websites, with a dated ranking-signal snapshot and a self-refresh rule. |
| `.claude/skills/social-manager/` | Multi-page social management: per-page knowledge bank (voice, pillars, learnings), calendar, performance feedback loop. Routes creation through platform-content. |
| `.claude/skills/video-script/` | Engine-aware, duration-aware video scripts: timed shot tables with paste-ready prompts per engine (Remotion slides, Magnific clips, Veo/Kling-class, Higgsfield), narration timed at ~2.3 words/sec, clip-count math. |
| `.claude/skills/content-research/` | Live web research for new things to post: multi-angle sweep (news, trends, competitors, questions, seasonal), 4-axis scoring, ranked ideas wired into the calendar backlog. |
| `.claude/skills/higgsfield-studio/` | The full digital-marketing suite on the Higgsfield MCP: images (Soul 2, Nano Banana Pro), video (Kling 3.0, Seedance 2.0, Veo-class), Marketing Studio DTC ads + brand kits, Shorts Studio, Personal Clipper, explainers, voice/dubbing, and the Virality Predictor loop. |
| `social-pages/_template/` | Knowledge-bank templates: `page.md` (brand profile), `calendar.md`, `performance.md`. |

## Setup

```bash
cd remotion-video
npm install
npm run dev          # Remotion Studio
```

Secrets (never committed): create `remotion-video/.env`

```
SUNO_KEY=<your sunoapi.org API key>
```

Engines: **Higgsfield MCP** (primary — images/video/ads/virality), Suno API (music).
Optional: Magnific MCP (stock search fallback), ElevenLabs (word-timestamp TTS),
Higgsfield CLI (`npm i -g @higgsfield/cli`).

## Typical flows

- `"make a video about <topic>"` → make-video runs the full pipeline
- `"generate background music, cinematic"` → suno-music
- `"review the render"` → remotion-video-review
- `"create an instagram carousel about <topic>"` → platform-content
- `"onboard <brand> socials"` / `"plan the week"` → social-manager

## Notes

- This workspace's other directories are unrelated projects; the allowlist `.gitignore`
  tracks only the toolkit paths listed above.
- Suno prompting principles adapted from
  [bitwize-music-studio/claude-ai-music-skills](https://github.com/bitwize-music-studio/claude-ai-music-skills) (CC0-1.0).
- Remotion is source-available with its own license terms for companies — see
  [remotion.dev/license](https://www.remotion.dev/license).
