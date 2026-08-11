import { Section } from "./Section";
import MechanismPlayer from "./MechanismPlayer";
import type { Mechanism } from "../lib/mechanism";

function Legend() {
  return (
    <div className="type-caption mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[var(--color-ink-soft)]">
      <span className="flex items-center gap-2">
        <svg width="26" height="10" aria-hidden>
          <defs>
            <marker id="lg-half" markerWidth="10" markerHeight="10" refX="6" refY="1.5" orient="auto">
              <path d="M0,0 L9,2 L2,4 Z" fill="#f5a623" />
            </marker>
          </defs>
          <path d="M1 8 Q13 -4 24 6" fill="none" stroke="#f5a623" strokeWidth="2" markerEnd="url(#lg-half)" />
        </svg>
        fishhook = one electron
      </span>
      <span className="flex items-center gap-2">
        <svg width="26" height="10" aria-hidden>
          <defs>
            <marker id="lg-full" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="var(--color-accent)" />
            </marker>
          </defs>
          <path d="M1 8 Q13 -4 24 6" fill="none" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#lg-full)" />
        </svg>
        curly = electron pair
      </span>
      <span className="flex items-center gap-2">
        <svg width="24" height="6" aria-hidden>
          <line x1="0" y1="3" x2="24" y2="3" stroke="var(--color-fail)" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
        bond breaking
      </span>
      <span className="flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
        unpaired electron
      </span>
    </div>
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
      <Legend />
      {note && (
        <p
          className="type-caption mt-5 rounded-[var(--radius-inner)] border-l-2 py-3 pl-4 pr-4 text-[var(--color-ink-soft)]"
          style={{
            borderColor: accent,
            background: "var(--color-accent-soft)",
          }}
        >
          {note}
        </p>
      )}
    </Section>
  );
}
