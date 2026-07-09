import { Section } from "./Section";

const steps = [
  "Rotate the 3D model by dragging; scroll to zoom. Use the toggle to move between ethane, chloroethane and ethanol.",
  "In each reaction, press Play to watch it run, or step through with Back / Next. Change the speed with the 0.5× / 1× / 2× control.",
  "Follow the arrows: amber fishhooks move one electron (radical steps); blue curly arrows move an electron pair (nucleophilic step).",
  "Read the caption under each frame — it names the stage and explains the electron movement.",
];

const refs = [
  { label: "IB Chemistry Guide — Reactivity 3.3 & 3.4 (first assessment 2025)", href: "https://www.ibchem.com/IB25/r3.40.php" },
  { label: "PubChem — Chloroethane (CID 6337)", href: "https://pubchem.ncbi.nlm.nih.gov/compound/Chloroethane" },
  { label: "Save My Exams — Electrophilic addition (SL)", href: "https://www.savemyexams.com/dp/chemistry/ib/23/sl/revision-notes/what-are-the-mechanisms-of-chemical-change/electron-pair-sharing-reactions/electrophilic-addition-reactions/" },
];

export default function Footer() {
  return (
    <Section
      id="guide"
      eyebrow="How to use this page"
      title="A short guide"
      wash
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-semibold text-white">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">
                {s}
              </p>
            </li>
          ))}
        </ol>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">
            Sources
          </p>
          <ul className="mt-4 space-y-3">
            {refs.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base text-[var(--color-accent)] hover:underline"
                >
                  {r.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-[var(--color-hairline)] pt-8 text-center text-sm text-[var(--color-ink-soft)]">
        Built for IB Chemistry SL · Reactivity 3.3 (electron sharing) &amp; 3.4
        (electron-pair sharing). The detailed SN1/SN2 mechanism is HL and is not
        shown; the electron movement here is for understanding.
      </div>
    </Section>
  );
}
