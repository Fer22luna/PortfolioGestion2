"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// reducedMotion="user" anula los desplazamientos si el sistema pide menos movimiento
// y deja solo el fade, sin cambiar el markup entre servidor y cliente.
export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
