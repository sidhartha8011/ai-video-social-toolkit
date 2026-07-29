import "./index.css";
import { Composition, getStaticFiles, staticFile } from "remotion";
import { AIVideo, aiVideoSchema } from "./components/AIVideo";
import {
  AdTimelineSchema,
  AdVideo,
  adTotalMs,
  adVideoSchema,
} from "./components/AdVideo";
import { LogoOutro, logoOutroSchema } from "./components/LogoOutro";
import { StaticPost, staticPostSchema } from "./components/StaticPost";
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
      <Composition
        id="ashoka-static-s1-45"
        component={StaticPost}
        fps={30}
        width={1080}
        height={1350}
        schema={staticPostSchema}
        defaultProps={{ project: "ashoka-static-s1" }}
        durationInFrames={1}
      />
      <Composition
        id="ashoka-static-s1-11"
        component={StaticPost}
        fps={30}
        width={1080}
        height={1080}
        schema={staticPostSchema}
        defaultProps={{ project: "ashoka-static-s1" }}
        durationInFrames={1}
      />
      <Composition
        id="ashoka-final-with-outro"
        component={LogoOutro}
        fps={FPS}
        width={1080}
        height={1920}
        schema={logoOutroSchema}
        defaultProps={{
          project: "ashoka-final-with-outro",
          mainDurationInFrames: 450,
          outroDurationInFrames: 262,
          logoCorner: "right" as const,
        }}
        durationInFrames={712}
      />
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
