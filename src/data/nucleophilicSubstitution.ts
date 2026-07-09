import type { Mechanism } from "../lib/mechanism";

// Reactivity 3.4 — nucleophilic substitution of chloroethane by hydroxide.
// Overall: CH₃CH₂Cl + OH⁻ → CH₃CH₂OH + Cl⁻
// Curly (double-barb) arrows show the movement of a PAIR of electrons.
// Note: at SL the detailed SN1/SN2 mechanism is NOT assessed — but heterolytic
// fission and electron-pair donation (shown here) ARE part of the SL course.

const Y = 150;

export const nucleophilicSubstitution: Mechanism = {
  steps: [
    {
      phase: "Overview",
      title: "The reactants",
      equation: "CH₃CH₂Cl + OH⁻ → CH₃CH₂OH + Cl⁻",
      caption:
        "Chloroethane is warmed with aqueous sodium hydroxide. The hydroxide ion is the nucleophile — a species with a lone pair ready to donate.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 210, y: Y },
        { id: "cl", label: "Cl", el: "Cl", x: 330, y: Y },
        { id: "oh", label: "OH", el: "O", x: 520, y: Y, charge: "-", lonePairs: 3 },
      ],
      bonds: [{ a: "ethyl", b: "cl" }],
    },
    {
      phase: "Why it reacts",
      title: "A polar C–Cl bond",
      caption:
        "Chlorine is more electronegative than carbon, so it pulls the bonding electrons towards itself. The carbon is left electron-deficient (δ+) — a target for a nucleophile.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 210, y: Y, charge: "δ+" },
        { id: "cl", label: "Cl", el: "Cl", x: 330, y: Y, charge: "δ-" },
        { id: "oh", label: "OH", el: "O", x: 520, y: Y, charge: "-", lonePairs: 3 },
      ],
      bonds: [{ a: "ethyl", b: "cl" }],
    },
    {
      phase: "Attack",
      title: "The nucleophile donates a pair",
      caption:
        "Hydroxide uses a lone pair to attack the δ+ carbon, starting to form a new C–O bond. The curly arrow shows a pair of electrons moving from the oxygen to the carbon.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 210, y: Y, charge: "δ+" },
        { id: "cl", label: "Cl", el: "Cl", x: 330, y: Y, charge: "δ-" },
        { id: "oh", label: "OH", el: "O", x: 440, y: Y, charge: "-", lonePairs: 2 },
      ],
      bonds: [{ a: "ethyl", b: "cl" }],
      arrows: [
        { id: "c1", from: [410, 150], to: [258, 150], bend: -40, kind: "curly" },
      ],
    },
    {
      phase: "Heterolytic fission",
      title: "The C–Cl bond breaks",
      caption:
        "As the C–O bond forms, the C–Cl bond breaks heterolytically — both bonding electrons leave with the chlorine. This electron-pair sharing is the essence of Reactivity 3.4.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 210, y: Y },
        { id: "oh", label: "OH", el: "O", x: 330, y: Y, lonePairs: 2 },
        { id: "cl", label: "Cl", el: "Cl", x: 470, y: Y, charge: "δ-", lonePairs: 3 },
      ],
      bonds: [
        { a: "ethyl", b: "oh", state: "forming" },
        { a: "ethyl", b: "cl", state: "breaking" },
      ],
      arrows: [
        { id: "c1", from: [372, 140], to: [452, 148], bend: -26, kind: "curly" },
      ],
    },
    {
      phase: "Products",
      title: "Ethanol and a chloride ion",
      equation: "CH₃CH₂OH + Cl⁻",
      caption:
        "Ethanol has formed and chloride is the leaving group. This hydrolysis turns a halogenoalkane into an alcohol — one of the family's most important reactions.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 250, y: Y },
        { id: "oh", label: "OH", el: "O", x: 370, y: Y, lonePairs: 2 },
        { id: "cl", label: "Cl", el: "Cl", x: 540, y: Y, charge: "-", lonePairs: 4 },
      ],
      bonds: [{ a: "ethyl", b: "oh" }],
    },
  ],
};
