"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Formas low-poly pastel y patrón de puntos, con capas a distinta velocidad.
   El parallax se anula por CSS con prefers-reduced-motion (.parallax-layer). */
export default function FondoParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lento = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const medio = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rapido = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div style={{ y: lento }} className="parallax-layer absolute inset-0">
        <div className="fondo-puntos absolute inset-0" />
      </motion.div>

      <motion.div
        style={{ y: medio }}
        className="parallax-layer absolute -left-16 top-[8%] h-64 w-64 sm:h-96 sm:w-96"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <polygon points="10,120 100,10 190,90" fill="#d8eb69" opacity="0.35" />
          <polygon points="10,120 190,90 120,190" fill="#9dbc6c" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: rapido }}
        className="parallax-layer absolute -right-12 top-[45%] h-56 w-56 sm:h-80 sm:w-80"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <polygon points="20,40 180,20 130,150" fill="#ffffff" opacity="0.3" />
          <polygon points="130,150 180,20 190,180" fill="#c1633b" opacity="0.14" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: medio }}
        className="parallax-layer absolute bottom-[4%] left-[30%] h-40 w-40 sm:h-64 sm:w-64"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <polygon points="0,160 80,20 170,140" fill="#0e2e45" opacity="0.1" />
        </svg>
      </motion.div>
    </div>
  );
}
