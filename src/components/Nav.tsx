import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { springSnap } from "../lib/motion";

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
      className="pressable flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-ink)] hover:bg-[var(--color-mist)]"
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.2v2.1M12 19.7v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M2.2 12h2.1M19.7 12h2.1M4.5 19.5l1.5-1.5M18 6l1.5-1.5" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wayfinding: always answer "where am I?" (§16)
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "material-chrome" : ""
      }`}
      style={{
        borderBottom: `1px solid ${
          scrolled ? "var(--color-hairline)" : "transparent"
        }`,
      }}
    >
      <nav className="mx-auto flex h-13 max-w-5xl items-center gap-4 px-5 sm:px-6" style={{ height: "3.25rem" }}>
        <a
          href="#top"
          className="pressable-subtle type-heading flex-none tracking-tight"
        >
          C₂H₅Cl
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className="pressable-subtle type-caption relative block rounded-full px-3 py-1.5 transition-colors"
                  style={{
                    color: isActive
                      ? "var(--color-ink)"
                      : "var(--color-ink-soft)",
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={springSnap}
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "var(--color-mist)" }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto md:ml-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
