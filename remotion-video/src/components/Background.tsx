import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FPS, IMAGE_HEIGHT, IMAGE_WIDTH } from "../lib/constants";
import { BackgroundElement } from "../lib/types";
import { calculateBlur, getImagePath } from "../lib/utils";

const EXTRA_SCALE = 0.2;

export const Background: React.FC<{
  item: BackgroundElement;
  project: string;
}> = ({ item, project }) => {
  const frame = useCurrentFrame();
  const localMs = (frame / FPS) * 1000;
  let animScale = 1 + EXTRA_SCALE;

  const currentScaleAnim = item.animations?.find(
    (anim) =>
      anim.type === "scale" && anim.startMs <= localMs && anim.endMs >= localMs,
  );

  if (currentScaleAnim) {
    const progress =
      (localMs - currentScaleAnim.startMs) /
      (currentScaleAnim.endMs - currentScaleAnim.startMs);
    animScale =
      EXTRA_SCALE +
      progress * (currentScaleAnim.to - currentScaleAnim.from) +
      currentScaleAnim.from;
  }

  const imgScale = animScale;

  const blur = calculateBlur({ item, localMs });
  const maxBlur = 25;

  const currentBlur = maxBlur * blur;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(getImagePath(project, item.imageUrl))}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "none",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          transform: `scale(${imgScale})`,
          transformOrigin: "center center",
          filter: `blur(${currentBlur}px)`,
          WebkitFilter: `blur(${currentBlur}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
