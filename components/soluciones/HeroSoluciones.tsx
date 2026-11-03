import Link from "next/link";
import Reveal from "./Reveal";

type Props = {
  titulo: string;
  subtitulo: string;
  cta: { label: string; href: string };
  /** En la landing el h1 es el del hero 3D, así que acá se usa h2. */
  nivel?: "h1" | "h2";
  idTitulo?: string;
  chips?: string[];
};

export default function HeroSoluciones({
  titulo,
  subtitulo,
  cta,
  nivel = "h1",
  idTitulo,
  chips,
}: Props) {
  const Titulo = nivel;
  return (
    <Reveal>
      <Titulo
        id={idTitulo}
        className="titulo-sin-cortes max-w-3xl text-3xl font-bold leading-tight text-brand-azul sm:text-5xl"
      >
        {titulo}
      </Titulo>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed sm:text-xl">{subtitulo}</p>
      {chips && chips.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Por qué MERIDIANO">
          {chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-[#0e2e45]/25 bg-[#eaf1f5] px-3 py-1 text-sm font-semibold text-brand-azul"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
       
      </div>
    </Reveal>
  );
}
