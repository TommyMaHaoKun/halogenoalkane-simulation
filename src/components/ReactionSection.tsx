import { Section } from "./Section";
import MechanismPlayer from "./MechanismPlayer";
import type { Mechanism } from "../lib/mechanism";

function LegendDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-3 w-3 rounded-full align-middle"
      style={{ background: color }}
    />
  );
}

export default function ReactionSection({
  id,
  eyebrow,
  title,
  lead,
  mechanism,
  accent,
  note,
  wash,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  mechanism: Mechanism;
  accent: string;
  note?: string;
  wash?: boolean;
}) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title} lead={lead} wash={wash}>
      <MechanismPlayer mechanism={mechanism} accent={accent} />

      {/* legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-[var(--color-ink-soft)]">
        <span className="flex items-center gap-2">
          <svg width="26" height="10">
            <path
              d="M1 8 Q13 -4 24 6"
              fill="none"
              stroke="#f5a623"
              strokeWidth="2"
              markerEnd="url(#lg-half)"
            />
            <defs>
              <marker id="lg-half" markerWidth="10" markerHeight="10" refX="6" refY="1.5" orient="auto">
                <path d="M0,0 L9,2 L2,4 Z" fill="#f5a623" />
              </marker>
            </defs>
          </svg>
          fishhook = one electron
        </span>
        <span className="flex items-center gap-2">
          <svg width="26" height="10">
            <path
              d="M1 8 Q13 -4 24 6"
              fill="none"
              stroke="#0071e3"
              strokeWidth="2"
              markerEnd="url(#lg-full)"
            />
            <defs>
              <marker id="lg-full" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="#0071e3" />
              </marker>
            </defs>
          </svg>
          curly = electron pair
        </span>
        <span className="flex items-center gap-2">
          <svg width="24" height="6">
            <line x1="0" y1="3" x2="24" y2="3" stroke="#e5484d" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          bond breaking
        </span>
        <span className="flex items-center gap-2">
          <LegendDot color="#f5a623" /> unpaired electron
        </span>
      </div>

      {note && (
        <p className="mt-5 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-mist)] px-5 py-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
          {note}
        </p>
      )}
    </Section>
  );
}
