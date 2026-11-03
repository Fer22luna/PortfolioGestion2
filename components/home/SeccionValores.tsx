import Reveal from "@/components/soluciones/Reveal";
import { VALORES_SUBTITULO, VALORES_TITULO } from "@/data/valores";
import FondoParallax from "./FondoParallax";
import GrillaValores from "./GrillaValores";

export default function SeccionValores() {
  return (
    <section
      id="valores"
      aria-labelledby="valores-titulo"
      className="relative scroll-mt-24 overflow-x-clip px-4 py-20 sm:py-28"
    >
      <FondoParallax />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="valores-titulo"
            className="titulo-sin-cortes text-3xl font-bold text-[#0e2e45] sm:text-4xl"
          >
            {VALORES_TITULO}
          </h2>
          <p className="texto-sin-cortes mb-10 mt-3 max-w-2xl text-lg text-[#0e2e45]/90">
            {VALORES_SUBTITULO}
          </p>
        </Reveal>
        <GrillaValores />
      </div>
    </section>
  );
}
