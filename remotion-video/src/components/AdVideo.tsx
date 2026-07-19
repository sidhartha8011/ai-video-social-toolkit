import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { FPS } from "../lib/constants";

const { fontFamily: displayFont } = loadAnton();
const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500", "600", "800"],
  subsets: ["latin"],
});

const AdClipSchema = z.object({
  src: z.string(),
  durationMs: z.number(),
  volume: z.number().default(0.3),
  // Bottom-anchored zoom: > 1 crops the top of the clip (hide bad AI signage etc.)
  scale: z.number().default(1),
});

const AdAudioSchema = z.object({
  src: z.string(),
  startMs: z.number(),
  volume: z.number().default(1),
});

const AdOverlaySchema = z.object({
  text: z.string(),
  sub: z.string().optional(),
  startMs: z.number(),
  endMs: z.number(),
});

const AdCtaSchema = z.object({
  durationMs: z.number(),
  legacy: z.string(),
  headline: z.string(),
  phone: z.string(),
  location: z.string(),
  logo: z.string(),
});

export const AdTimelineSchema = z.object({
  clips: z.array(AdClipSchema),
  audio: z.array(AdAudioSchema),
  overlays: z.array(AdOverlaySchema),
  cta: AdCtaSchema,
});

export type AdTimeline = z.infer<typeof AdTimelineSchema>;

export const adVideoSchema = z.object({
  ad: AdTimelineSchema.nullable(),
  project: z.string().nullable(),
});

export const adTotalMs = (ad: AdTimeline) =>
  ad.clips.reduce((sum, c) => sum + c.durationMs, 0) + ad.cta.durationMs;

const msToFrame = (ms: number) => Math.round((ms / 1000) * FPS);

const asset = (project: string, rel: string) =>
  staticFile(`content/${project}/${rel}`);

const Overlay: React.FC<{ item: z.infer<typeof AdOverlaySchema> }> = ({
  item,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 12 });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "38%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0))",
        }}
      />
      <div
        style={{
          marginBottom: 260,
          width: "86%",
          textAlign: "center",
          transform: `translateY(${(1 - enter) * 60}px)`,
          opacity: enter,
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 84,
            lineHeight: "96px",
            color: "white",
            textShadow: "0 4px 24px rgba(0,0,0,0.85)",
            letterSpacing: 1,
          }}
        >
          {item.text}
        </div>
        {item.sub ? (
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 44,
              marginTop: 18,
              color: "#ffd633",
              textShadow: "0 3px 16px rgba(0,0,0,0.9)",
            }}
          >
            {item.sub}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const CtaCard: React.FC<{ cta: z.infer<typeof AdCtaSchema>; project: string }> = ({
  cta,
  project,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 14 });
  const pulse = 1 + 0.02 * Math.sin((frame / fps) * Math.PI * 2);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#101418",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "84%",
          textAlign: "center",
          opacity: enter,
          transform: `translateY(${(1 - enter) * 40}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
        }}
      >
        <Img
          src={asset(project, cta.logo)}
          style={{ width: "88%", objectFit: "contain" }}
        />
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "#9fb2c1",
            letterSpacing: 2,
          }}
        >
          {cta.legacy}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 96,
            lineHeight: "108px",
            color: "white",
          }}
        >
          {cta.headline}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 58,
            color: "#0b141a",
            backgroundColor: "#25d366",
            borderRadius: 90,
            padding: "26px 64px",
            transform: `scale(${pulse})`,
          }}
        >
          {cta.phone}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 38,
            color: "#c8d4dd",
          }}
        >
          {cta.location}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AdVideo: React.FC<z.infer<typeof adVideoSchema>> = ({
  ad,
  project,
}) => {
  if (!ad || !project) {
    throw new Error("Expected ad timeline to be fetched");
  }

  let cursorMs = 0;
  const clipSequences = ad.clips.map((clip, i) => {
    const from = msToFrame(cursorMs);
    const duration = msToFrame(clip.durationMs);
    cursorMs += clip.durationMs;
    return (
      <Sequence key={`clip-${i}`} from={from} durationInFrames={duration} premountFor={2 * FPS}>
        <AbsoluteFill>
          <Video
            src={asset(project, clip.src)}
            volume={clip.volume}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${clip.scale})`,
              transformOrigin: "50% 100%",
            }}
          />
        </AbsoluteFill>
      </Sequence>
    );
  });

  const ctaFrom = msToFrame(cursorMs);
  const ctaDuration = msToFrame(ad.cta.durationMs);

  return (
    <AbsoluteFill style={{ backgroundColor: "#101418" }}>
      {clipSequences}
      <Sequence from={ctaFrom} durationInFrames={ctaDuration}>
        <CtaCard cta={ad.cta} project={project} />
      </Sequence>
      {ad.overlays.map((o, i) => (
        <Sequence
          key={`overlay-${i}`}
          from={msToFrame(o.startMs)}
          durationInFrames={msToFrame(o.endMs - o.startMs)}
        >
          <Overlay item={o} />
        </Sequence>
      ))}
      {ad.audio.map((a, i) => (
        <Sequence key={`audio-${i}`} from={msToFrame(a.startMs)}>
          <Audio src={asset(project, a.src)} volume={a.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
