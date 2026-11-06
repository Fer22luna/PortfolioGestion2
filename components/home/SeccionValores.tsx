"use client";

import { useRef } from "react";
import { VALORES_SUBTITULO, VALORES_TITULO } from "@/data/valores";
import ValoresInteractivos from "./ValoresInteractivos";

/* Meridianos y paralelos: arcos finos, solo decoración */
function PatronMeridianos() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      stroke="#fff"
      strokeOpacity="0.06"
      strokeWidth="1"
    >
      {[80, 190, 300, 410, 520].map((rx) => (
        <ellipse key={rx} cx="900" cy="400" rx={rx} ry="460" />
      ))}
      <line x1="900" y1="-60" x2="900" y2="860" />
      {[150, 270, 390, 510, 630].map((y) => (
        <path key={y} d={`M0 ${y} Q 600 ${y + 140} 1200 ${y}`} />
      ))}
    </svg>
  );
}

export default function SeccionValores() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id="valores"
      aria-labelledby="valores-titulo"
      className="relative my-16 scroll-mt-24 bg-gradient-to-b from-[#0e2e45] to-[#0a2236] sm:my-24"
    >
      {/* Bordes curvos que enganchan con el degradé de las secciones vecinas */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-full block h-10 w-full sm:h-16"
        fill="#0e2e45"
      >
        <path d="M0 80 L0 56 Q 720 -40 1440 56 L1440 80 Z" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-full block h-10 w-full sm:h-16"
        fill="#0a2236"
      >
        <path d="M0 0 L0 24 Q 720 120 1440 24 L1440 0 Z" />
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <PatronMeridianos />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <h2
            id="valores-titulo"
            className="titulo-sin-cortes text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold leading-tight text-[#e6f0f5]"
          >
            {VALORES_TITULO}
          </h2>
          <p className="texto-sin-cortes mt-3 text-lg text-[#9db8c9]">
            {VALORES_SUBTITULO}
          </p>
        </div>
        <ValoresInteractivos rootRef={ref} />
      </div>
    </section>
  );
}
