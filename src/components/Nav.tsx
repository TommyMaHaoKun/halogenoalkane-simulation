import { useEffect, useState } from "react";

const LINKS = [
  { href: "#structure", label: "Structure" },
  { href: "#properties", label: "Properties" },
  { href: "#formation", label: "Formation" },
  { href: "#reaction", label: "Reaction" },
  { href: "#uses", label: "Uses" },
  { href: "#quiz", label: "Quiz" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: solid ? "rgba(255,255,255,0.72)" : "transparent",
        backdropFilter: solid ? "saturate(180%) blur(20px)" : "none",
        borderBottom: solid ? "1px solid var(--color-hairline)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-12">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          C₂H₅Cl
        </a>
        <ul className="hidden gap-7 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
