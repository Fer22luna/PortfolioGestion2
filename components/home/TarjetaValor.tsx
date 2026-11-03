import {
  BarChart3,
  Eye,
  Handshake,
  Leaf,
  Lightbulb,
  MousePointerClick,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconoValor, Valor } from "@/data/valores";

const ICONOS: Record<IconoValor, LucideIcon> = {
  innovacion: Lightbulb,
  impacto: Target,
  cercania: Users,
  colaboracion: Handshake,
  datos: BarChart3,
  simplicidad: MousePointerClick,
  transparencia: Eye,
  sostenibilidad: Leaf,
};

type Props = {
  valor: Valor;
  indice: number;
};

export default function TarjetaValor({ valor, indice }: Props) {
  const Icono = ICONOS[valor.icono];
  const terracota = valor.tono === "terracota";

  return (
    <article
      className={`tarjeta-valor flex h-full flex-col rounded-3xl border bg-white/95 p-6 shadow-[0_8px_24px_rgba(20,50,60,0.10)] ${
        terracota
          ? "border-[#c1633b]/25 hover:border-[#c1633b]"
          : "border-[#0e2e45]/15 hover:border-[#0e2e45]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            terracota
              ? "bg-[#c1633b]/15 text-[#9a4a26]"
              : "bg-[#0e2e45]/10 text-[#0e2e45]"
          }`}
        >
          <Icono className="h-6 w-6" aria-hidden />
        </span>
        <span className="text-sm font-bold tracking-widest text-[#0e2e45]/60">
          {String(indice + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#0e2e45]">{valor.titulo}</h3>
      <p className="mt-2 text-base leading-relaxed text-[#1f2d33]">
        {valor.descripcion}
      </p>
    </article>
  );
}
