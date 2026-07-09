// Data model for a step-by-step reaction mechanism rendered as animated SVG.

export interface SAtom {
  id: string; // stable id → Framer Motion tweens position across steps
  label: string; // "C", "Cl", "OH", "CH₃CH₂" …
  el: "C" | "H" | "Cl" | "O" | "group"; // colour class
  x: number;
  y: number;
  charge?: "+" | "-" | "δ+" | "δ-";
  radical?: boolean; // draw a single unpaired-electron dot
  lonePairs?: number; // number of lone-pair dot-pairs to draw
}

export interface SBond {
  a: string; // atom id
  b: string; // atom id
  state?: "normal" | "breaking" | "forming";
}

export interface SArrow {
  id: string;
  from: [number, number];
  to: [number, number];
  bend: number;
  kind: "curly" | "fishhook"; // pair (double barb) vs single electron (half barb)
}

export interface Step {
  phase: string; // "Initiation", "Propagation" …
  title: string;
  caption: string;
  equation?: string;
  atoms: SAtom[];
  bonds: SBond[];
  arrows?: SArrow[];
}

export interface Mechanism {
  steps: Step[];
}
