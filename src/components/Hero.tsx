import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl font-semibold tracking-tight sm:text-7xl"
      >
        Chloroethane
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)] sm:text-lg"
      >
        One small halogenoalkane, understood through the two reactions that
        define it — how it is <span className="text-[var(--color-ink)]">made</span> by
        electron sharing, and how it <span className="text-[var(--color-ink)]">reacts</span> by
        electron-pair sharing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-10 flex items-center gap-3 text-sm"
      >
        <span className="rounded-full border border-[var(--color-hairline)] px-4 py-1.5 text-[var(--color-ink-soft)]">
          C₂H₅Cl
        </span>
        <a
          href="#structure"
          className="rounded-full bg-[var(--color-accent)] px-5 py-1.5 font-medium text-white transition hover:opacity-90"
        >
          Explore ↓
        </a>
      </motion.div>
    </section>
  );
}
