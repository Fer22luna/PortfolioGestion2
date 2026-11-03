"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Step } from "@/lib/steps";

type Props = {
  step: Step;
};

export default function GlassCard({ step }: Props) {
  return (
    <div className="glass-card w-full p-8 sm:p-10 lg:w-[560px] lg:p-12">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-5"
        >
          <p className="card-eyebrow">{step.eyebrow}</p>
          <h1 className="card-title titulo-sin-cortes">{step.title}</h1>
          <p className="card-body texto-sin-cortes">{step.body}</p>
          <div className="pt-2">
            <a
              href={step.cta.href}
              className="btn btn-cta px-8 py-3.5 text-lg"
            >
              {step.cta.label}
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
