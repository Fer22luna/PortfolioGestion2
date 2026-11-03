export type IconoValor =
  | "innovacion"
  | "impacto"
  | "cercania"
  | "colaboracion"
  | "datos"
  | "simplicidad"
  | "transparencia"
  | "sostenibilidad";

export type Valor = {
  id: string;
  titulo: string;
  descripcion: string;
  icono: IconoValor;
  tono: "azul" | "terracota";
};

export const VALORES_TITULO = "Nuestros valores";
export const VALORES_SUBTITULO =
  "Los principios que guían cada proyecto que encaramos junto a gobiernos y municipios.";

export const VALORES: Valor[] = [
  {
    id: "innovacion",
    titulo: "Innovación",
    descripcion:
      "Buscamos nuevas formas de resolver problemas públicos con tecnología y creatividad.",
    icono: "innovacion",
    tono: "terracota",
  },
  {
    id: "impacto",
    titulo: "Impacto",
    descripcion:
      "Medimos nuestro trabajo por el resultado real que genera en la vida de las personas.",
    icono: "impacto",
    tono: "azul",
  },
  {
    id: "cercania",
    titulo: "Cercanía",
    descripcion:
      "Trabajamos codo a codo con los equipos de gobierno, entendiendo su realidad.",
    icono: "cercania",
    tono: "terracota",
  },
  {
    id: "colaboracion",
    titulo: "Colaboración",
    descripcion:
      "Creemos en construir junto a otros actores del ecosistema público y privado.",
    icono: "colaboracion",
    tono: "azul",
  },
  {
    id: "datos",
    titulo: "Datos para decidir",
    descripcion:
      "Convertimos datos en información útil para tomar mejores decisiones de gobierno.",
    icono: "datos",
    tono: "terracota",
  },
  {
    id: "simplicidad",
    titulo: "Simplicidad",
    descripcion:
      "Diseñamos soluciones simples de usar, tanto para el Estado como para la ciudadanía.",
    icono: "simplicidad",
    tono: "azul",
  },
  {
    id: "transparencia",
    titulo: "Transparencia",
    descripcion:
      "Actuamos con honestidad y criterios claros en cada proyecto que encaramos.",
    icono: "transparencia",
    tono: "azul",
  },
  {
    id: "sostenibilidad",
    titulo: "Sostenibilidad",
    descripcion:
      "Pensamos soluciones que perduren en el tiempo, más allá de una gestión puntual.",
    icono: "sostenibilidad",
    tono: "terracota",
  },
];
