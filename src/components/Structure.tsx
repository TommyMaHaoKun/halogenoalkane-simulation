import { lazy, Suspense, useState } from "react";
import { Section } from "./Section";
import { STAGES } from "../data/molecules";

const Molecule3D = lazy(() => import("./Molecule3D"));
import { identity } from "../data/content";

function DisplayedFormula() {
  // Full (displayed) structural formula of chloroethane, drawn explicitly.
  const bond = { stroke: "#8a8a8f", strokeWidth: 2 };
  const T = (
    x: number,
    y: number,
    t: string,
    fill = "var(--color-ink)"
  ) => (
    <text
      x={x}
      y={y}
      fontSize={17}
      fontWeight={550}
      textAnchor="middle"
      dominantBaseline="central"
      fill={fill}
    >
      {t}
    </text>
  );
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto">
      {/* bonds */}
      <line x1="128" y1="90" x2="192" y2="90" {...bond} />
      <line x1="120" y1="72" x2="120" y2="52" {...bond} />
      <line x1="120" y1="108" x2="120" y2="128" {...bond} />
      <line x1="102" y1="90" x2="78" y2="90" {...bond} />
      <line x1="200" y1="72" x2="200" y2="52" {...bond} />
      <line x1="200" y1="108" x2="200" y2="128" {...bond} />
      <line x1="216" y1="90" x2="248" y2="90" {...bond} />
      {/* atoms */}
      {T(120, 90, "C")}
      {T(200, 90, "C")}
      {T(66, 90, "H")}
      {T(120, 42, "H")}
      {T(120, 138, "H")}
      {T(200, 42, "H")}
      {T(200, 138, "H")}
      {T(262, 90, "Cl", "#3ba55d")}
    </svg>
  );
}

function SkeletalFormula() {
  const bond = { stroke: "#8a8a8f", strokeWidth: 2 };
  return (
    <svg viewBox="0 0 220 120" className="w-full h-auto">
      <line x1="40" y1="80" x2="90" y2="45" {...bond} />
      <line x1="90" y1="45" x2="140" y2="80" {...bond} />
      <text
        x="158"
        y="80"
        fontSize={17}
        fontWeight={550}
        dominantBaseline="central"
        fill="#3ba55d"
      >
        Cl
      </text>
    </svg>
  );
}

export default function Structure() {
  const [stage, setStage] = useState(1); // chloroethane

  return (
    <Section
      id="structure"
      eyebrow="Identity & structure"
      title="A primary chloroalkane"
      lead="Chloroethane is an ethane molecule with one hydrogen replaced by chlorine. Drag the model to rotate it; use the toggle to see where it comes from and what it becomes."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 3D viewer */}
        <div className="overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-mist)]">
          <div className="h-[360px] w-full">
            <Suspense fallback={null}>
              <Molecule3D mol={STAGES[stage].molecule} />
            </Suspense>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--color-hairline)] bg-[var(--color-surface)] px-4 py-3">
            <div className="text-sm">
              <span className="font-semibold">{STAGES[stage].molecule.name}</span>
              <span className="ml-2 text-[var(--color-ink-soft)]">
                {STAGES[stage].molecule.formula}
              </span>
            </div>
            <div className="flex gap-1 rounded-full bg-[var(--color-mist)] p-1">
              {STAGES.map((s, k) => (
                <button
                  key={s.key}
                  onClick={() => setStage(k)}
                  className="rounded-full px-3 py-1 text-xs transition"
                  style={{
                    background: stage === k ? "var(--color-surface)" : "transparent",
                    fontWeight: stage === k ? 600 : 400,
                    boxShadow: stage === k ? "0 1px 3px rgba(0,0,0,0.18)" : "none",
                  }}
                >
                  {s.molecule.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* representations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 rounded-2xl border border-[var(--color-hairline)] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              IUPAC name
            </p>
            <p className="mt-1 text-xl font-semibold">{identity.iupac}</p>
            <p className="text-sm text-[var(--color-ink-soft)]">
              also called {identity.common} · {identity.className}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-hairline)] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              Molecular
            </p>
            <p className="mt-2 font-mono text-lg">{identity.molecular}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-hairline)] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              Condensed
            </p>
            <p className="mt-2 font-mono text-lg">{identity.condensed}</p>
          </div>

          <div className="rounded-2xl border border-[var(--color-hairline)] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              Displayed
            </p>
            <div className="mt-2">
              <DisplayedFormula />
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--color-hairline)] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              Skeletal
            </p>
            <div className="mt-2">
              <SkeletalFormula />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
