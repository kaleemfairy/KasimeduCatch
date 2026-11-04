import { useId } from "react";

// Drawn stand-ins for catch photos. Swap in real dock photos when they exist.
export type ArtId =
  | "seer" | "snapper" | "mackerel" | "anchovy" | "sole" | "cobia" | "bass" | "trevally" | "mirror"
  | "black-pomfret" | "chinese-pomfret" | "squid" | "prawn" | "crab";

type FishSpec = {
  len: number;
  depth: number;
  body: string;
  back: string;
  belly?: number;
  tail?: number;
  fork?: number;
  dorsal?: number;
  marks?: "bars" | "stripes";
  sharkFin?: boolean;
};

const LINE = "#FBF9F3";

const FISH: Partial<Record<ArtId, FishSpec>> = {
  seer: { len: 236, depth: 25, body: "#A9C6D6", back: "#4C7E9B", tail: 36, fork: 0.75, dorsal: 12, marks: "bars" },
  snapper: { len: 186, depth: 44, body: "#E8796A", back: "#B63F38", tail: 30, fork: 0.25, dorsal: 18 },
  mackerel: { len: 208, depth: 28, body: "#D5E2E4", back: "#3F7286", tail: 32, fork: 0.85, dorsal: 10, marks: "stripes" },
  sole: { len: 200, depth: 34, body: "#D9C9A6", back: "#A08A63", tail: 18, fork: 0, dorsal: 7 },
  cobia: { len: 240, depth: 23, body: "#CDD2CA", back: "#50585A", tail: 34, fork: 0.6, dorsal: 8, sharkFin: true },
  bass: { len: 198, depth: 36, body: "#D3DCC8", back: "#74907F", tail: 28, fork: 0, dorsal: 16 },
  trevally: { len: 172, depth: 47, body: "#D9DDB4", back: "#84A07E", tail: 36, fork: 0.9, dorsal: 12 },
  mirror: { len: 160, depth: 54, body: "#E6EDF0", back: "#A9BEC8", tail: 36, fork: 0.9, dorsal: 20 },
  "black-pomfret": { len: 146, depth: 62, body: "#6F7983", back: "#3A434C", tail: 36, fork: 0.85, dorsal: 16 },
  "chinese-pomfret": { len: 146, depth: 62, body: "#DDE5E9", back: "#A5B5BE", tail: 30, fork: 0.5, dorsal: 16 },
};

