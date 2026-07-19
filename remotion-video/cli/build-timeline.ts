#!/usr/bin/env npx tsx
// build-timeline.ts — rebuild timeline.json from descriptor.json for one story.
//
// Used by the make-video skill (and handy manually) to assemble a composition
// from generated assets without re-running the full AI pipeline in cli.ts.
//
// Usage: npx tsx cli/build-timeline.ts <slug>
//   <slug> = folder name under public/content/ containing descriptor.json
import * as fs from "fs";
import * as path from "path";
import { createTimeLineFromStoryWithDetails } from "./timeline";
import { StoryMetadataWithDetails } from "../src/lib/types";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npx tsx cli/build-timeline.ts <slug>");
  process.exit(1);
}

const dir = path.join(process.cwd(), "public", "content", slug);
const descriptorPath = path.join(dir, "descriptor.json");
if (!fs.existsSync(descriptorPath)) {
  console.error(`No descriptor.json at ${descriptorPath}`);
  process.exit(1);
}

const descriptor = JSON.parse(
  fs.readFileSync(descriptorPath, "utf8"),
) as StoryMetadataWithDetails;

// Basic validation so failures are actionable, not a stack trace.
for (const [i, item] of descriptor.content.entries()) {
  const ts = item.audioTimestamps;
  if (!ts || !ts.characterEndTimesSeconds?.length) {
    console.error(
      `Scene ${i} ("${item.text?.slice(0, 40)}...") has no audioTimestamps — ` +
        `fill characters/characterStartTimesSeconds/characterEndTimesSeconds first.`,
    );
    process.exit(1);
  }
  const img = path.join(dir, "images", `${item.uid}.png`);
  const aud = path.join(dir, "audio", `${item.uid}.mp3`);
  if (!fs.existsSync(img)) console.warn(`warn: missing image ${img}`);
  if (!fs.existsSync(aud)) console.warn(`warn: missing audio ${aud}`);
}

const timeline = createTimeLineFromStoryWithDetails(descriptor);
const outPath = path.join(dir, "timeline.json");
fs.writeFileSync(outPath, JSON.stringify(timeline, null, 2));
console.log(
  `Wrote ${outPath} (${timeline.elements.length} slides, ${timeline.text.length} text chunks)`,
);
