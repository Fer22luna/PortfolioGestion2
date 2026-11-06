"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/* Contador de FPS opcional. Se activa con ?perf=1 y solo existe en desarrollo
   o si se compila con NEXT_PUBLIC_PERF=1; en producción normal no se incluye. */
const HABILITADO =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_PERF === "1";

function Contador() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let largos = 0;
    let ultimo = performance.now();
    let desde = ultimo;
    const tick = (t: number) => {
      frames += 1;
      if (t - ultimo > 50) largos += 1;
      ultimo = t;
      if (t - desde >= 500) {
        const fps = Math.round((frames * 1000) / (t - desde));
        if (ref.current) ref.current.textContent = `${fps} FPS · ${largos} frames >50 ms`;
        frames = 0;
        largos = 0;
        desde = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed bottom-2 left-2 z-[100] rounded bg-black/80 px-2 py-1 font-mono text-xs text-white"
    >
      -- FPS
    </div>
  );
}

const sinSuscripcion = () => () => {};

export default function PerfFps() {
  // Snapshot de servidor en false para no desfasar la hidratación
  const activo = useSyncExternalStore(
    sinSuscripcion,
    () => new URLSearchParams(window.location.search).get("perf") === "1",
    () => false,
  );
  if (!HABILITADO || !activo) return null;
  return <Contador />;
}
