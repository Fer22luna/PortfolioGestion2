export type ItemNav = {
  /** id de la sección en la landing */
  id: string;
  label: string;
  /** Etiqueta alternativa para el footer */
  labelFooter?: string;
  enNavbar: boolean;
  enFooter: boolean;
};

// Mismo orden que las secciones de app/page.tsx. "contacto" es el footer.
export const NAV_ITEMS: ItemNav[] = [
  { id: "inicio", label: "Inicio", enNavbar: true, enFooter: true },
  { id: "soluciones", label: "Soluciones", enNavbar: true, enFooter: true },
  {
    id: "mision",
    label: "Visión",
    labelFooter: "Misión y visión",
    enNavbar: true,
    enFooter: true,
  },
  { id: "valores", label: "Valores", enNavbar: false, enFooter: true },
  { id: "contacto", label: "Contacto", enNavbar: true, enFooter: true },
];

export const NAV_CTA = { label: "Contactanos", id: "contacto" };
export const NAV_SECUNDARIO = { label: "Soluciones", id: "soluciones" };

export const NAVBAR_LINKS = NAV_ITEMS.filter((i) => i.enNavbar).map((i) => ({
  id: i.id,
  label: i.label,
  href: `/#${i.id}`,
}));

export const FOOTER_LINKS = NAV_ITEMS.filter((i) => i.enFooter).map((i) => ({
  id: i.id,
  label: i.labelFooter ?? i.label,
  href: `#${i.id}`,
}));
