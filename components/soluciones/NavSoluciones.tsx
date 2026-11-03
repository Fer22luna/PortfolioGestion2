import Link from "next/link";
import { SOLUCIONES } from "@/data/soluciones";

export default function NavSoluciones({ actual }: { actual: string }) {
  return (
    <nav aria-label="Líneas de solución">
      <ul className="flex flex-wrap gap-2">
        {SOLUCIONES.map((s) => {
          const activo = s.slug === actual;
          return (
            <li key={s.slug}>
              <Link
                href={`/soluciones/${s.slug}`}
                aria-current={activo ? "page" : undefined}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  activo
                    ? "border-[var(--brand-azul)] bg-brand-azul text-white"
                    : "border-white/70 bg-white/90 text-brand-azul hover:bg-white"
                }`}
              >
                {s.nombre}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
