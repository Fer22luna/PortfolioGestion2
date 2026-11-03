import Reveal from "@/components/soluciones/Reveal";
import { MV_ETIQUETA_LINEA, MV_TITULO, PANELES_MV } from "@/data/mision-vision";
import FondoParallax from "./FondoParallax";
import LineaMeridiano from "./LineaMeridiano";
import PanelMisionVision from "./PanelMisionVision";

export default function SeccionMisionVision() {
  return (
    <section
      id="mision"
      aria-labelledby="mision-titulo"
      className="relative scroll-mt-24 overflow-x-clip px-4 py-20 sm:py-28"
    >
      <FondoParallax />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="mision-titulo"
            className="titulo-sin-cortes mb-10 text-3xl font-bold text-[#0e2e45] sm:text-4xl"
          >
            {MV_TITULO}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-6">
          {PANELES_MV.map((p, i) => (
            <div key={p.id} className="contents">
              <Reveal delay={i * 0.12} className="h-full">
                <PanelMisionVision panel={p} />
              </Reveal>
              {i === 0 && (
                <div className="lg:hidden">
                  <LineaMeridiano etiqueta={MV_ETIQUETA_LINEA} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 hidden lg:block">
          <LineaMeridiano etiqueta={MV_ETIQUETA_LINEA} />
        </div>
      </div>
    </section>
  );
}
