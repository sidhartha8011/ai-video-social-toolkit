import "./index.css";
import { Composition, getStaticFiles, staticFile } from "remotion";
import { AIVideo, aiVideoSchema } from "./components/AIVideo";
import {
  AdTimelineSchema,
  AdVideo,
  adTotalMs,
  adVideoSchema,
} from "./components/AdVideo";
import { FPS, INTRO_DURATION } from "./lib/constants";
import { getTimelinePath, loadTimelineFromFile } from "./lib/utils";

export const RemotionRoot: React.FC = () => {
  const staticFiles = getStaticFiles();
  const timelines = staticFiles
    .filter((file) => file.name.endsWith("timeline.json"))
    .map((file) => file.name.split("/")[1]);
  const ads = staticFiles
    .filter((file) => file.name.endsWith("ad.json"))
    .map((file) => file.name.split("/")[1]);

  return (
    <>
      {ads.map((project) => (
        <Composition
          key={`${project}-ad`}
          id={`${project}-ad`}
          component={AdVideo}
          fps={FPS}
          width={1080}
          height={1920}
          schema={adVideoSchema}
          defaultProps={{ ad: null, project: null }}
          calculateMetadata={async ({ props }) => {
            const res = await fetch(staticFile(`content/${project}/ad.json`));
            const ad = AdTimelineSchema.parse(await res.json());
            return {
              durationInFrames: Math.round((adTotalMs(ad) / 1000) * FPS),
              props: { ...props, ad, project },
            };
          }}
        />
      ))}
      {timelines.map((storyName) => (
        <Composition
          id={storyName}
          component={AIVideo}
          fps={FPS}
          width={1080}
          height={1920}
          schema={aiVideoSchema}
          defaultProps={{
            timeline: null,
          }}
          calculateMetadata={async ({ props }) => {
            const { lengthFrames, timeline } = await loadTimelineFromFile(
              getTimelinePath(storyName),
            );

            return {
              durationInFrames: lengthFrames + INTRO_DURATION,
              props: {
                ...props,
                timeline,
              },
            };
          }}
        />
      ))}
    </>
  );
};
