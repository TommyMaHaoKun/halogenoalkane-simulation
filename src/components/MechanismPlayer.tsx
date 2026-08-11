import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Mechanism, SAtom, Step } from "../lib/mechanism";
import { arc, arcLength } from "../lib/svg";
import { springUI, springSnap, fadeOnly } from "../lib/motion";

const FILL: Record<SAtom["el"], string> = {
  C: "#3a3a3c",
  H: "#e9e9ee",
  Cl: "#3ba55d",
  O: "#e5484d",
  group: "#3a3a3c",
};
const TEXT_ON: Record<SAtom["el"], string> = {
  C: "#ffffff",
  H: "#1d1d1f",
  Cl: "#ffffff",
  O: "#ffffff",
  group: "#ffffff",
};

const VIEW_W = 720;
const VIEW_H = 300;

function atomWidth(label: string): number {
  if (label.length <= 1) return 38;
  if (label.length === 2) return 44;
  return 30 + label.length * 12;
}

function AtomNode({ atom, reduced }: { atom: SAtom; reduced: boolean | null }) {
  const w = atomWidth(atom.label);
  const isPill = atom.label.length > 2;
  const rx = isPill ? 17 : w / 2;
  return (
    <motion.g
      initial={{ opacity: 0, x: atom.x, y: atom.y }}
      animate={{ opacity: 1, x: atom.x, y: atom.y }}
      exit={{ opacity: 0 }}
      transition={reduced ? fadeOnly : springUI}
    >
      {isPill ? (
        <rect
          x={-w / 2}
          y={-17}
          width={w}
          height={34}
          rx={rx}
          fill={FILL[atom.el]}
        />
      ) : (
        <circle r={19} fill={FILL[atom.el]} />
      )}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={15}
        fontWeight={700}
        letterSpacing="-0.02em"
        fill={TEXT_ON[atom.el]}
      >
        {atom.label}
      </text>

      {/* formal / partial charge */}
      {atom.charge && (
        <text
          x={w / 2 - 2}
          y={-16}
          fontSize={13}
          fontWeight={700}
          fill="var(--color-ink)"
        >
          {atom.charge}
        </text>
      )}

      {/* unpaired electron (radical) */}
      {atom.radical && <circle cx={w / 2 + 6} cy={-6} r={3.4} fill="#f5a623" />}

      {/* lone pairs */}
      {atom.lonePairs
        ? Array.from({ length: atom.lonePairs }).map((_, i) => {
            const ang = Math.PI * (0.75 + i * 0.5);
            const r = 26;
            const cx = Math.cos(ang) * r;
            const cy = Math.sin(ang) * r;
            const ox = Math.cos(ang + Math.PI / 2) * 4;
            const oy = Math.sin(ang + Math.PI / 2) * 4;
            return (
              <g key={i} fill="var(--color-ink)">
                <circle cx={cx - ox} cy={cy - oy} r={2.4} />
                <circle cx={cx + ox} cy={cy + oy} r={2.4} />
              </g>
            );
          })
        : null}
    </motion.g>
  );
}

function BondLine({
  a,
  b,
  state,
  reduced,
}: {
  a: SAtom;
  b: SAtom;
  state?: string;
  reduced: boolean | null;
}) {
  const breaking = state === "breaking";
  const forming = state === "forming";
  return (
    <motion.line
      initial={{
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        opacity: forming ? 0 : 1,
      }}
      animate={{
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        opacity: breaking ? 0.4 : 1,
      }}
      transition={reduced ? fadeOnly : springUI}
      stroke={breaking ? "var(--color-fail)" : "var(--color-ink-faint)"}
      strokeWidth={3}
      strokeDasharray={breaking ? "5 5" : "0"}
      strokeLinecap="round"
    />
  );
}

function ArrowPath({
  arrow,
  reduced,
}: {
  arrow: NonNullable<Step["arrows"]>[number];
  reduced: boolean | null;
}) {
  const d = arc(arrow.from[0], arrow.from[1], arrow.to[0], arrow.to[1], arrow.bend);
  const len = arcLength(arrow.from[0], arrow.from[1], arrow.to[0], arrow.to[1], arrow.bend);
  const curly = arrow.kind === "curly";
  const color = curly ? "var(--color-accent)" : "#f5a623";
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      markerEnd={`url(#${curly ? "head-full" : "head-half"})`}
      initial={{
        strokeDasharray: len,
        strokeDashoffset: reduced ? 0 : len,
        opacity: 0,
      }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={
        reduced
          ? fadeOnly
          : { duration: 0.65, delay: 0.3, ease: [0.33, 0, 0.15, 1] }
      }
    />
  );
}

