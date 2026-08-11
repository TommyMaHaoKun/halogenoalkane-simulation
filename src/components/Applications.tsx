import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { applications } from "../data/content";
import { springUI, fadeOnly } from "../lib/motion";

export default function Applications() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="uses"
      eyebrow="Real-world applications"
      title="From the sports field to the ozone layer"
      lead="The same C–Cl bond that makes chloroethane useful also makes its relatives infamous — the chemistry of Reactivity 3.3 and 3.4 plays out in everyday life."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {applications.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={reduced ? fadeOnly : { ...springUI, delay: i * 0.06 }}
            className="card p-6"
          >
            <h3 className="type-heading">{a.title}</h3>
            <p className="type-caption mt-3 text-[var(--color-ink-soft)]">
              {a.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
