import { Compass, Telescope } from "lucide-react";
import type { PanelMV } from "@/data/mision-vision";

export default function PanelMisionVision({ panel }: { panel: PanelMV }) {
  const terracota = panel.tono === "terracota";
  const Icono = panel.id === "mision" ? Compass : Telescope;

  return (
    <article
      className={`relative h-full overflow-hidden rounded-3xl border bg-white/95 p-7 shadow-[0_10px_30px_rgba(20,50,60,0.12)] sm:p-9 ${
        terracota ? "border-[#c1633b]/30" : "border-[#0e2e45]/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full ${
            terracota
              ? "bg-[#c1633b]/15 text-[#9a4a26]"
              : "bg-[#0e2e45]/10 text-[#0e2e45]"
          }`}
        >
          <Icono className="h-8 w-8" aria-hidden />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0e2e45]">
          {panel.etiqueta}
        </h3>
      </div>

      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[#1f2d33] sm:text-xl sm:leading-relaxed">
        {panel.texto}
      </p>

      <ul className="mt-7 flex flex-wrap gap-2" aria-label="Palabras clave">
        {panel.palabrasClave.map((p) => (
          <li
            key={p}
            className={`rounded-full border px-3 py-1 text-sm font-semibold ${
              terracota
                ? "border-[#c1633b]/40 bg-[#fbefe9] text-[#7a3516]"
                : "border-[#0e2e45]/25 bg-[#eaf1f5] text-[#0e2e45]"
            }`}
          >
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}
