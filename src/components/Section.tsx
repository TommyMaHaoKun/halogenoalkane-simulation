import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  wash = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  wash?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-16 py-24 sm:py-28"
      style={{ background: wash ? "var(--color-mist)" : "transparent" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {lead && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {lead}
            </p>
          )}
        </motion.div>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
