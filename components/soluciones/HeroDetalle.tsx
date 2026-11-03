import Link from "next/link";
import type { Solucion } from "@/data/soluciones";
import ImagenMockup from "./ImagenMockup";
import Reveal from "./Reveal";

export default function HeroDetalle({ solucion }: { solucion: Solucion }) {
  return (
    <section className="panel grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
      <Reveal>
        <p className="card-eyebrow text-brand-terracota">{solucion.nombre}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-azul sm:text-4xl lg:text-5xl">
          {solucion.frase}
        </h1>
        <p className="mt-4 text-lg leading-relaxed">{solucion.descripcion}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/#contacto" className="btn btn-cta px-8 py-3.5 text-lg">
            Contanos qué querés mejorar
          </Link>
          <Link href="/soluciones" className="btn btn-outline px-8 py-3.5 text-lg">
            Ver todas las soluciones
          </Link>
        </div>
      </Reveal>
      <ImagenMockup
        imagen={solucion.imagen}
        acento={solucion.acento}
        sizes="(min-width: 1024px) 1100px, 100vw"
        priority
      />
    </section>
  );
}