export default function MechanismPlayer({
  mechanism,
  accent = "var(--color-accent)",
}: {
  mechanism: Mechanism;
  accent?: string;
}) {
  const { steps } = mechanism;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const uid = useId(); // keeps layout animations scoped to this player

  const step = steps[i];
  const atomById = useMemo(() => {
    const m = new Map<string, SAtom>();
    step.atoms.forEach((a) => m.set(a.id, a));
    return m;
  }, [step]);

  const next = useCallback(
    () => setI((v) => Math.min(v + 1, steps.length - 1)),
    [steps.length]
  );
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(() => next(), 2600 / speed);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, i, speed, next, steps.length]);

  const atLast = i === steps.length - 1;

  return (
    <div className="card overflow-hidden">
      {/* phase + progress */}
      <div className="flex items-center justify-between px-5 pt-5 sm:px-7">
        <span className="type-label" style={{ color: accent }}>
          {step.phase}
        </span>
        <span className="type-caption tnum text-[var(--color-ink-faint)]">
          {i + 1} / {steps.length}
        </span>
      </div>

      {/* stage */}
      <div className="px-1 sm:px-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${step.phase}: ${step.title}`}
        >
          <defs>
            <marker
              id="head-full"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="4.5"
              orient="auto"
            >
              <path d="M0,0 L9,4.5 L0,9 Z" fill="var(--color-accent)" />
            </marker>
            <marker
              id="head-half"
              markerWidth="11"
              markerHeight="11"
              refX="7"
              refY="1.5"
              orient="auto"
            >
              <path d="M0,0 L10,2 L2,4 Z" fill="#f5a623" />
            </marker>
          </defs>

          {/* bonds */}
          {step.bonds.map((b) => {
            const a = atomById.get(b.a);
            const c = atomById.get(b.b);
            if (!a || !c) return null;
            return (
              <BondLine
                key={`${b.a}-${b.b}`}
                a={a}
                b={c}
                state={b.state}
                reduced={reduced}
              />
            );
          })}

          {/* electron-movement arrows (redrawn each step) */}
          <AnimatePresence mode="wait">
            <g key={`arrows-${i}`}>
              {step.arrows?.map((ar) => (
                <ArrowPath key={ar.id} arrow={ar} reduced={reduced} />
              ))}
            </g>
          </AnimatePresence>

          {/* atoms */}
          <AnimatePresence>
            {step.atoms.map((a) => (
              <AtomNode key={a.id} atom={a} reduced={reduced} />
            ))}
          </AnimatePresence>
        </svg>
      </div>

      {/* caption — fixed height so controls never shift as text changes */}
      {/* Keyed so it re-mounts and fades in per step. Deliberately NOT wrapped
          in AnimatePresence — nothing needs to animate out, and `mode="wait"`
          would stall the swap behind the previous caption's exit. */}
      <div className="min-h-[112px] px-5 pb-2 sm:px-7">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? fadeOnly : springSnap}
        >
          <h4 className="type-heading">{step.title}</h4>
          {step.equation && (
            <p
              className="type-equation mt-2 inline-block rounded-md px-2.5 py-1"
              style={{ background: "var(--color-mist)" }}
            >
              {step.equation}
            </p>
          )}
          <p className="type-body mt-1.5 text-[var(--color-ink-soft)]">
            {step.caption}
          </p>
        </motion.div>
      </div>

      {/* controls */}
      <div className="flex items-center gap-1 border-t border-[var(--color-hairline)] px-3 py-3 sm:px-5">
        <button
          onClick={prev}
          disabled={i === 0}
          className="pressable type-caption rounded-full px-3 py-1.5 hover:bg-[var(--color-mist)] disabled:opacity-30"
        >
          ‹ Back
        </button>
        <button
          onClick={() => {
            if (atLast) {
              setI(0);
              setPlaying(true);
            } else setPlaying((p) => !p);
          }}
          className="pressable type-caption rounded-full px-4 py-1.5 font-bold text-white"
          style={{ background: accent }}
        >
          {atLast ? "Replay" : playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={next}
          disabled={atLast}
          className="pressable type-caption rounded-full px-3 py-1.5 hover:bg-[var(--color-mist)] disabled:opacity-30"
        >
          Next ›
        </button>

        <div className="type-caption ml-auto flex items-center gap-0.5 text-[var(--color-ink-faint)]">
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              aria-label={`${s}× speed`}
              className="pressable tnum relative rounded-full px-2 py-1"
              style={{
                color: speed === s ? "var(--color-ink)" : undefined,
                fontWeight: speed === s ? 700 : 400,
              }}
            >
              {speed === s && (
                <motion.span
                  layoutId={`speed-${uid}`}
                  transition={springSnap}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: "var(--color-mist)" }}
                />
              )}
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* step rail */}
      <div className="flex gap-1 px-5 pb-4 sm:px-7">
        {steps.map((s, k) => (
          <button
            key={k}
            aria-label={`Step ${k + 1}: ${s.title}`}
            title={s.phase}
            onClick={() => {
              setPlaying(false);
              setI(k);
            }}
            className="pressable-subtle h-4 flex-1"
          >
            <span
              className="block h-1 w-full rounded-full transition-colors duration-300"
              style={{
                background: k <= i ? accent : "var(--color-hairline)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
