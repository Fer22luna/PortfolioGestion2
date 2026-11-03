import HeroSoluciones from "@/components/soluciones/HeroSoluciones";
import TarjetaSolucion from "@/components/soluciones/TarjetaSolucion";
import { HERO, POR_QUE, SOLUCIONES } from "@/data/soluciones";

export default function SeccionSoluciones() {
  return (
    <section
      id="soluciones"
      aria-labelledby="soluciones-titulo"
      className="scroll-mt-24 px-4 pt-16 sm:pt-20"
    >
      <div className="panel mx-auto max-w-6xl overflow-hidden p-6 sm:p-8">
        <HeroSoluciones
          nivel="h2"
          idTitulo="soluciones-titulo"
          titulo={HERO.titulo}
          subtitulo={HERO.subtitulo}
          cta={HERO.cta}
          chips={POR_QUE.items}
        />
        <h3 className="sr-only">Líneas de solución</h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {SOLUCIONES.map((s, i) => (
            <TarjetaSolucion key={s.slug} solucion={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
