import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mechanism, SAtom, Step } from "../lib/mechanism";
import { arc, arcLength } from "../lib/svg";

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

function AtomNode({ atom }: { atom: SAtom }) {
  const w = atomWidth(atom.label);
  const isPill = atom.label.length > 2;
  const rx = isPill ? 17 : w / 2;
  return (
    <motion.g
      initial={{ opacity: 0, x: atom.x, y: atom.y }}
      animate={{ opacity: 1, x: atom.x, y: atom.y }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
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
        fontSize={16}
        fontWeight={550}
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
          fontWeight={600}
          fill="#1d1d1f"
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
              <g key={i} fill="#1d1d1f">
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
}: {
  a: SAtom;
  b: SAtom;
  state?: string;
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
      transition={{ duration: 0.5 }}
      stroke={breaking ? "#e5484d" : "#8a8a8f"}
      strokeWidth={3}
      strokeDasharray={breaking ? "5 5" : "0"}
      strokeLinecap="round"
    />
  );
}

function ArrowPath({ arrow }: { arrow: NonNullable<Step["arrows"]>[number] }) {
  const d = arc(arrow.from[0], arrow.from[1], arrow.to[0], arrow.to[1], arrow.bend);
  const len = arcLength(arrow.from[0], arrow.from[1], arrow.to[0], arrow.to[1], arrow.bend);
  const curly = arrow.kind === "curly";
  const color = curly ? "#0071e3" : "#f5a623";
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      markerEnd={`url(#${curly ? "head-full" : "head-half"})`}
      initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: "easeInOut" }}
    />
  );
}

export default function MechanismPlayer({
  mechanism,
  accent = "#0071e3",
}: {
  mechanism: Mechanism;
  accent?: string;
}) {
  const { steps } = mechanism;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<number | null>(null);

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
    <div className="rounded-2xl border border-[var(--color-hairline)] bg-white overflow-hidden">
      {/* phase + progress */}
      <div className="flex items-center justify-between px-5 sm:px-7 pt-5">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent }}
        >
          {step.phase}
        </span>
        <span className="text-xs text-[var(--color-ink-soft)] tabular-nums">
          {i + 1} / {steps.length}
        </span>
      </div>

      {/* stage */}
      <div className="px-2 sm:px-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-auto"
          role="img"
          aria-label={step.title}
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
              <path d="M0,0 L9,4.5 L0,9 Z" fill="#0071e3" />
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
              <BondLine key={`${b.a}-${b.b}`} a={a} b={c} state={b.state} />
            );
          })}

          {/* electron-movement arrows (redrawn each step) */}
          <AnimatePresence mode="wait">
            <g key={`arrows-${i}`}>
              {step.arrows?.map((ar) => (
                <ArrowPath key={ar.id} arrow={ar} />
              ))}
            </g>
          </AnimatePresence>

          {/* atoms */}
          <AnimatePresence>
            {step.atoms.map((a) => (
              <AtomNode key={a.id} atom={a} />
            ))}
          </AnimatePresence>
        </svg>
      </div>

      {/* caption */}
      <div className="px-5 sm:px-7 pb-1 min-h-[92px]">
        <h4 className="text-base font-semibold text-[var(--color-ink)]">
          {step.title}
        </h4>
        {step.equation && (
          <p className="mt-1 font-mono text-[13px] text-[var(--color-ink)]">
            {step.equation}
          </p>
        )}
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {step.caption}
        </p>
      </div>

      {/* controls */}
      <div className="flex items-center gap-1 border-t border-[var(--color-hairline)] px-4 sm:px-6 py-3">
        <button
          onClick={prev}
          disabled={i === 0}
          className="rounded-full px-3 py-1.5 text-sm text-[var(--color-ink)] disabled:opacity-30 hover:bg-[var(--color-mist)] transition"
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
          className="rounded-full px-4 py-1.5 text-sm font-semibold text-white transition"
          style={{ background: accent }}
        >
          {atLast ? "Replay" : playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={next}
          disabled={atLast}
          className="rounded-full px-3 py-1.5 text-sm text-[var(--color-ink)] disabled:opacity-30 hover:bg-[var(--color-mist)] transition"
        >
          Next ›
        </button>

        <div className="ml-auto flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
          <span>Speed</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="rounded-full px-2 py-1 tabular-nums transition"
              style={{
                background: speed === s ? "var(--color-mist)" : "transparent",
                color: speed === s ? "var(--color-ink)" : undefined,
                fontWeight: speed === s ? 600 : 400,
              }}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* step rail */}
      <div className="flex gap-1.5 px-6 pb-4">
        {steps.map((_, k) => (
          <button
            key={k}
            aria-label={`Step ${k + 1}`}
            onClick={() => {
              setPlaying(false);
              setI(k);
            }}
            className="h-1 flex-1 rounded-full transition"
            style={{
              background: k <= i ? accent : "var(--color-hairline)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
