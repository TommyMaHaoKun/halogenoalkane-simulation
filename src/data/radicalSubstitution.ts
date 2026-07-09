import type { Mechanism } from "../lib/mechanism";

// Reactivity 3.3 — free-radical substitution of ethane by chlorine.
// Overall: CH₃CH₃ + Cl₂ →(UV) CH₃CH₂Cl + HCl
// Fishhook (single-barb) arrows show the movement of ONE electron.

const Y = 150;

export const radicalSubstitution: Mechanism = {
  steps: [
    {
      phase: "Overview",
      title: "The reactants",
      equation: "CH₃CH₃ + Cl₂ → CH₃CH₂Cl + HCl",
      caption:
        "Ethane and chlorine do not react in the dark. Ultraviolet light is needed to start the reaction — a clue that radicals are involved.",
      atoms: [
        { id: "ethane", label: "CH₃CH₃", el: "group", x: 200, y: Y },
        { id: "clA", label: "Cl", el: "Cl", x: 470, y: Y },
        { id: "clB", label: "Cl", el: "Cl", x: 560, y: Y },
      ],
      bonds: [{ a: "clA", b: "clB" }],
    },
    {
      phase: "Initiation",
      title: "Homolytic fission of chlorine",
      equation: "Cl₂ →(UV) 2 Cl•",
      caption:
        "UV light supplies enough energy to break the Cl–Cl bond evenly. Each chlorine atom keeps one electron, producing two highly reactive chlorine radicals.",
      atoms: [
        { id: "ethane", label: "CH₃CH₃", el: "group", x: 160, y: Y },
        { id: "clA", label: "Cl", el: "Cl", x: 380, y: Y, radical: true },
        { id: "clB", label: "Cl", el: "Cl", x: 520, y: Y, radical: true },
      ],
      bonds: [{ a: "clA", b: "clB", state: "breaking" }],
      arrows: [
        { id: "f1", from: [450, 138], to: [408, 150], bend: -22, kind: "fishhook" },
        { id: "f2", from: [450, 138], to: [492, 150], bend: 22, kind: "fishhook" },
      ],
    },
    {
      phase: "Propagation · step 1",
      title: "A radical attacks ethane",
      equation: "CH₃CH₃ + Cl• → CH₃CH₂• + HCl",
      caption:
        "A chlorine radical removes a hydrogen atom from ethane. The C–H bond breaks homolytically: one electron forms H–Cl, the other stays on carbon — creating an ethyl radical.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 210, y: Y },
        { id: "hAbs", label: "H", el: "H", x: 320, y: Y },
        { id: "clA", label: "Cl", el: "Cl", x: 440, y: Y, radical: true },
      ],
      bonds: [{ a: "ethyl", b: "hAbs", state: "breaking" }],
      arrows: [
        { id: "f1", from: [300, 140], to: [250, 150], bend: -22, kind: "fishhook" },
        { id: "f2", from: [320, 140], to: [410, 150], bend: -20, kind: "fishhook" },
      ],
    },
    {
      phase: "Propagation · step 2",
      title: "The ethyl radical meets chlorine",
      equation: "CH₃CH₂• + Cl₂ → CH₃CH₂Cl + Cl•",
      caption:
        "The ethyl radical reacts with a chlorine molecule, forming chloroethane and regenerating a chlorine radical. That new radical keeps the chain going — one photon can cause many reactions.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 190, y: Y, radical: true },
        { id: "clC", label: "Cl", el: "Cl", x: 380, y: Y },
        { id: "clD", label: "Cl", el: "Cl", x: 480, y: Y },
      ],
      bonds: [{ a: "clC", b: "clD", state: "breaking" }],
      arrows: [
        { id: "f1", from: [232, 150], to: [352, 150], bend: -26, kind: "fishhook" },
        { id: "f2", from: [430, 138], to: [388, 150], bend: -18, kind: "fishhook" },
        { id: "f3", from: [430, 138], to: [478, 150], bend: 18, kind: "fishhook" },
      ],
    },
    {
      phase: "Termination",
      title: "Two radicals combine",
      equation: "CH₃CH₂• + Cl• → CH₃CH₂Cl",
      caption:
        "When any two radicals meet, their unpaired electrons pair up to form a bond. No new radical is made, so this step removes radicals and ends the chain.",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 250, y: Y, radical: true },
        { id: "clA", label: "Cl", el: "Cl", x: 450, y: Y, radical: true },
      ],
      bonds: [],
      arrows: [
        { id: "f1", from: [292, 150], to: [345, 150], bend: -20, kind: "fishhook" },
        { id: "f2", from: [420, 150], to: [368, 150], bend: -20, kind: "fishhook" },
      ],
    },
    {
      phase: "Product",
      title: "Chloroethane is formed",
      equation: "CH₃CH₂Cl",
      caption:
        "Chloroethane — our featured halogenoalkane. Because radicals are hard to control, further substitution also occurs, so the real reaction gives a mixture (e.g. some 1,1-dichloroethane too).",
      atoms: [
        { id: "ethyl", label: "CH₃CH₂", el: "group", x: 290, y: Y },
        { id: "clA", label: "Cl", el: "Cl", x: 420, y: Y },
      ],
      bonds: [{ a: "ethyl", b: "clA", state: "forming" }],
    },
  ],
};
