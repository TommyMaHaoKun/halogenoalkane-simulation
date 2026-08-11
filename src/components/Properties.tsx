import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { properties } from "../data/content";
import { springUI, fadeOnly } from "../lib/motion";

export default function Properties() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="properties"
      eyebrow="Physical properties"
      title="Small, polar, easily vaporised"
      lead="Chloroethane's properties follow directly from its structure — and one of them, its 12 °C boiling point, is the whole reason it works as a skin-numbing spray."
      wash
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={reduced ? fadeOnly : { ...springUI, delay: i * 0.04 }}
            className="card p-5"
          >
            <p className="type-label text-[var(--color-ink-faint)]">
              {p.label}
            </p>
            <p className="type-title mt-2 tnum" style={{ fontSize: "1.375rem" }}>
              {p.value}
            </p>
            <p className="type-caption mt-2 text-[var(--color-ink-soft)]">
              {p.note}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
