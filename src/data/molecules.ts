// 3D molecular geometries for the ball-and-stick viewer.
// Coordinates are idealised (tetrahedral carbons, standard bond lengths in Å):
//   C–C 1.54, C–H 1.09, C–Cl 1.78, C–O 1.43, O–H 0.96.
// They are approximate but geometrically faithful for teaching structure.

export type Element = "C" | "H" | "Cl" | "O";

export interface Atom {
  el: Element;
  pos: [number, number, number];
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  atoms: Atom[];
  bonds: [number, number][]; // indices into atoms
}

// Hex values mirror the CPK CSS variables in index.css (WebGL cannot read CSS vars).
export const ELEMENTS: Record<
  Element,
  { color: string; radius: number; label: string }
> = {
  C: { color: "#3a3a3c", radius: 0.42, label: "Carbon" },
  H: { color: "#e9e9ee", radius: 0.29, label: "Hydrogen" },
  Cl: { color: "#3ba55d", radius: 0.57, label: "Chlorine" },
  O: { color: "#e5484d", radius: 0.4, label: "Oxygen" },
};

// Shared ethyl skeleton (two carbons + methyl hydrogens), reused across stages.
const C1: [number, number, number] = [0, 0, 0];
const C2: [number, number, number] = [0.889, 0.889, 0.889];
const Hme1: [number, number, number] = [0.629, -0.629, -0.629];
const Hme2: [number, number, number] = [-0.629, 0.629, -0.629];
const Hme3: [number, number, number] = [-0.629, -0.629, 0.629];
const Hb: [number, number, number] = [1.518, 0.26, 1.518];
const Hc: [number, number, number] = [1.518, 1.518, 0.26];

export const ethane: Molecule = {
  id: "ethane",
  name: "Ethane",
  formula: "C₂H₆",
  atoms: [
    { el: "C", pos: C1 },
    { el: "C", pos: C2 },
    { el: "H", pos: Hme1 },
    { el: "H", pos: Hme2 },
    { el: "H", pos: Hme3 },
    { el: "H", pos: [0.26, 1.518, 1.518] },
    { el: "H", pos: Hb },
    { el: "H", pos: Hc },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
};

export const chloroethane: Molecule = {
  id: "chloroethane",
  name: "Chloroethane",
  formula: "C₂H₅Cl",
  atoms: [
    { el: "C", pos: C1 },
    { el: "C", pos: C2 },
    { el: "H", pos: Hme1 },
    { el: "H", pos: Hme2 },
    { el: "H", pos: Hme3 },
    { el: "Cl", pos: [-0.139, 1.917, 1.917] },
    { el: "H", pos: Hb },
    { el: "H", pos: Hc },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
};

export const ethanol: Molecule = {
  id: "ethanol",
  name: "Ethanol",
  formula: "C₂H₅OH",
  atoms: [
    { el: "C", pos: C1 },
    { el: "C", pos: C2 },
    { el: "H", pos: Hme1 },
    { el: "H", pos: Hme2 },
    { el: "H", pos: Hme3 },
    { el: "O", pos: [0.064, 1.715, 1.715] },
    { el: "H", pos: Hb },
    { el: "H", pos: Hc },
    { el: "H", pos: [-0.54, 1.273, 2.318] },
  ],
  bonds: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [5, 8],
  ],
};

export const STAGES: { key: string; caption: string; molecule: Molecule }[] = [
  { key: "before", caption: "Reactant (R3.3)", molecule: ethane },
  { key: "focus", caption: "Chloroethane", molecule: chloroethane },
  { key: "after", caption: "Product (R3.4)", molecule: ethanol },
];