function Fish({ spec, clipId }: { spec: FishSpec; clipId: string }) {
  const { len, depth, body, back, belly = 1, tail = 30, fork = 0.6, dorsal = 12, marks } = spec;
  const nose = 160 - (len + tail) / 2;
  const ped = nose + len;
  const y = 90;
  const outline = `M${nose} ${y} C${nose + len * 0.2} ${y - depth * 1.28} ${nose + len * 0.62} ${y - depth * 1.08} ${ped} ${y - 4} L${ped} ${y + 4} C${nose + len * 0.62} ${y + depth * belly * 1.08} ${nose + len * 0.2} ${y + depth * belly * 1.2} ${nose} ${y} Z`;
  const tailHeight = depth * 0.72 + 8;
  const notch = ped + tail * (1 - fork);
  const finStroke = { stroke: LINE, strokeWidth: 1.5, strokeLinejoin: "round" as const };

  return (
    <g>
      <path d={`M${ped - 2} ${y - 4} L${ped + tail} ${y - tailHeight} Q${notch} ${y} ${ped + tail} ${y + tailHeight} L${ped - 2} ${y + 4} Z`} fill={back} {...finStroke} />
      {spec.sharkFin ? (
        <path d={`M${nose + len * 0.36} ${y - depth * 0.85} L${nose + len * 0.5} ${y - depth - 26} L${nose + len * 0.58} ${y - depth * 0.85} Z`} fill={back} {...finStroke} />
      ) : (
        <path d={`M${nose + len * 0.28} ${y - depth * 0.9} Q${nose + len * 0.36} ${y - depth - dorsal} ${nose + len * 0.5} ${y - depth - dorsal * 0.7} L${nose + len * 0.72} ${y - depth * 0.55} Z`} fill={back} {...finStroke} />
      )}
      <path d={`M${nose + len * 0.56} ${y + depth * 0.8} Q${nose + len * 0.66} ${y + depth + dorsal * 0.8} ${nose + len * 0.78} ${y + depth * 0.5} Z`} fill={back} {...finStroke} />
      <path d={`M${nose + len * 0.26} ${y + depth * 0.95} L${nose + len * 0.33} ${y + depth + 10} L${nose + len * 0.4} ${y + depth * 0.9} Z`} fill={back} {...finStroke} />

      <clipPath id={clipId}><path d={outline} /></clipPath>
      <path d={outline} fill={body} />
      <g clipPath={`url(#${clipId})`}>
        <path d={`M${nose - 4} ${y - 2} Q${nose + len * 0.5} ${y + depth * 0.12} ${ped + 4} ${y} V${y - depth * 2} H${nose - 4} Z`} fill={back} />
        {marks === "bars" &&
          [0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((at) => (
            <path key={at} d={`M${nose + len * at} ${y - depth} q5 ${depth * 0.6} -2 ${depth * 1.05}`} stroke={LINE} strokeWidth="2" opacity="0.55" fill="none" />
          ))}
        {marks === "stripes" &&
          [-0.72, -0.5, -0.28].map((at) => (
            <path key={at} d={`M${nose + len * 0.2} ${y + depth * at} Q${nose + len * 0.55} ${y + depth * (at - 0.1)} ${ped} ${y + depth * at * 0.2}`} stroke="#1D3F52" strokeWidth="2" fill="none" />
          ))}
      </g>
      <path d={outline} fill="none" stroke={LINE} strokeWidth="1.75" />
      <path d={`M${nose + len * 0.2} ${y - depth * 0.78} Q${nose + len * 0.26} ${y} ${nose + len * 0.2} ${y + depth * 0.78}`} stroke={LINE} strokeWidth="1.5" fill="none" />
      <path d={`M${nose + len * 0.24} ${y + 2} q${len * 0.08} 2 ${len * 0.1} ${depth * 0.45}`} fill={back} {...finStroke} />
      <circle cx={Math.round(nose + len * 0.1)} cy={Math.round(y - depth * 0.28)} r={Math.round(Math.max(3.5, depth * 0.11))} fill="#071524" stroke={LINE} strokeWidth="1.5" />
    </g>
  );
}

function School({ clipId, body, back }: { clipId: string; body: string; back: string }) {
  const spec: FishSpec = { len: 120, depth: 11, body, back, tail: 18, fork: 0.8, dorsal: 5 };
  const positions = [
    { x: -62, y: -44, s: 0.85 },
    { x: 54, y: -34, s: 0.95 },
    { x: -40, y: 8, s: 1.05 },
    { x: 72, y: 26, s: 0.85 },
    { x: -66, y: 54, s: 0.8 },
    { x: 26, y: 58, s: 0.9 },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <g key={i} transform={`translate(${160 + p.x} ${90 + p.y}) scale(${p.s}) translate(-160 -90)`}>
          <Fish spec={spec} clipId={`${clipId}-${i}`} />
        </g>
      ))}
    </>
  );
}

