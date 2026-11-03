import Reveal from "@/components/soluciones/Reveal";
import { VALORES } from "@/data/valores";
import TarjetaValor from "./TarjetaValor";

export default function GrillaValores() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {VALORES.map((v, i) => (
        <li key={v.id}>
          <Reveal delay={(i % 4) * 0.08} className="h-full">
            <TarjetaValor valor={v} indice={i} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
