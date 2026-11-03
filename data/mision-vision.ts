export type PanelMV = {
  id: "mision" | "vision";
  etiqueta: string;
  texto: string;
  palabrasClave: string[];
  tono: "azul" | "terracota";
};

export const MV_TITULO = "Misión y visión";
export const MV_ETIQUETA_LINEA = "Hacia dónde vamos";

export const PANELES_MV: PanelMV[] = [
  {
    id: "mision",
    etiqueta: "Misión",
    texto:
      "Acompañar a gobiernos y municipios en su transformación digital, combinando tecnología, datos, innovación y gestión pública para crear procesos más eficientes, servicios más simples y ciudades más inteligentes, sostenibles y centradas en las personas.",
    palabrasClave: ["Tecnología", "Datos", "Innovación", "Gestión pública"],
    tono: "azul",
  },
  {
    id: "vision",
    etiqueta: "Visión",
    texto:
      "Ser un referente en soluciones GovTech y Smart City en Argentina y Latinoamérica, conectando gobiernos con tecnología, conocimiento y ecosistemas de innovación para impulsar nuevas formas de gestionar y construir ciudades.",
    palabrasClave: [
      "GovTech",
      "Smart City",
      "Argentina y Latinoamérica",
      "Ecosistemas de innovación",
    ],
    tono: "terracota",
  },
];
