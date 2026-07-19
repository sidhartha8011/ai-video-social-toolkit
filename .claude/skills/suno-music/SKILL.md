---
name: suno-music
description: |
  Generate high-quality music with Suno (sunoapi.org) and drop it straight into the
  remotion-video project. Combines expert Suno prompt-craft (style-box formula, section
  tags, genre recipes) with a one-call generate → poll → download flow. The API key
  auto-loads from remotion-video/.env; tuned for instrumental background beds for videos,
  but also does full songs with lyrics.

  Prompt-craft adapted (CC0) from bitwize-music-studio's `suno-engineer` skill.

  Triggers:
  - "generate music", "make a track", "background music", "music bed", "score the video"
  - "/suno-music", "suno", "create a song", "instrumental for the video"
---

# suno-music — perfect music via Suno (sunoapi.org)

Produces a finished `.mp3` from a description, using strong Suno prompting + the verified
sunoapi.org API. Default use: instrumental background beds for `remotion-video`.

## Facts (verified — do not rediscover)

- **Key:** auto-loads from `remotion-video/.env` (`SUNO_KEY=...`, gitignored). No export needed.
- **Endpoints:** generate `POST /api/v1/generate` · status `GET /api/v1/generate/record-info?taskId=` ·
  credits `GET /api/v1/generate/credit` (base `https://api.sunoapi.org`, `Authorization: Bearer`).
  The quickstart docs' `/get-credits` path is WRONG — use `/generate/credit`.
- **Models (quality order):** `V5_5 ≥ V5 > V4_5PLUS > V4_5 > V4`. Suno V5/V5.5 is the industry
  quality benchmark. `V4_5` is proven on this key; the script defaults to **V5 and
  auto-falls back to V4_5** if the plan rejects it.
- **Cost:** ~10–12 credits per generation. Each call returns **two variations**
  (`sunoData[0]` and `[1]`); the script downloads `[0]`.
- **Status flow:** `PENDING → TEXT_SUCCESS → FIRST_SUCCESS → SUCCESS` (~60–180s).

## Prompt-craft (this is what makes it "perfect")

**1. V5 is literal.** Say what you want directly — simple, clear prompts beat clever ones.

**2. Style box = the recipe (≤1000 chars).** Order matters:
- **Instrumental (video beds):** `genre, instrumentation, mood, tempo (BPM), production`.
  No vocal words. e.g. `Cinematic ambient, soft piano, warm strings, light percussion, hopeful, 80 BPM, spacious reverb`.
- **With vocals:** put the **voice first** → `Male baritone, gritty, emotional. Heavy rock, distorted guitars, 130 BPM`.

**3. Section tags shape the arrangement** (lyrics box, ≤5000 chars). For instrumentals use
structure tags only: `[Intro]` `[Main Theme]` `[Build]` `[Bridge]` `[Drop]` `[Outro]` `[End]`.

**4. Steer with optional fields:**
- `instrumental: true` for beds (no vocals).
- `negativeTags`: things to avoid (e.g. `"vocals, distortion, lo-fi hiss"`).
- `styleWeight` (0–1, adherence to style), `weirdnessConstraint` (0–1, experimentation),
  `audioWeight` — nudge only if a plain prompt misses.

### Genre quick-recipes (instrumental style-box starters)

| Vibe | Style box |
|------|-----------|
| Cinematic / epic | `Epic cinematic orchestral, soaring strings, brass swells, taiko drums, triumphant, building, 90 BPM` |
| Corporate / uplifting | `Uplifting corporate, bright piano, plucked synths, soft claps, optimistic, clean modern, 110 BPM` |
| Lo-fi / chill | `Lo-fi hip hop, mellow Rhodes, vinyl crackle, laid-back boom-bap, warm, relaxed, 75 BPM` |
| Ambient / calm | `Calm ambient, soft evolving pads, gentle piano, airy textures, peaceful, slow, 70 BPM` |
| Upbeat / energetic | `Upbeat electronic pop, punchy four-on-the-floor, bright synth arps, driving bass, 124 BPM` |
| Tech / explainer | `Modern explainer underscore, minimal pulsing synths, soft arpeggio, subtle percussion, curious, 100 BPM` |

## Generate (one call — run in the BACKGROUND, it polls with sleeps)

```bash
bash .claude/skills/suno-music/scripts/generate-music.sh \
  remotion-video/public/content/<slug>/audio/music.mp3 \
  "Cinematic ambient, soft piano, warm strings, hopeful, 80 BPM" \
  "Explainer Bed"
```
Args: `<out.mp3> <style> [title] [model=V5] [instrumental=true] [prompt-if-vocal]`.
The script prints credits, generates, polls, downloads, and verifies with `ls`.
Want the second variation? Re-poll the printed taskId and take `sunoData[1].audioUrl`.

For lyric songs: write lyrics with section tags as `prompt`, set instrumental `false`.

## Wire into Remotion

Add a full-length, low-volume bed in `src/components/AIVideo.tsx` (Remotion auto-trims to length):
```tsx
<Audio src={staticFile(`content/${id}/audio/music.mp3`)} volume={0.18} />
```
Keep `volume` ~0.15–0.2 under voiceover. Preview with `npm run dev`.

## Troubleshooting

- `SUNO_KEY not set` → create `remotion-video/.env` with `SUNO_KEY=<key>` (never commit).
- Model rejected → the script already fell back to V4_5; results are still good.
- `SENSITIVE`/`FAILED` status → soften the style text (brand names and artist names can trip it).
- Verify a download is real audio: `file <out.mp3>` should say MPEG/ID3, not HTML.

Attribution: prompting principles adapted from bitwize-music-studio/claude-ai-music-skills
`suno-engineer` (CC0-1.0).
