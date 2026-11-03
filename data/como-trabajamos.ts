export type IconoPaso = "diagnostico" | "diseno" | "implementacion" | "soporte";

export type PasoTrabajo = {
  id: string;
  titulo: string;
  descripcion: string;
  icono: IconoPaso;
};

export const COMO_TRABAJAMOS = {
  titulo: "Cómo trabajamos",
  subtitulo: "Cuatro pasos simples, siempre junto al equipo municipal.",
};

export const PASOS: PasoTrabajo[] = [
  {
    id: "diagnostico",
    titulo: "Diagnóstico",
    descripcion: "Entendemos cómo trabaja cada área y qué hay que resolver.",
    icono: "diagnostico",
  },
  {
    id: "diseno",
    titulo: "Diseño",
    descripcion: "Armamos la solución a medida, simple de usar.",
    icono: "diseno",
  },
  {
    id: "implementacion",
    titulo: "Implementación",
    descripcion: "Ponemos en marcha el sistema y lo ajustamos con el equipo.",
    icono: "implementacion",
  },
  {
    id: "soporte",
    titulo: "Capacitación y soporte",
    descripcion: "Capacitamos al equipo y seguimos acompañando después.",
    icono: "soporte",
  },
];
