export type CameraKeyframe = {
  /** Ángulo horizontal alrededor del target, en radianes (0 = +Z) */
  azimuth: number;
  /** Ángulo desde el eje Y, en radianes (0 = arriba, π/2 = horizonte) */
  polar: number;
  distance: number;
  target: [number, number, number];
  fov: number;
};

export type Step = {
  id: string;
  camera: CameraKeyframe;
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

/**
 * Único lugar para editar pasos: textos y posiciones de cámara.
 * Los valores de `camera` son provisorios (se usan en la Fase 2);
 * en modo debug (?debug=1) vas a poder copiar los definitivos.
 */
export const STEPS: Step[] = [
  {
    id: "govtech",
    camera: { azimuth: 0.6, polar: 1.0, distance: 38, target: [0, 1, 0], fov: 35 },
    eyebrow: "GOVTECH / SMART CITY",
    title: "Transformación digital para gobiernos y ciudades más inteligentes",
    body: "Ayudamos a gobiernos y municipios a modernizar su gestión con tecnología, datos e innovación: procesos más simples, decisiones más eficientes y servicios pensados para las personas.",
    cta: { label: "Contactanos", href: "#contacto" },
  },
  {
    id: "casos",
    camera: { azimuth: 2.4, polar: 0.8, distance: 26, target: [0, 1, 0], fov: 35 },
    eyebrow: "CASOS DE USO",
    title: "Trámites y servicios que la gente realmente usa",
    body: "Digitalizamos trámites, reclamos y servicios municipales con sistemas simples de operar y pensados para el vecino.",
    cta: { label: "Ver casos de uso", href: "#casos" },
  },
  {
    id: "datos",
    camera: { azimuth: 4.2, polar: 0.5, distance: 32, target: [0, 1, 0], fov: 35 },
    eyebrow: "DATOS Y MAPAS",
    title: "Decisiones basadas en datos, no en intuición",
    body: "Mapas, tableros y analítica para que cada área vea qué pasa en la ciudad y actúe a tiempo.",
    cta: { label: "Hablemos", href: "#contacto" },
  },
];
