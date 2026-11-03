export const FOOTER = {
  descripcion:
    "Acompañamos a gobiernos y municipios en su transformación digital, combinando tecnología, datos e innovación para construir ciudades más inteligentes, eficientes y centradas en las personas.",
  email: "contacto@meridianoconsultora.com.ar",
  ubicacion: "Córdoba, Argentina",
  derechos: "MERIDIANO. Todos los derechos reservados.",
};

export type EnlaceNav = { label: string; href: string };

// Solo ids de sección que existen en la landing. "contacto" es el propio footer.
export const FOOTER_NAV: EnlaceNav[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Misión y visión", href: "#mision" },
  { label: "Valores", href: "#valores" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Contacto", href: "#contacto" },
];

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
