"use client";

import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { KeyboardEvent, SyntheticEvent } from "react";
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
import { VALORES, type IconoValor, type Valor } from "@/data/valores";

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
const N = VALORES.length;
const num = (i: number) => String(i + 1).padStart(2, "0");

// Snapshot de servidor en false: el HTML inicial es el acordeón y no hay mismatch al hidratar
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const indiceDe = (e: SyntheticEvent) => {
  const tab = (e.target as HTMLElement).closest<HTMLElement>("[role=tab]");
  return tab ? Number(tab.dataset.i) : -1;
};

/* ---------- Escritorio: pestañas + paneles apilados ---------- */

const Fila = memo(function Fila({
  i,
  titulo,
  on,
  uid,
}: {
  i: number;
  titulo: string;
  on: boolean;
  uid: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      data-i={i}
      id={`${uid}-tab-${i}`}
      aria-selected={on}
      aria-controls={`${uid}-panel-${i}`}
      tabIndex={on ? 0 : -1}
      className="flex h-[var(--row-h)] w-full items-center gap-5 border-b border-white/[0.12] pl-6 text-left outline-offset-[-3px]"
    >
      <span
        className={`w-8 shrink-0 text-base font-bold tracking-widest ${
          on ? "text-[#e7926b]" : "text-[#9db8c9]"
        }`}
      >
        {num(i)}
      </span>
      <span
        className={`titulo-sin-cortes whitespace-nowrap text-[clamp(1.5rem,1.1rem+1vw,2.125rem)] font-bold leading-none ${
          on ? "text-white" : "text-[#9db8c9]"
        }`}
      >
        {titulo}
      </span>
    </button>
  );
});

