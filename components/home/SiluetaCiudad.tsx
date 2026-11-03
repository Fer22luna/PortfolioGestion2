"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Forma = { edificio: string; arbol?: string };

// Pseudoaleatorio determinista: el mismo dibujo en servidor y cliente.
function construir(offset: number, base: number, altoMin: number, variacion: number) {
  const formas: Forma[] = [];
  let x = -20;
  let i = offset;
  while (x < 1460) {
    const w = 38 + ((i * 37) % 46);
    const h = altoMin + ((i * 53) % variacion);
    const inclinacion = ((i % 3) - 1) * 9;
    formas.push({
      edificio: `${x},${base} ${x},${base - h} ${x + w},${base - h - inclinacion} ${x + w},${base}`,
    });
    x += w;
    if (i % 4 === 1) {
      const t = 26 + ((i * 11) % 14);
      formas.push({
        edificio: `${x},${base} ${x + t / 2},${base - t * 1.5} ${x + t},${base}`,
      });
      x += t + 4;
    }
    i += 1;
  }
  return formas;
}

const FONDO = construir(3, 120, 26, 40);
const FRENTE = construir(0, 120, 14, 36);

/* Borde superior del footer: silueta low-poly de edificios y árboles en el
   mismo azul del footer. La capa de atrás se mueve apenas con el scroll. */
export default function SiluetaCiudad() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [14, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] h-14 sm:h-20 lg:h-24"
    >
      <motion.svg
        style={{ y }}
        className="parallax-layer absolute inset-0 h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMax slice"
      >
        <g fill="#0E2E45" opacity="0.45">
          {FONDO.map((f, i) => (
            <polygon key={i} points={f.edificio} />
          ))}
        </g>
      </motion.svg>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMax slice"
      >
        <g fill="#0E2E45">
          {FRENTE.map((f, i) => (
            <polygon key={i} points={f.edificio} />
          ))}
        </g>
      </svg>
    </div>
  );
}
