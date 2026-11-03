import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroDetalle from "@/components/soluciones/HeroDetalle";
import NavSoluciones from "@/components/soluciones/NavSoluciones";
import GrillaFunciones from "@/components/soluciones/GrillaFunciones";
import Reveal from "@/components/soluciones/Reveal";
import { getSolucion, SOLUCIONES } from "@/data/soluciones";

type Params = { slug: string };

export function generateStaticParams() {
  return SOLUCIONES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolucion(slug);
  if (!s) return {};
  const title = `${s.nombre} — Soluciones — Meridiano`;
  return {
    title,
    description: s.descripcion,
    openGraph: { title, description: s.descripcion, type: "website" },
  };
}

export default async function SolucionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getSolucion(slug);
  if (!s) notFound();

  return (
    <>
      <Navbar />
      <main className="px-4 pb-16 pt-28 sm:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <NavSoluciones actual={s.slug} />

          <HeroDetalle solucion={s} />

          <section aria-labelledby="resuelve-titulo">
            <Reveal className="panel p-6 sm:p-8">
              <h2 id="resuelve-titulo" className="section-title">
                Qué resuelve
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed">{s.resuelve}</p>
            </Reveal>
          </section>

          <section aria-labelledby="incluye-titulo">
            <Reveal className="panel p-6 sm:p-8">
              <h2 id="incluye-titulo" className="section-title">
                Qué incluye
              </h2>
              <div className="mt-5">
                <GrillaFunciones funciones={s.funciones} acento={s.acento} />
              </div>
            </Reveal>
          </section>

          <section aria-labelledby="resultados-titulo">
            <Reveal className="panel p-6 sm:p-8">
              <h2 id="resultados-titulo" className="section-title">
                Para quién y resultados
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed">{s.paraQuien}</p>
              <ul className="mt-5 grid gap-4 md:grid-cols-3">
                {s.beneficios.map((b) => (
                  <li
                    key={b.titulo}
                    className="rounded-2xl border border-[#d3dfe5] bg-[#f3f7f8] p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="mb-3 block h-1 w-10 rounded-full bg-brand-terracota"
                    />
                    <h3 className="text-lg font-bold leading-snug text-brand-azul">
                      {b.titulo}
                    </h3>
                    <p className="mt-1 leading-relaxed text-[var(--nav-text-muted)]">
                      {b.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {s.casos && s.casos.length > 0 && (
            <section aria-labelledby="casos-titulo">
              <Reveal className="panel p-6 sm:p-8">
                <h2 id="casos-titulo" className="section-title">
                  Casos y ejemplos
                </h2>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {s.casos.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col gap-1 rounded-2xl border border-[#d3dfe5] bg-[#f3f7f8] p-5 transition-colors hover:bg-white"
                      >
                        <span className="flex items-center gap-2 text-lg font-bold text-brand-azul underline underline-offset-4">
                          {c.titulo}
                          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                          <span className="sr-only">(se abre en una pestaña nueva)</span>
                        </span>
                        {c.descripcion && (
                          <span className="text-[var(--nav-text-muted)]">{c.descripcion}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          )}

          <section>
            <Reveal className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-xl text-lg font-semibold text-brand-azul">
                ¿Te sirve para tu municipio? Contanos qué querés mejorar y lo vemos juntos.
              </p>
              <Link href="/#contacto" className="btn btn-cta px-8 py-3.5 text-lg">
                Contanos qué querés mejorar
              </Link>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  );
}
