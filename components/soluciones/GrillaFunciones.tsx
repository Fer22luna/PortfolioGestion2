import type { Funcion, Solucion } from "@/data/soluciones";
import IconoFuncion from "./IconoFuncion";
import Reveal from "./Reveal";

// Grilla tipo bento: cierra filas completas de 4 columnas en desktop.
function span(i: number, total: number) {
  if (total === 6 && (i === 0 || i === 5)) return "lg:col-span-2";
  if (total === 5) {
    if (i === 0 || i === 3) return "lg:col-span-2";
    if (i === 4) return "sm:col-span-2 lg:col-span-2";
  }
  return "";
}

export default function GrillaFunciones({
  funciones,
  acento,
}: {
  funciones: Funcion[];
  acento: Solucion["acento"];
}) {
  const colorIcono = acento === "terracota" ? "bg-brand-terracota" : "bg-brand-azul";

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {funciones.map((f, i) => {
        const ancha = span(i, funciones.length).includes("lg:col-span-2");
        return (
          <li key={f.titulo} className={span(i, funciones.length)}>
            <Reveal delay={i * 0.05} className="h-full">
              <div
                className={`flex h-full flex-col gap-3 rounded-2xl border border-[#d3dfe5] p-5 shadow-sm ${
                  ancha ? "bg-gradient-to-br from-[#eaf1f5] to-white" : "bg-[#f3f7f8]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${colorIcono}`}
                >
                  <IconoFuncion nombre={f.icono} />
                </span>
                <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold leading-snug text-brand-azul">
                  {f.titulo}
                  {f.enDesarrollo && <span className="badge-dev">En desarrollo</span>}
                </h3>
                <p className="leading-relaxed text-[var(--nav-text-muted)]">
                  {f.descripcion}
                </p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
