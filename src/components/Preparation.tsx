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
      <div className="grid gap-3 md:grid-cols-3">
        {preparations.map((p) => (
          <div key={p.title} className="card flex flex-col p-6">
            <h3 className="type-heading">{p.title}</h3>
            <p
              className="type-caption mt-3 rounded-lg px-3 py-2 font-bold"
              style={{ background: "var(--color-mist)" }}
            >
              {p.equation}
            </p>
            <p className="type-caption mt-3 text-[var(--color-ink-soft)]">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
