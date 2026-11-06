"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  BarChart3,
  Eye,
  Handshake,
  Leaf,
  Lightbulb,
  MousePointerClick,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { VALORES, type IconoValor } from "@/data/valores";

const ICONOS: Record<IconoValor, LucideIcon> = {
  innovacion: Lightbulb,
  impacto: Target,
  cercania: Users,
  colaboracion: Handshake,
  datos: BarChart3,
  simplicidad: MousePointerClick,
  transparencia: Eye,
  sostenibilidad: Leaf,
};

const INTERVALO_MS = 6000;
const num = (i: number) => String(i + 1).padStart(2, "0");

type Props = { rootRef: React.RefObject<HTMLElement | null> };

export default function ValoresInteractivos({ rootRef }: Props) {
  const uid = useId();
  const [activo, setActivo] = useState(0);
  const [abierto, setAbierto] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [interactuo, setInteractuo] = useState(false);
  const [reducido, setReducido] = useState(true);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducido(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);

  // Auto-avance solo en escritorio (el acordeón móvil no cambia solo)
  useEffect(() => {
    if (reducido || interactuo || pausado || !visible) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const t = window.setInterval(
      () => setActivo((a) => (a + 1) % VALORES.length),
      INTERVALO_MS,
    );
    return () => window.clearInterval(t);
  }, [reducido, interactuo, pausado, visible]);

  const elegir = useCallback((i: number, foco = false) => {
    setInteractuo(true);
    setActivo(i);
    if (foco) tabsRef.current[i]?.focus();
  }, []);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = VALORES.length;
    let sig: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") sig = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") sig = (i - 1 + n) % n;
    else if (e.key === "Home") sig = 0;
    else if (e.key === "End") sig = n - 1;
    if (sig === null) return;
    e.preventDefault();
    elegir(sig, true);
  };

  const v = VALORES[activo];
  const Icono = ICONOS[v.icono];
  const panelId = `${uid}-panel`;

  return (
    <>
      {/* Escritorio: pestañas + panel */}
      <div
        className="hidden gap-x-12 lg:grid lg:grid-cols-12"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        <div className="col-span-5">
          <div
            role="tablist"
            aria-label="Nuestros valores"
            aria-orientation="vertical"
            className="valores-lista relative border-t border-white/[0.12]"
            style={{ ["--i" as string]: activo }}
          >
            <span
              aria-hidden
              className="valores-marcador absolute left-0 top-0 h-[4.5rem] w-1 bg-[#c1633b]"
            />
            {VALORES.map((val, i) => {
              const on = i === activo;
              return (
                <button
                  key={val.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={panelId}
                  tabIndex={on ? 0 : -1}
                  onClick={() => elegir(i)}
                  onMouseEnter={() => elegir(i)}
                  onFocus={() => elegir(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="flex h-[4.5rem] w-full items-center gap-5 border-b border-white/[0.12] pl-6 text-left outline-offset-[-3px]"
                >
                  <span
                    className={`w-8 shrink-0 text-base font-bold tracking-widest transition-colors ${
                      on ? "text-[#e7926b]" : "text-[#9db8c9]"
                    }`}
                  >
                    {num(i)}
                  </span>
                  <span
                    className={`titulo-sin-cortes whitespace-nowrap text-[clamp(1.5rem,1.1rem+1vw,2.125rem)] font-bold leading-none transition-colors ${
                      on ? "text-white" : "text-[#9db8c9]"
                    }`}
                  >
                    {val.titulo}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-7">
          <div
            role="tabpanel"
            id={panelId}
            aria-labelledby={`${uid}-tab-${activo}`}
            tabIndex={0}
            className="sticky top-32 overflow-hidden border-l border-white/[0.12] py-6 pl-12 pr-4"
            style={{ minHeight: "22rem" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-6 select-none text-[12rem] font-bold leading-none text-white/[0.06]"
            >
              {num(activo)}
            </span>
            <div key={v.id} className="valores-detalle relative">
              <Icono aria-hidden strokeWidth={1.25} className="h-20 w-20 text-[#c1633b]" />
              <h3 className="titulo-sin-cortes mt-8 text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold leading-tight text-white">
                {v.titulo}
              </h3>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#e6f0f5]">
                {v.descripcion}
              </p>
              {v.ampliado && (
                <div className="mt-6 max-w-xl border-t border-white/[0.12] pt-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#e7926b]">
                    Cómo lo aplicamos
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-[#9db8c9]">
                    {v.ampliado}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Móvil y tablet: acordeón */}
      <ul className="border-t border-white/[0.12] lg:hidden">
        {VALORES.map((val, i) => {
          const on = abierto === i;
          const IconoM = ICONOS[val.icono];
          return (
            <li key={val.id} className="border-b border-white/[0.12]">
              <h3>
                <button
                  type="button"
                  id={`${uid}-acc-${i}`}
                  aria-expanded={on}
                  aria-controls={`${uid}-reg-${i}`}
                  onClick={() => setAbierto(on ? null : i)}
                  className="flex min-h-14 w-full items-center gap-4 py-3 text-left"
                >
                  <span
                    className={`w-8 shrink-0 text-base font-bold tracking-widest ${
                      on ? "text-[#e7926b]" : "text-[#9db8c9]"
                    }`}
                  >
                    {num(i)}
                  </span>
                  <span
                    className={`titulo-sin-cortes flex-1 text-[clamp(1.375rem,5vw,1.75rem)] font-bold leading-tight ${
                      on ? "text-white" : "text-[#9db8c9]"
                    }`}
                  >
                    {val.titulo}
                  </span>
                  <span
                    aria-hidden
                    className={`valores-chevron h-2.5 w-2.5 shrink-0 border-b-2 border-r-2 border-[#9db8c9] ${
                      on ? "rotate-[225deg]" : "rotate-45"
                    }`}
                  />
                </button>
              </h3>
              <div
                id={`${uid}-reg-${i}`}
                role="region"
                aria-labelledby={`${uid}-acc-${i}`}
                className={`valores-colapso ${on ? "valores-colapso-abierto" : ""}`}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pl-12">
                    <IconoM
                      aria-hidden
                      strokeWidth={1.25}
                      className="h-12 w-12 text-[#c1633b]"
                    />
                    <p className="mt-4 text-lg leading-relaxed text-[#e6f0f5]">
                      {val.descripcion}
                    </p>
                    {val.ampliado && (
                      <div className="mt-4">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#e7926b]">
                          Cómo lo aplicamos
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-[#9db8c9]">
                          {val.ampliado}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
