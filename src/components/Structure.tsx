import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { STAGES } from "../data/molecules";
import { identity } from "../data/content";
import { springSnap } from "../lib/motion";

const Molecule3D = lazy(() => import("./Molecule3D"));

function DisplayedFormula() {
  // Full (displayed) structural formula of chloroethane, drawn explicitly.
  const bond = { stroke: "var(--color-ink-faint)", strokeWidth: 2 };
  const T = (x: number, y: number, t: string, fill = "var(--color-ink)") => (
    <text
      x={x}
      y={y}
      fontSize={17}
      fontWeight={700}
      textAnchor="middle"
      dominantBaseline="central"
      fill={fill}
    >
      {t}
    </text>
  );
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full">
      <line x1="128" y1="90" x2="192" y2="90" {...bond} />
      <line x1="120" y1="72" x2="120" y2="52" {...bond} />
      <line x1="120" y1="108" x2="120" y2="128" {...bond} />
      <line x1="102" y1="90" x2="78" y2="90" {...bond} />
      <line x1="200" y1="72" x2="200" y2="52" {...bond} />
      <line x1="200" y1="108" x2="200" y2="128" {...bond} />
      <line x1="216" y1="90" x2="248" y2="90" {...bond} />
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
  const bond = { stroke: "var(--color-ink-faint)", strokeWidth: 2 };
  return (
    <svg viewBox="0 0 220 120" className="h-auto w-full">
      <line x1="40" y1="80" x2="90" y2="45" {...bond} />
      <line x1="90" y1="45" x2="140" y2="80" {...bond} />
      <text
        x="158"
        y="80"
        fontSize={17}
        fontWeight={700}
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
      <div className="grid gap-3 lg:grid-cols-2">
        {/* 3D viewer */}
        <div className="card overflow-hidden">
          <div
            className="h-[340px] w-full"
            style={{ background: "var(--color-mist)" }}
          >
            <Suspense fallback={null}>
              <Molecule3D mol={STAGES[stage].molecule} />
            </Suspense>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-hairline)] px-4 py-3">
            <div className="type-caption">
              <span className="font-bold">{STAGES[stage].molecule.name}</span>
              <span className="ml-2 text-[var(--color-ink-faint)]">
                {STAGES[stage].molecule.formula}
              </span>
            </div>
            <div
              className="flex gap-0.5 rounded-full p-1"
              style={{ background: "var(--color-mist)" }}
            >
              {STAGES.map((s, k) => (
                <button
                  key={s.key}
                  onClick={() => setStage(k)}
                  className="pressable type-caption relative rounded-full px-3 py-1"
                  style={{
                    color:
                      stage === k
                        ? "var(--color-ink)"
                        : "var(--color-ink-soft)",
                    fontWeight: stage === k ? 700 : 400,
                  }}
                >
                  {stage === k && (
                    <motion.span
                      layoutId="stage-pill"
                      transition={springSnap}
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        background: "var(--color-surface)",
                        boxShadow: "var(--shadow-chip)",
                      }}
                    />
                  )}
                  {s.molecule.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* representations */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card col-span-2 p-5">
            <p className="type-label text-[var(--color-ink-faint)]">
              IUPAC name
            </p>
            <p className="type-title mt-1.5" style={{ fontSize: "1.375rem" }}>
              {identity.iupac}
            </p>
            <p className="type-caption mt-1 text-[var(--color-ink-soft)]">
              also called {identity.common} · {identity.className}
            </p>
          </div>

          <div className="card p-5">
            <p className="type-label text-[var(--color-ink-faint)]">
              Molecular
            </p>
            <p className="type-equation mt-2" style={{ fontSize: "1.0625rem" }}>
              {identity.molecular}
            </p>
          </div>
          <div className="card p-5">
            <p className="type-label text-[var(--color-ink-faint)]">
              Condensed
            </p>
            <p className="type-equation mt-2" style={{ fontSize: "1.0625rem" }}>
              {identity.condensed}
            </p>
          </div>

          <div className="card p-5">
            <p className="type-label text-[var(--color-ink-faint)]">
              Displayed
            </p>
            <div className="mt-2">
              <DisplayedFormula />
            </div>
          </div>
          <div className="card p-5">
            <p className="type-label text-[var(--color-ink-faint)]">Skeletal</p>
            <div className="mt-2">
              <SkeletalFormula />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
