"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EPIGRAFE_IMAGEN, type Solucion } from "@/data/soluciones";
import Reveal from "./Reveal";

type Props = {
  imagen: Solucion["imagen"];
  acento: Solucion["acento"];
  sizes: string;
  priority?: boolean;
  // Altura fija para que las imágenes de distintas proporciones queden alineadas en las cards.
  compact?: boolean;
  className?: string;
};

export default function ImagenMockup({
  imagen,
  acento,
  sizes,
  priority = false,
  compact = false,
  className = "",
}: Props) {
  return (
    <figure
      className={`relative isolate mx-auto w-full ${className}`}
      style={compact ? undefined : { maxWidth: imagen.width }}
    >
      <div aria-hidden="true" className={`mockup-glow mockup-glow-${acento}`} />
      <Reveal className={compact ? "flex h-44 items-center justify-center sm:h-48" : ""}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className={compact ? "flex h-full items-center justify-center" : ""}
        >
          <Image
            src={imagen.src}
            alt={imagen.alt}
            width={imagen.width}
            height={imagen.height}
            sizes={sizes}
            priority={priority}
            placeholder="empty"
            quality={90}
            className={
              compact ? "h-full max-h-44 w-auto max-w-full object-contain sm:max-h-48" : "h-auto w-full"
            }
          />
        </motion.div>
      </Reveal>
      <figcaption className="mt-1 text-center text-xs text-[var(--nav-text-muted)]">
        {EPIGRAFE_IMAGEN}
      </figcaption>
    </figure>
  );
}
