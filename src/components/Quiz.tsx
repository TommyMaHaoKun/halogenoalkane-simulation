import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { quiz } from "../data/content";
import { springSnap, fadeOnly } from "../lib/motion";

function Question({
  q,
  options,
  answer,
  why,
  index,
}: {
  q: string;
  options: string[];
  answer: number;
  why: string;
  index: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const done = picked !== null;
  const correct = picked === answer;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex gap-3.5">
        <span className="type-caption tnum flex-none pt-0.5 font-bold text-[var(--color-ink-faint)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="type-heading">{q}</p>

          <div className="mt-4 grid gap-2">
            {options.map((opt, i) => {
              const isAnswer = i === answer;
              const isPicked = i === picked;
              let border = "var(--color-hairline)";
              let bg = "transparent";
              let mark: string | null = null;
              let markColor = "";

              if (done && isAnswer) {
                border = "var(--color-pass)";
                bg = "color-mix(in srgb, var(--color-pass) 9%, transparent)";
                mark = "✓";
                markColor = "var(--color-pass)";
              } else if (done && isPicked) {
                border = "var(--color-fail)";
                bg = "color-mix(in srgb, var(--color-fail) 9%, transparent)";
                mark = "✕";
                markColor = "var(--color-fail)";
              }

              return (
                <button
                  key={i}
                  disabled={done}
                  onClick={() => setPicked(i)}
                  className="pressable type-caption flex items-center justify-between gap-3 rounded-[var(--radius-inner)] border px-4 py-3 text-left disabled:cursor-default"
                  style={{ borderColor: border, background: bg }}
                >
                  <span>{opt}</span>
                  {mark && (
                    <span
                      className="flex-none font-bold"
                      style={{ color: markColor }}
                    >
                      {mark}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {done && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={reduced ? fadeOnly : springSnap}
                className="type-caption mt-3.5 overflow-hidden text-[var(--color-ink-soft)]"
              >
                <span
                  className="font-bold"
                  style={{
                    color: correct ? "var(--color-pass)" : "var(--color-fail)",
                  }}
                >
                  {correct ? "Correct. " : "Not quite. "}
                </span>
                {why}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  return (
    <Section
      id="quiz"
      eyebrow="Check yourself"
      title="Five quick questions"
      lead="Test the ideas behind the two simulations — bond fission, arrows, and the reactions of chloroethane."
    >
      <div className="grid gap-3">
        {quiz.map((item, i) => (
          <Question key={i} index={i} {...item} />
        ))}
      </div>
    </Section>
  );
}