const PanelValor = memo(function PanelValor({
  valor,
  i,
  on,
  uid,
}: {
  valor: Valor;
  i: number;
  on: boolean;
  uid: string;
}) {
  const Icono = ICONOS[valor.icono];
  return (
    <div
      role="tabpanel"
      id={`${uid}-panel-${i}`}
      aria-labelledby={`${uid}-tab-${i}`}
      tabIndex={on ? 0 : -1}
      data-active={on}
      className="valor-panel relative py-6 pl-12 pr-4"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none text-[12rem] font-bold leading-none text-white/[0.06]"
      >
        {num(i)}
      </span>
      <div className="relative">
        <Icono aria-hidden strokeWidth={1.25} className="h-20 w-20 text-[#c1633b]" />
        <h3 className="titulo-sin-cortes mt-8 text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold leading-tight text-white">
          {valor.titulo}
        </h3>
        <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#e6f0f5]">
          {valor.descripcion}
        </p>
        {valor.ampliado && (
          <div className="mt-6 max-w-xl border-t border-white/[0.12] pt-5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#e7926b]">
              Cómo lo aplicamos
            </p>
            <p className="mt-2 text-lg leading-relaxed text-[#9db8c9]">
              {valor.ampliado}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

function ValoresEscritorio({ reducido }: { reducido: boolean }) {
  const uid = useId();
  const [activo, setActivo] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const pausaRef = useRef(false);
  const detenidoRef = useRef(false);

  const parar = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-avance: solo corre con la sección visible; sin estado, no re-renderiza nada
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducido) return;
    const io = new IntersectionObserver(
      ([e]) => {
        parar();
        if (!e.isIntersecting || detenidoRef.current) return;
        timerRef.current = window.setInterval(() => {
          if (pausaRef.current || document.hidden) return;
          startTransition(() => setActivo((a) => (a + 1) % N));
        }, INTERVALO_MS);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      parar();
    };
  }, [reducido, parar]);

  const elegir = useCallback(
    (i: number, foco = false) => {
      if (i < 0) return;
      detenidoRef.current = true;
      parar();
      startTransition(() => setActivo(i));
      if (foco) {
        listaRef.current
          ?.querySelectorAll<HTMLElement>("[role=tab]")
          [i]?.focus();
      }
    },
    [parar],
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = indiceDe(e);
    if (i < 0) return;
    let sig: number | null = null;
    if (e.key === "ArrowDown") sig = (i + 1) % N;
    else if (e.key === "ArrowUp") sig = (i - 1 + N) % N;
    else if (e.key === "Home") sig = 0;
    else if (e.key === "End") sig = N - 1;
    if (sig === null) return;
    e.preventDefault();
    elegir(sig, true);
  };

  return (
    <div
      ref={rootRef}
      className="grid gap-x-12 [grid-template-columns:repeat(12,minmax(0,1fr))]"
      onMouseEnter={() => (pausaRef.current = true)}
      onMouseLeave={() => (pausaRef.current = false)}
      onFocusCapture={() => (pausaRef.current = true)}
      onBlurCapture={() => (pausaRef.current = false)}
    >
      <div className="col-span-5">
        <div
          ref={listaRef}
          role="tablist"
          aria-label="Nuestros valores"
          aria-orientation="vertical"
          className="valores-lista relative border-t border-white/[0.12]"
          style={{ ["--i" as string]: activo }}
          onClick={(e) => elegir(indiceDe(e))}
          onPointerOver={(e) => {
            const i = indiceDe(e);
            if (i >= 0 && i !== activo) elegir(i);
          }}
          onFocus={(e) => {
            const i = indiceDe(e);
            if (i >= 0 && i !== activo) elegir(i);
          }}
          onKeyDown={onKey}
        >
          <span
            aria-hidden
            className="valores-marcador absolute left-0 top-0 h-[var(--row-h)] w-1 bg-[#c1633b]"
          />
          {VALORES.map((v, i) => (
            <Fila key={v.id} i={i} titulo={v.titulo} on={i === activo} uid={uid} />
          ))}
        </div>
      </div>

      <div className="col-span-7">
        <div className="valores-contain valores-stack sticky top-32 border-l border-white/[0.12]">
          {VALORES.map((v, i) => (
            <PanelValor key={v.id} valor={v} i={i} on={i === activo} uid={uid} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Móvil y tablet: acordeón ---------- */

const ItemAcordeon = memo(function ItemAcordeon({
  valor,
  i,
  on,
  uid,
  onToggle,
}: {
  valor: Valor;
  i: number;
  on: boolean;
  uid: string;
  onToggle: (i: number) => void;
}) {
  const Icono = ICONOS[valor.icono];
  return (
    <li className="border-b border-white/[0.12]">
      <h3>
        <button
          type="button"
          id={`${uid}-acc-${i}`}
          aria-expanded={on}
          aria-controls={`${uid}-reg-${i}`}
          onClick={() => onToggle(i)}
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
            {valor.titulo}
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
        hidden={!on}
        className="valores-acc-contenido pb-6 pl-12"
      >
        <Icono aria-hidden strokeWidth={1.25} className="h-12 w-12 text-[#c1633b]" />
        <p className="mt-4 text-lg leading-relaxed text-[#e6f0f5]">{valor.descripcion}</p>
        {valor.ampliado && (
          <div className="mt-4">
            <p className="text-sm font-bold uppercase tracking-widest text-[#e7926b]">
              Cómo lo aplicamos
            </p>
            <p className="mt-1 text-base leading-relaxed text-[#9db8c9]">
              {valor.ampliado}
            </p>
          </div>
        )}
      </div>
    </li>
  );
});

function ValoresAcordeon() {
  const uid = useId();
  const [abierto, setAbierto] = useState<number | null>(0);
  const alternar = useCallback(
    (i: number) => setAbierto((a) => (a === i ? null : i)),
    [],
  );

  return (
    <ul className="border-t border-white/[0.12]">
      {VALORES.map((v, i) => (
        <ItemAcordeon
          key={v.id}
          valor={v}
          i={i}
          on={abierto === i}
          uid={uid}
          onToggle={alternar}
        />
      ))}
    </ul>
  );
}

export default function ValoresInteractivos() {
  const escritorio = useMediaQuery("(min-width: 1024px)");
  const reducido = useMediaQuery("(prefers-reduced-motion: reduce)");
  return escritorio ? <ValoresEscritorio reducido={reducido} /> : <ValoresAcordeon />;
}
