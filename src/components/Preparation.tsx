import { Section } from "./Section";
import { preparations } from "../data/content";

export default function Preparation() {
  return (
    <Section
      id="preparation"
      eyebrow="Preparation"
      title="Three ways to make it"
      lead="Two of these routes are exactly the reaction types in this course — electron-pair sharing (adding HCl to ethene) and electron sharing (chlorinating ethane)."
      wash
    >
      <div className="grid gap-6 md:grid-cols-3">
        {preparations.map((p) => (
          <div
            key={p.title}
            className="flex flex-col rounded-2xl border border-[var(--color-hairline)] bg-white p-6"
          >
            <h3 className="text-base font-semibold">{p.title}</h3>
            <p className="mt-3 rounded-lg bg-[var(--color-mist)] px-3 py-2 font-mono text-[13px] leading-relaxed">
              {p.equation}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
