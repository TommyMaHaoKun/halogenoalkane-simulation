import { motion } from "framer-motion";
import { Section } from "./Section";
import { applications } from "../data/content";

export default function Applications() {
  return (
    <Section
      id="uses"
      eyebrow="Real-world applications"
      title="From the sports field to the ozone layer"
      lead="The same C–Cl bond that makes chloroethane useful also makes its relatives infamous — the chemistry of Reactivity 3.3 and 3.4 plays out in everyday life."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {applications.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--color-hairline)] p-6"
          >
            <h3 className="text-xl font-semibold">{a.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">
              {a.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
