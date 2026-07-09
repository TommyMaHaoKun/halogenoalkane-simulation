import { motion } from "framer-motion";
import { Section } from "./Section";
import { properties } from "../data/content";

export default function Properties() {
  return (
    <Section
      id="properties"
      eyebrow="Physical properties"
      title="Small, polar, and easily vaporised"
      lead="Chloroethane's properties follow directly from its structure — and one of them, its 12 °C boiling point, is the whole reason it works as a skin-numbing spray."
      wash
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              {p.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{p.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {p.note}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
