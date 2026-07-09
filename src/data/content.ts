// Verified reference data for chloroethane (ethyl chloride), CAS 75-00-3.
// Sources: PubChem CID 6337; standard IB Chemistry data.

export const identity = {
  iupac: "Chloroethane",
  common: "Ethyl chloride",
  className: "Halogenoalkane (primary chloroalkane)",
  molecular: "C₂H₅Cl",
  condensed: "CH₃CH₂Cl",
  empirical: "C₂H₅Cl",
  cas: "75-00-3",
};

export const properties: { label: string; value: string; note: string }[] = [
  {
    label: "Molar mass",
    value: "64.51 g mol⁻¹",
    note: "Two carbons, five hydrogens, one chlorine.",
  },
  {
    label: "Boiling point",
    value: "12.3 °C",
    note: "A gas at room temperature; a liquid when lightly pressurised or cooled.",
  },
  {
    label: "Melting point",
    value: "−138.7 °C",
    note: "Weak intermolecular forces between small molecules.",
  },
  {
    label: "State (25 °C)",
    value: "Colourless gas",
    note: "Faint ethereal odour; flammable.",
  },
  {
    label: "Solubility in water",
    value: "Low (~0.45 g/100 mL)",
    note: "The C–Cl dipole is not enough to overcome the non-polar ethyl group; miscible with ethanol and ether.",
  },
  {
    label: "Molecular polarity",
    value: "Polar",
    note: "Chlorine is more electronegative than carbon, giving a permanent C–Cl dipole (δ+ C, δ− Cl).",
  },
];

export const preparations: { title: string; equation: string; text: string }[] =
  [
    {
      title: "Electrophilic addition (industrial)",
      equation: "CH₂=CH₂ + HCl → CH₃CH₂Cl",
      text: "Adding hydrogen chloride across the double bond of ethene — an electron-pair sharing reaction from Reactivity 3.4.",
    },
    {
      title: "From ethanol",
      equation: "CH₃CH₂OH + HCl → CH₃CH₂Cl + H₂O",
      text: "The reverse of the hydrolysis you simulate above; an −OH group is replaced by −Cl.",
    },
    {
      title: "Radical substitution",
      equation: "CH₃CH₃ + Cl₂ →(UV) CH₃CH₂Cl + HCl",
      text: "The electron-sharing route from Reactivity 3.3 — historically important but gives a mixture of products.",
    },
  ];

export const applications: { title: string; text: string }[] = [
  {
    title: "Freeze spray anaesthetic",
    text: "Sprayed on skin, chloroethane boils at 12 °C and evaporates instantly, drawing heat away and numbing the area. This is why it is used as a topical 'cold spray' for minor sports injuries and small procedures — a direct consequence of its low boiling point.",
  },
  {
    title: "Refrigerants & the ozone story",
    text: "Chloroethane was an early refrigerant. Its relatives — CFCs — were once widespread until it was found that UV light splits their C–Cl bonds into chlorine radicals (Reactivity 3.3 chemistry!) that destroy stratospheric ozone. They are now banned under the Montreal Protocol.",
  },
  {
    title: "A building block in synthesis",
    text: "Because the C–Cl bond is reactive, chloroethane is used as an ethylating agent to introduce a −C₂H₅ group into other molecules, and historically to make the petrol additive tetraethyllead.",
  },
];

export interface QuizQ {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export const quiz: QuizQ[] = [
  {
    q: "Which type of bond breaking produces radicals?",
    options: ["Heterolytic fission", "Homolytic fission", "Ionic dissociation"],
    answer: 1,
    why: "In homolytic fission the bond splits evenly — each atom keeps one electron, forming radicals.",
  },
  {
    q: "A curly (double-headed) arrow represents the movement of…",
    options: ["A single electron", "A pair of electrons", "A whole atom"],
    answer: 1,
    why: "A full curly arrow = a pair of electrons. A single-electron move uses a half-headed 'fishhook' arrow.",
  },
  {
    q: "Why is the carbon of the C–Cl bond open to nucleophilic attack?",
    options: [
      "It carries a partial positive charge (δ+)",
      "It is a radical",
      "It has a lone pair",
    ],
    answer: 0,
    why: "Chlorine is more electronegative, so the carbon is electron-deficient (δ+) and attracts electron-rich nucleophiles.",
  },
  {
    q: "Chloroethane + aqueous hydroxide gives…",
    options: [
      "Ethene + HCl",
      "Ethanol + chloride ion",
      "Ethane + chlorine radical",
    ],
    answer: 1,
    why: "Hydroxide substitutes chloride: CH₃CH₂Cl + OH⁻ → CH₃CH₂OH + Cl⁻.",
  },
  {
    q: "Which is NOT a step of the radical substitution mechanism?",
    options: ["Initiation", "Propagation", "Neutralisation", "Termination"],
    answer: 2,
    why: "The three stages are initiation, propagation and termination.",
  },
];
