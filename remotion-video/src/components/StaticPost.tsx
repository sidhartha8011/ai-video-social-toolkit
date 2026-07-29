import { z } from "zod";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const staticPostSchema = z.object({
  project: z.string(),
});

const NAVY = "#0a2138";
const AMBER = "#F5B531";
const GREEN = "#25D366";

export const StaticPost: React.FC<z.infer<typeof staticPostSchema>> = ({
  project,
}) => {
  const base = `content/${project}`;
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Hero photo, full bleed */}
      <AbsoluteFill>
        <Img
          src={staticFile(`${base}/hero.png`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 42%" }}
        />
      </AbsoluteFill>

      {/* Scrim for legibility */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(6,20,35,0.55) 0%, rgba(6,20,35,0.10) 26%, rgba(6,20,35,0.48) 52%, rgba(6,20,35,0.94) 72%, ${NAVY} 100%)`,
        }}
      />

      {/* Top bar: logo + legacy pill */}
      <div
        style={{
          position: "absolute",
          top: 54,
          left: 56,
          right: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Img
            src={staticFile(`${base}/triangle.png`)}
            style={{ width: 62, height: "auto", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
          />
          <span
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 1.2,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            ASHOKA STEELS
          </span>
        </div>
        <div
          style={{
            backgroundColor: AMBER,
            color: NAVY,
            fontSize: 28,
            fontWeight: 800,
            padding: "12px 24px",
            borderRadius: 12,
            letterSpacing: 0.6,
          }}
        >
          1982 SE
        </div>
      </div>

      {/* Bottom content block */}
      <div style={{ position: "absolute", left: 56, right: 56, bottom: 52 }}>
        <div
          style={{
            color: "white",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -1,
          }}
        >
          Iss monsoon
        </div>
        <div
          style={{
            color: AMBER,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -1,
            marginBottom: 26,
          }}
        >
          chhat nahi tapkegi.
        </div>

        <div style={{ color: "white", fontSize: 31, fontWeight: 700, marginBottom: 12 }}>
          Colour Coated Roofing — zang-proof, har mausam mazboot
        </div>
        <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 29, fontWeight: 600, marginBottom: 14 }}>
          Authorized dealer: Tata · Jindal · JSW · Durgapur
        </div>
        <div style={{ color: "rgba(255,255,255,0.66)", fontSize: 26, fontWeight: 500, marginBottom: 28 }}>
          A.T. Road, opp. New Tinsukia Railway Station · Stock ready, delivery time pe
        </div>

        <div
          style={{
            backgroundColor: GREEN,
            borderRadius: 20,
            padding: "26px 0",
            textAlign: "center",
            color: "white",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          Aaj ka rate lein — WhatsApp 78968 90880
        </div>
      </div>
    </AbsoluteFill>
  );
};
