import { GraduationCap, PenTool, Rocket, Search, type LucideIcon } from "lucide-react";
import Reveal from "@/components/soluciones/Reveal";
import { COMO_TRABAJAMOS, PASOS, type IconoPaso } from "@/data/como-trabajamos";

const ICONOS: Record<IconoPaso, LucideIcon> = {
  diagnostico: Search,
  diseno: PenTool,
  implementacion: Rocket,
  soporte: GraduationCap,
};

export default function PasosTrabajo() {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="como-trabajamos-titulo"
      className="seccion-diferida scroll-mt-24 px-4 pt-6"
    >
      <div className="panel mx-auto max-w-6xl p-6 sm:p-8">
        <Reveal>
          <h2 id="como-trabajamos-titulo" className="section-title titulo-sin-cortes">
            {COMO_TRABAJAMOS.titulo}
          </h2>
          <p className="mt-2 text-base sm:text-lg">{COMO_TRABAJAMOS.subtitulo}</p>
        </Reveal>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => {
            const Icono = ICONOS[p.icono];
            const terracota = i % 2 === 1;
            return (
              <li key={p.id}>
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#0e2e45]/15 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          terracota
                            ? "bg-[#c1633b]/15 text-[#9a4a26]"
                            : "bg-[#0e2e45]/10 text-[#0e2e45]"
                        }`}
                      >
                        <Icono aria-hidden className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold tracking-widest text-[#0e2e45]/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-brand-azul">{p.titulo}</h3>
                    <p className="mt-1.5 text-base leading-relaxed">{p.descripcion}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
