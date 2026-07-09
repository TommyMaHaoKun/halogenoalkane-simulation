import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Structure from "./components/Structure";
import Properties from "./components/Properties";
import ReactionSection from "./components/ReactionSection";
import Preparation from "./components/Preparation";
import Applications from "./components/Applications";
import Quiz from "./components/Quiz";
import Footer from "./components/Footer";
import { radicalSubstitution } from "./data/radicalSubstitution";
import { nucleophilicSubstitution } from "./data/nucleophilicSubstitution";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Structure />
        <Properties />

        <ReactionSection
          id="formation"
          eyebrow="Reactivity 3.3 · Electron sharing"
          title="How chloroethane is made"
          lead="Chlorine and ethane react by radical substitution. Because radicals carry a single unpaired electron, every step moves electrons one at a time — shown here with fishhook arrows."
          mechanism={radicalSubstitution}
          accent="#f5a623"
          note="At SL you are expected to know this mechanism in three stages — initiation, propagation and termination — and to write equations for each step."
        />

        <ReactionSection
          id="reaction"
          eyebrow="Reactivity 3.4 · Electron-pair sharing"
          title="How chloroethane reacts"
          lead="Warmed with aqueous hydroxide, chloroethane undergoes nucleophilic substitution. A lone pair attacks the δ+ carbon and the C–Cl bond breaks heterolytically — a pair of electrons at a time, shown with curly arrows."
          mechanism={nucleophilicSubstitution}
          accent="#0071e3"
          note="At SL the reaction and its equation are assessed, but the detailed SN1/SN2 mechanism is HL. The curly arrows here show the electron-pair sharing and heterolytic fission that the SL course does cover."
          wash
        />

        <Preparation />
        <Applications />
        <Quiz />
        <Footer />
      </main>
    </>
  );
}
