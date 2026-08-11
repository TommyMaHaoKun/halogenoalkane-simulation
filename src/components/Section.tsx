import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reveal } from "../lib/motion";

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
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className="scroll-mt-20 py-20 sm:py-28"
      style={{ background: wash ? "var(--color-mist)" : "transparent" }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div {...reveal(reduced)}>
          {eyebrow && (
            <p className="type-label text-[var(--color-accent)]">{eyebrow}</p>
          )}
          <h2 className="type-title mt-3">{title}</h2>
          {lead && (
            <p className="type-lead mt-4 max-w-2xl text-[var(--color-ink-soft)]">
              {lead}
            </p>
          )}
        </motion.div>

        <motion.div {...reveal(reduced, 20)} className="mt-10">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
