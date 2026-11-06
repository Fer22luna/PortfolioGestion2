"use client";

import { ArrowUp, MapPin } from "lucide-react";
import Reveal from "@/components/soluciones/Reveal";
import { FOOTER, SOCIAL } from "@/data/footer";
import { FOOTER_LINKS } from "@/data/nav";
import SiluetaCiudad from "./SiluetaCiudad";

export default function Footer() {
  const redes = SOCIAL.filter((r) => r.url.trim() !== "");

  return (
    <footer
      id="contacto"
      className="relative mt-24 scroll-mt-24 bg-gradient-to-b from-[#0e2e45] to-[#0a2236] text-[#e6f0f5] sm:mt-32"
    >
      <SiluetaCiudad />

      <div className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:pt-16">
        <Reveal className="flex flex-col items-center text-center">
          <p
            className="titulo-sin-cortes flex items-center gap-3 text-2xl font-bold tracking-[0.3em] sm:gap-4 sm:text-3xl"
            aria-label="MERIDIANO"
          >
            <span aria-hidden className="h-0.5 w-6 bg-[#c1633b] sm:w-10" />
            <span aria-hidden>MERIDIANO</span>
            <span aria-hidden className="h-0.5 w-6 bg-[#c1633b] sm:w-10" />
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9db8c9] sm:text-lg">
            {FOOTER.descripcion}
          </p>

          <a
            href={`mailto:${FOOTER.email}`}
            className="btn btn-cta mt-8 max-w-full flex-wrap gap-x-1.5 whitespace-normal! px-6 py-3.5 text-center text-base sm:px-8 sm:text-lg"
          >
            <span>Escribinos a</span>
            <span>{FOOTER.email}</span>
          </a>

          <p className="mt-5 flex items-center gap-2 text-[#9db8c9]">
            <MapPin aria-hidden className="h-4 w-4 text-[#c1633b]" />
            {FOOTER.ubicacion}
          </p>

          <nav aria-label="Pie de página" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                                  className="inline-flex min-h-11 items-center rounded font-semibold text-[#e6f0f5] decoration-[#c1633b] decoration-2 underline-offset-8 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <hr className="my-8 border-0 border-t border-[#9db8c9]/25" />

        <div className="flex flex-col items-center gap-5 text-sm text-[#9db8c9] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {FOOTER.derechos}</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {redes.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {redes.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${r.label} (se abre en una pestaña nueva)`}
                      className="rounded font-semibold text-[#e6f0f5] decoration-[#c1633b] decoration-2 underline-offset-4 hover:underline"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#9db8c9]/40 px-3.5 py-1.5 font-semibold text-[#e6f0f5] transition-colors hover:border-[#c1633b]"
            >
              <ArrowUp aria-hidden className="h-4 w-4" />
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