function Prawn({ body, band }: { body: string; band: string }) {
  // Seven shell segments curling from the head (left) round to the tail fan.
  const segments = Array.from({ length: 7 }, (_, i) => {
    const angle = ((150 - i * 34) * Math.PI) / 180;
    return {
      x: Math.round(168 + Math.cos(angle) * 62),
      y: Math.round(92 - Math.sin(angle) * 54),
      r: Math.round(31 - i * 2.6),
      rotate: 90 - (150 - i * 34),
    };
  });
  const tail = segments[6];
  const single = (
    <g>
      <path d="M92 74 C66 54 46 42 18 40 M90 80 C62 72 40 70 12 74" stroke={LINE} strokeWidth="1.5" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${112 + i * 15} ${`${118 - i * 6}`} q-2 22 -14 34`} stroke={band} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ))}
      <path d={`M${tail.x - 6} ${tail.y + 4} L${tail.x - 34} ${tail.y + 34} L${tail.x - 8} ${tail.y + 26} L${tail.x + 4} ${tail.y + 42} Z`} fill={band} stroke={LINE} strokeWidth="1.5" strokeLinejoin="round" />
      {[...segments].reverse().map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx={s.r} ry={Math.round(s.r * 0.74)} transform={`rotate(${s.rotate} ${s.x} ${s.y})`} fill={i % 2 ? band : body} stroke={LINE} strokeWidth="1.5" />
      ))}
      <path d="M134 46 C104 44 80 62 72 86 C92 104 124 106 144 88 Z" fill={body} stroke={LINE} strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M74 84 L44 96" stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="94" cy="74" r="5" fill="#071524" stroke={LINE} strokeWidth="1.5" />
    </g>
  );
  return single;
}

function Crab({ shell, claw }: { shell: string; claw: string }) {
  const legs = [0, 1, 2, 3];
  return (
    <g strokeLinejoin="round">
      {legs.map((i) => (
        <g key={i} stroke={shell} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d={`M${112 - i * 2} ${104 + i * 8} L${78 - i * 3} ${100 + i * 16} L${62 - i * 2} ${122 + i * 15}`} />
          <path d={`M${208 + i * 2} ${104 + i * 8} L${242 + i * 3} ${100 + i * 16} L${258 + i * 2} ${122 + i * 15}`} />
        </g>
      ))}
      <path d="M116 78 L84 58 L76 40 M204 78 L236 58 L244 40" stroke={shell} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M76 42 C60 34 56 16 70 6 C72 18 78 22 86 22 C92 14 98 12 104 14 C102 30 92 44 76 42 Z" fill={claw} stroke={LINE} strokeWidth="1.5" />
      <path d="M244 42 C260 34 264 16 250 6 C248 18 242 22 234 22 C228 14 222 12 216 14 C218 30 228 44 244 42 Z" fill={claw} stroke={LINE} strokeWidth="1.5" />
      <path d="M92 86 C110 56 210 56 228 86 C222 124 190 138 160 138 C130 138 98 124 92 86 Z" fill={shell} stroke={LINE} strokeWidth="1.75" />
      <path d="M124 110 Q160 128 196 110" stroke={LINE} strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M140 74 V62 M180 74 V62" stroke={LINE} strokeWidth="2" />
      <circle cx="140" cy="60" r="4.5" fill="#071524" stroke={LINE} strokeWidth="1.5" />
      <circle cx="180" cy="60" r="4.5" fill="#071524" stroke={LINE} strokeWidth="1.5" />
    </g>
  );
}

function Squid({ body, fin }: { body: string; fin: string }) {
  return (
    <g strokeLinejoin="round">
      <g stroke={fin} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M108 84 C84 70 62 76 40 62" />
        <path d="M108 88 C84 84 62 92 34 84" />
        <path d="M108 92 C84 96 62 106 36 106" />
        <path d="M108 96 C88 108 66 122 44 128" />
      </g>
      <path d="M252 56 L296 90 L252 124 Z" fill={fin} stroke={LINE} strokeWidth="1.5" />
      <path d="M104 90 C112 66 124 64 136 64 C190 54 240 62 278 90 C240 118 190 126 136 116 C124 116 112 114 104 90 Z" fill={body} stroke={LINE} strokeWidth="1.75" />
      <path d="M136 64 Q144 90 136 116" stroke={LINE} strokeWidth="1.5" fill="none" />
      <circle cx="122" cy="84" r="5.5" fill="#071524" stroke={LINE} strokeWidth="1.5" />
      <g fill={fin} opacity="0.55">
        {[160, 182, 204, 226, 172, 196, 218].map((x, i) => (
          <circle key={i} cx={x} cy={i < 4 ? 78 : 100} r="2.5" />
        ))}
      </g>
    </g>
  );
}

function Art({ art, clipId }: { art: ArtId; clipId: string }) {
  const spec = FISH[art];
  if (spec) return <Fish spec={spec} clipId={clipId} />;
  switch (art) {
    case "anchovy":
      return <School clipId={clipId} body="#DCE9EE" back="#7FA3B5" />;
    case "squid":
      return <Squid body="#EBDDD2" fin="#C58F86" />;
    case "prawn":
      return <Prawn body="#E5E3D2" band="#B9B69E" />;
    case "crab":
      return <Crab shell="#5D93C4" claw="#2F6A9F" />;
    default:
      return null;
  }
}

export function Specimen({ art, label, className }: { art: ArtId; label: string; className?: string }) {
  const clipId = useId();
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={label} className={className}>
      <Art art={art} clipId={clipId} />
    </svg>
  );
}
