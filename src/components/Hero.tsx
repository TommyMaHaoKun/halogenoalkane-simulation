import { motion, useReducedMotion } from "framer-motion";
import { springUI, fadeOnly } from "../lib/motion";

export default function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? fadeOnly : { ...springUI, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1 {...rise(0)} className="type-display max-w-4xl">
        Chloroethane
      </motion.h1>

      <motion.p
        {...rise(0.06)}
        className="type-lead mt-6 max-w-xl text-[var(--color-ink-soft)]"
      >
        One small halogenoalkane, understood through the two reactions that
        define it — how it is{" "}
        <span className="font-bold text-[var(--color-ink)]">made</span> by
        electron sharing, and how it{" "}
        <span className="font-bold text-[var(--color-ink)]">reacts</span> by
        electron-pair sharing.
      </motion.p>

      <motion.div
        {...rise(0.12)}
        className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
      >
        <a
          href="#formation"
          className="pressable type-caption rounded-full px-5 py-2.5 font-bold text-white"
          style={{ background: "var(--color-accent)" }}
        >
          See it form
        </a>
        <a
          href="#structure"
          className="pressable type-caption rounded-full border border-[var(--color-hairline)] px-5 py-2.5 text-[var(--color-ink)] hover:bg-[var(--color-mist)]"
        >
          Explore the molecule
        </a>
      </motion.div>
    </section>
  );
}
