---
name: make-video
description: |
  One-shot video production pipeline from a single brief. Generates the content (script +
  per-scene images, voiceover, music) with the Higgsfield MCP — visuals, voice, and
  native audio from the video engines — assembles it into the `remotion-video` project
  as a new timeline composition with one command, opens it in Remotion Studio for
  editing, QA's it with the remotion-video-review skill, and renders the final MP4.

  Key-free: works with the already-connected engines — no remotion-superpowers plugin
  keys or /setup required.

  Triggers:
  - "make a video", "produce a video", "create a video", "video production"
  - "/make-video", "generate then edit a video", "full video from a brief"
---

# make-video — generate → assemble → edit → render

A complete short-video pipeline driven by the brief the user gives. Use the **defaults**
below and only ask if the brief itself is missing — never interrogate with many questions.
State what you picked; the user can override.

## Defaults (override only if the brief says so)

- **Format:** vertical 9:16, 1080×1920 (matches the template; `Root.tsx` hardcodes this).
- **Style:** AI image slides + Ken-Burns motion + blur transitions (fast, cheap).
- **Audio:** voiceover + word-synced captions + low-volume music bed.
- **Length:** 6–8 scenes (~40–70s of narration).
- **Target:** `remotion-video/`, assets under `public/content/<slug>/` (kebab-case slug).

## Engine routing (which tool for what)

| Asset | Engine | Notes |
|---|---|---|
| Scene images | **Higgsfield** `generate_image` (`soul_2` people/UGC · `nano_banana_pro` graphics/4K) | `aspect_ratio: "9:16"`; append `vertical composition, cinematic lighting, high detail, no text, no watermark` |
| Video clips (if brief asks) | **Higgsfield** `generate_video` (`kling3_0_turbo` fast · `seedance_2_0` identity) | `get_cost:true` preflight; pricier/slower than slides |
| Voiceover | **ElevenLabs MCP** `text_to_speech` if keyed (word timestamps!) → else **Higgsfield** `generate_audio` + `list_voices` | Check with a cheap call first; 401 = no key |
| Music/soundtrack | **Native from the video engine** — `kling3_0`/Veo-class generate audio with the clip (pass `generate_audio` when the model declares it); slide-route beds via Higgsfield `generate_audio` | suno-music exists but is out of the default chain for now |
| Stock b-roll | **Magnific** `stock_search`/`stock_download` (if connected) | Higgsfield has no stock search |
| QA / review | **remotion-video-review skill** + **virality_predictor** (higgsfield-studio) | Frame review, then virality score before posting |

Higgsfield chaining: a completed `job_id` is a valid `medias[].value` for the next tool
(image job → video keyframe); poll `job_display` for result URLs, curl them into the
project. Full plumbing rules live in the **higgsfield-studio** skill.

## Phase 1 — Content

1. **Script.** From the brief write `shortTitle` (2–4 punchy words for the intro card) and
   6–8 scenes, each: `text` (1–2 tight spoken sentences, hook first) + `imageDescription`
   (vivid, vertical, no text in image).
2. **Generate per scene** into `remotion-video/public/content/<slug>/`:
   - image → `images/<uid>.png` (one uuid per scene — `python3 -c "import uuid;print(uuid.uuid4())"`)
   - voiceover of `text` → `audio/<uid>.mp3`
3. **Music bed** → run the suno-music script (background) →
   `public/content/<slug>/audio/music.mp3`.

## Phase 1b — Caption timing (priority order)

1. **ElevenLabs** TTS-with-timestamps (character alignment comes back with the audio).
2. Timestamps from Magnific `audio_tts` response, if present.
3. Local Whisper: `whisper audio/<uid>.mp3 --model base --word_timestamps True --output_format json`.
4. **Fallback:** distribute per-character times proportionally across the clip duration
   (get duration: `npx tsx -e "import{getAudioDurationInSeconds}from'@remotion/media-utils';..."`,
   or `afinfo audio/<uid>.mp3 | grep duration` on macOS).

## Phase 2 — Assemble (one command)

Write `descriptor.json` in this exact shape (`src/lib/types.ts` `StoryMetadataWithDetails`):

```json
{
  "shortTitle": "WHY VENUS BURNS",
  "content": [
    {
      "text": "Venus wasn't always hell.",
      "imageDescription": "…prompt used…",
      "uid": "<uuid>",
      "audioTimestamps": {
        "characters": ["V","e","n","u","s", "…"],
        "characterStartTimesSeconds": [0.0, 0.05, "…"],
        "characterEndTimesSeconds": [0.05, 0.11, "…"]
      }
    }
  ]
}
```

Then build the timeline (validates assets + timestamps, prints slide/chunk counts):

```bash
cd remotion-video
npx tsx cli/build-timeline.ts <slug>
```

`Root.tsx` auto-discovers `public/content/*/timeline.json` → composition `<slug>` appears
automatically. Add the music bed in `src/components/AIVideo.tsx` (auto-trimmed to length):

```tsx
<Audio src={staticFile(`content/${id}/audio/music.mp3`)} volume={0.18} />
```

## Phase 3 — Edit & QA

1. Start Studio via `preview_start` (`remotion-studio` config, port 3020); open `<slug>`.
2. Run **remotion-video-review** (`sample-frames.sh <slug> auto 8` → Read frames → critique).
3. Fix in `timeline.json` (pacing: `startMs`/`endMs`) or components — known template gotchas:
   background not filling the frame (`Background.tsx` → `objectFit: "cover"`, 100% w/h),
   caption position/contrast (`Subtitle.tsx`).
4. Re-review until clean (cap ~3 loops unless asked).

## Phase 4 — Render

```bash
cd remotion-video
npx remotion render src/index.ts <slug> out/<slug>.mp4
```

Verify the file exists and report its path; offer a Studio screenshot as proof.

## Notes

- Cost: cents per image/voice call + ~10–12 Suno credits for music.
- If the brief is missing, ask once: "What's the video about?" Then run with defaults.
- Non-9:16 formats: change `width`/`height` in `Root.tsx` AND the image-generation aspect.
- Companion skills: `suno-music` (music), `remotion-video-review` (QA).
