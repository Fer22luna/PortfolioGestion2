"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { STEPS } from "@/lib/steps";
import GlassCard from "./GlassCard";

const CityCanvas = dynamic(() => import("./CityCanvas"), { ssr: false });

const LAST = STEPS.length - 1;

export default function ScrollScene() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(LAST, Math.max(0, Math.round(p * LAST)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + index * window.innerHeight });
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <CityCanvas step={STEPS[active]} stepIndex={active} />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-4 lg:inset-x-auto lg:bottom-auto lg:right-[4vw] lg:top-1/2 lg:-translate-y-1/2 lg:flex-row lg:gap-6 lg:p-0">
          <div
            role="tablist"
            aria-label="Pasos"
            className="flex gap-3 lg:flex-col"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Ir al paso ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-3 w-3 rounded-full border border-white transition-all duration-300 ${
                  i === active
                    ? "scale-125 bg-white"
                    : "bg-transparent hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <GlassCard step={STEPS[active]} />
        </div>
      </div>

      {/* Secciones invisibles: definen los puntos de snap de cada paso */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className="h-screen"
            style={{ scrollSnapAlign: "start" }}
          />
        ))}
      </div>
    </section>
  );
}
