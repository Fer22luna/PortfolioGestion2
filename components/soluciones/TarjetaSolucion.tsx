import type { Solucion } from "@/data/soluciones";
import ImagenMockup from "./ImagenMockup";
import Reveal from "./Reveal";

export default function TarjetaSolucion({
  solucion,
  index,
}: {
  solucion: Solucion;
  index: number;
}) {
  const titleId = `linea-${solucion.slug}`;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        aria-labelledby={titleId}
        className="flex h-full flex-col gap-3 rounded-2xl border border-[#d3dfe5] bg-[#f3f7f8] p-5"
      >
        <ImagenMockup
          compact
          imagen={solucion.imagen}
          acento={solucion.acento}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <p className="card-eyebrow text-brand-terracota">
          Línea {String(index + 1).padStart(2, "0")}
        </p>
        <h3 id={titleId} className="text-xl font-bold text-brand-azul">
          {solucion.nombre}
        </h3>
        <p className="font-semibold leading-snug">{solucion.frase}</p>
        <p className="text-sm leading-relaxed text-[var(--nav-text-muted)]">
          {solucion.resumen}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-1" aria-label="Funciones principales">
          {solucion.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-[#c3d2da] bg-white px-3 py-1 text-xs font-semibold text-brand-azul"
            >
              {chip}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
