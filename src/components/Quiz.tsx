import { useState } from "react";
import { Section } from "./Section";
import { quiz } from "../data/content";

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
  const done = picked !== null;
  const correct = picked === answer;

  return (
    <div className="rounded-2xl border border-[var(--color-hairline)] p-6">
      <div className="flex gap-3">
        <span className="text-sm font-semibold text-[var(--color-ink-soft)] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <p className="font-medium">{q}</p>
          <div className="mt-4 grid gap-2">
            {options.map((opt, i) => {
              const isAnswer = i === answer;
              const isPicked = i === picked;
              let border = "var(--color-hairline)";
              let bg = "white";
              if (done && isAnswer) {
                border = "#3ba55d";
                bg = "rgba(59,165,93,0.08)";
              } else if (done && isPicked && !isAnswer) {
                border = "#e5484d";
                bg = "rgba(229,72,77,0.08)";
              }
              return (
                <button
                  key={i}
                  disabled={done}
                  onClick={() => setPicked(i)}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default"
                  style={{ borderColor: border, background: bg }}
                >
                  <span>{opt}</span>
                  {done && isAnswer && <span className="text-[#3ba55d]">✓</span>}
                  {done && isPicked && !isAnswer && (
                    <span className="text-[#e5484d]">✕</span>
                  )}
                </button>
              );
            })}
          </div>
          {done && (
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              <span
                className="font-semibold"
                style={{ color: correct ? "#3ba55d" : "#e5484d" }}
              >
                {correct ? "Correct. " : "Not quite. "}
              </span>
              {why}
            </p>
          )}
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
      <div className="grid gap-4">
        {quiz.map((item, i) => (
          <Question key={i} index={i} {...item} />
        ))}
      </div>
    </Section>
  );
}
