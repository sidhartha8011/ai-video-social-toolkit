import { z } from "zod";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";

export const logoOutroSchema = z.object({
  project: z.string(),
  mainDurationInFrames: z.number(),
  outroDurationInFrames: z.number(),
  logoCorner: z.enum(["left", "right"]).default("right"),
});

export const LogoOutro: React.FC<z.infer<typeof logoOutroSchema>> = ({
  project,
  mainDurationInFrames,
  outroDurationInFrames,
  logoCorner,
}) => {
  const base = `content/${project}`;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Main ad video with logo watermark */}
      <Sequence durationInFrames={mainDurationInFrames}>
        <AbsoluteFill>
          <OffthreadVideo src={staticFile(`${base}/main.mp4`)} />
        </AbsoluteFill>
        <AbsoluteFill>
          <Img
            src={staticFile(`${base}/triangle.png`)}
            style={{
              position: "absolute",
              top: 130,
              [logoCorner]: 56,
              width: 108,
              height: "auto",
              // white mark already; soft shadow for legibility on light shots
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55))",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Outro appended at the end */}
      <Sequence from={mainDurationInFrames} durationInFrames={outroDurationInFrames}>
        <AbsoluteFill>
          <OffthreadVideo src={staticFile(`${base}/outro.mp4`)} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
