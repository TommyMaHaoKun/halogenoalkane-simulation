import { useEffect, useState } from "react";

const LINKS = [
  { href: "#structure", label: "Structure" },
  { href: "#properties", label: "Properties" },
  { href: "#formation", label: "Formation" },
  { href: "#reaction", label: "Reaction" },
  { href: "#uses", label: "Uses" },
  { href: "#quiz", label: "Quiz" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
  }
  return "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-ink)] transition hover:bg-[var(--color-mist)]"
    >
      {isDark ? (
        // sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

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
        background: solid ? "var(--color-glass)" : "transparent",
        backdropFilter: solid ? "saturate(180%) blur(20px)" : "none",
        borderBottom: solid
          ? "1px solid var(--color-hairline)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-14">
        <a href="#top" className="text-base font-semibold tracking-tight">
          C₂H₅Cl
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden gap-6 md:flex">
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
