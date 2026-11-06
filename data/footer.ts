export const FOOTER = {
  descripcion:
    "Acompañamos a gobiernos y municipios en su transformación digital, combinando tecnología, datos e innovación para construir ciudades más inteligentes, eficientes y centradas en las personas.",
  email: "contacto@meridianoconsultora.com.ar",
  ubicacion: "Córdoba, Argentina",
  derechos: "MERIDIANO. Todos los derechos reservados.",
};

export type RedSocial = {
  id: "linkedin" | "instagram" | "x";
  label: string;
  url: string;
};

// TODO: completar las URLs reales. Las que estén vacías no se muestran.
export const SOCIAL: RedSocial[] = [
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "instagram", label: "Instagram", url: "" },
  { id: "x", label: "X (Twitter)", url: "" },
];
