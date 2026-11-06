"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVBAR_LINKS, NAV_CTA, NAV_SECUNDARIO } from "@/data/nav";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [actual, setActual] = useState<string | null>(null);
  const pathname = usePathname();
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  const cerrar = useCallback(() => {
    setAbierto(false);
    botonRef.current?.focus({ preventScroll: true });
  }, []);

  // Esc, tocar fuera y pasar a escritorio
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) cerrar();
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setAbierto(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [abierto, cerrar]);

  // Bloquea el scroll del fondo mientras el menú está abierto
  useEffect(() => {
    if (!abierto) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [abierto]);

  // Sección actual: la última (en orden de página) que cruza la franja central
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = NAVBAR_LINKS.map((l) => l.id);
    const dentro = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) dentro.add(e.target.id);
          else dentro.delete(e.target.id);
        }
        const id = [...ids].reverse().find((s) => dentro.has(s));
        if (id) setActual(id);
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    for (const s of ids) {
      const el = document.getElementById(s);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  const actualEnPagina = pathname === "/" ? actual : null;

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
    >
      <div className="relative w-full" style={{ maxWidth: "var(--nav-max-width)" }}>
        <nav
          aria-label="Principal"
          className="nav-pill flex w-full items-center justify-between gap-4 py-2.5 pl-6 pr-2.5"
        >
          <Link
            href="/#inicio"
            className="rounded text-lg font-bold tracking-[0.14em] text-[var(--nav-text)]"
          >
            MERIDIANO
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAVBAR_LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  aria-current={actualEnPagina === l.id ? "location" : undefined}
                  className={`relative inline-flex items-center rounded-full px-3 py-2 text-[15px] font-semibold transition-colors ${
                    actualEnPagina === l.id
                      ? "text-[var(--nav-text)]"
                      : "text-[var(--nav-text-muted)] hover:text-[var(--nav-text)]"
                  }`}
                >
                  {l.label}
                  {actualEnPagina === l.id && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-0.5 h-0.5 rounded bg-[var(--brand-terracota)]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Link
                href={`/#${NAV_CTA.id}`}
                className="btn btn-cta px-5 py-2.5 text-[15px]"
              >
                {NAV_CTA.label}
              </Link>
            </div>
            <button
              ref={botonRef}
              type="button"
              aria-expanded={abierto}
              aria-controls={panelId}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              onClick={() => (abierto ? cerrar() : setAbierto(true))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--nav-text)] transition-colors hover:bg-[#eaf1f5] lg:hidden"
            >
              {abierto ? (
                <X aria-hidden className="h-6 w-6" />
              ) : (
                <Menu aria-hidden className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {abierto && (
          <div
            id={panelId}
            className="menu-panel nav-pill absolute inset-x-0 top-full mt-2 overflow-y-auto overscroll-contain p-3 lg:hidden"
            style={{
              borderRadius: "28px",
              maxHeight: "calc(100dvh - env(safe-area-inset-top, 0px) - 6.5rem)",
            }}
          >
            <ul className="flex flex-col">
              {NAVBAR_LINKS.map((l) => (
                <li key={l.id}>
                  <Link
                    href={l.href}
                    onClick={cerrar}
                    aria-current={actualEnPagina === l.id ? "location" : undefined}
                    className={`flex min-h-12 items-center rounded-2xl px-4 text-lg font-semibold ${
                      actualEnPagina === l.id
                        ? "bg-[#eaf1f5] text-[var(--brand-azul)] shadow-[inset_4px_0_0_var(--brand-terracota)]"
                        : "text-[var(--nav-text)] hover:bg-[#f3f7f9]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#0e2e45]/10 pt-3">
              <Link
                href={`/#${NAV_SECUNDARIO.id}`}
                onClick={cerrar}
                className="btn btn-outline min-h-12 w-full px-5 py-2.5 text-base"
              >
                {NAV_SECUNDARIO.label}
              </Link>
              <Link
                href={`/#${NAV_CTA.id}`}
                onClick={cerrar}
                className="btn btn-cta min-h-12 w-full px-5 py-2.5 text-base"
              >
                {NAV_CTA.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
