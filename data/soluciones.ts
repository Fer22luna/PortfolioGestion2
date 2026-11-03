export type IconoNombre =
  | "Inbox"
  | "MapPin"
  | "CalendarClock"
  | "TreePine"
  | "ClipboardCheck"
  | "Scale"
  | "Smartphone"
  | "Tags"
  | "ListChecks"
  | "MessageSquare"
  | "BellRing"
  | "Gauge"
  | "Flame"
  | "Timer"
  | "Workflow"
  | "Sparkles"
  | "TrendingUp";

export type Funcion = {
  icono: IconoNombre;
  titulo: string;
  descripcion: string;
  enDesarrollo?: boolean;
};

export type Beneficio = {
  titulo: string;
  texto: string;
};

export type CasoReal = {
  titulo: string;
  descripcion?: string;
  href: string;
};

export type Imagen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Solucion = {
  slug: string;
  nombre: string;
  frase: string;
  descripcion: string;
  resumen: string;
  chips: [string, string, string];
  imagen: Imagen;
  acento: "azul" | "terracota";
  resuelve: string;
  funciones: Funcion[];
  paraQuien: string;
  beneficios: [Beneficio, Beneficio, Beneficio];
  casos?: CasoReal[];
};

export const EPIGRAFE_IMAGEN = "Pantalla ilustrativa con datos de demostración";

export const HERO = {
  titulo: "Soluciones para municipios que funcionan en el territorio.",
  subtitulo:
    "Software a medida, datos y atención ciudadana para gobiernos locales. Desde la obra en la calle hasta el reclamo del vecino.",
  cta: { label: "Contanos qué querés mejorar", href: "/#contacto" },
};

export const SOLUCIONES: Solucion[] = [
  {
    slug: "gestion-interna",
    nombre: "Gestión interna",
    frase: "Menos planillas sueltas, más control sobre lo que pasa en la calle.",
    resumen:
      "Software interno para que las áreas municipales planifiquen y den seguimiento a su trabajo. Cada solicitud tiene número, estado y responsable, todo en un solo lugar.",
    descripcion:
      "Desarrollamos software interno para que las áreas municipales planifiquen y den seguimiento a su trabajo diario, con la información ordenada en un solo lugar.",
    chips: [
      "Bandeja con estados y filtros",
      "Planificación de cuadrillas",
      "Mapa de solicitudes",
    ],
    imagen: {
      src: "/Imagenes/notebook-mockup.png",
      alt: "Bandeja de solicitudes de una plataforma de gestión municipal mostrada en una notebook",
      width: 2110,
      height: 1281,
    },
    acento: "azul",
    resuelve:
      "Reemplazamos las planillas y los mensajes sueltos por un único lugar donde cada solicitud tiene número, estado, responsable y trazabilidad. Así cualquier área sabe qué entró, quién lo está atendiendo y en qué punto está.",
    funciones: [
      {
        icono: "Inbox",
        titulo: "Bandeja de solicitudes",
        descripcion: "Estados, filtros, búsqueda y exportación en una sola vista.",
      },
      {
        icono: "MapPin",
        titulo: "Mapa de solicitudes",
        descripcion: "Ubicá cada pedido en el territorio y ordená el trabajo por zona.",
      },
      {
        icono: "CalendarClock",
        titulo: "Planificación de tareas y cuadrillas",
        descripcion: "Programá el trabajo y asigná cuadrillas a cada solicitud.",
      },
      {
        icono: "TreePine",
        titulo: "Registro de poda",
        descripcion: "Un registro ordenado de cada pedido y trabajo de poda.",
      },
      {
        icono: "ClipboardCheck",
        titulo: "Constataciones",
        descripcion: "Dejá constancia de lo verificado en el lugar.",
      },
      {
        icono: "Scale",
        titulo: "Juzgado de faltas",
        descripcion: "Las actuaciones del juzgado de faltas dentro del mismo sistema.",
      },
    ],
    paraQuien:
      "Pensado para las áreas operativas del municipio, como espacios verdes, obras y servicios públicos, y para el juzgado de faltas.",
    beneficios: [
      {
        titulo: "Trazabilidad por área",
        texto: "Cada solicitud tiene número, estado y responsable: sabés quién hizo qué y cuándo.",
      },
      {
        titulo: "Información centralizada",
        texto: "Un solo lugar en vez de planillas y mensajes dispersos entre las áreas.",
      },
      {
        titulo: "Mejores decisiones operativas",
        texto: "Con el panorama completo, programás cuadrillas y prioridades con más criterio.",
      },
    ],
  },
  {
    slug: "atencion-ciudadana",
    nombre: "Atención ciudadana",
    frase: "Un solo lugar para que el vecino pida, siga y resuelva.",
    resumen:
      "Canales digitales y omnicanalidad de reclamos y servicios para acercar el municipio a la ciudadanía. El vecino reporta desde el celular y sigue cada paso.",
    descripcion:
      "Armamos canales digitales y omnicanalidad de reclamos y servicios para acercar el municipio a la ciudadanía, sin que el vecino tenga que ir de ventanilla en ventanilla.",
    chips: [
      "Reporte con ubicación y foto",
      "Seguimiento con línea de tiempo",
      "Avisos al vecino",
    ],
    imagen: {
      src: "/Imagenes/mockup-interaccion-ciudadana.png",
      alt: "Portal ciudadano de un municipio mostrado en una notebook, con el seguimiento de una solicitud en un celular",
      width: 2425,
      height: 1281,
    },
    acento: "terracota",
    resuelve:
      "Hoy el vecino llama, se acerca al mostrador o escribe por distintos canales, y casi nunca sabe qué pasó con su pedido. Le damos un único lugar para reportar con ubicación y foto, y para seguir cada cambio de estado hasta que se resuelve.",
    funciones: [
      {
        icono: "Smartphone",
        titulo: "Reporte desde el celular",
        descripcion: "Con ubicación automática y foto, en pocos pasos.",
      },
      {
        icono: "Tags",
        titulo: "Categorías de reclamo",
        descripcion: "Poda, bacheo, alumbrado, residuos y más, para que cada pedido llegue al área correcta.",
      },
      {
        icono: "ListChecks",
        titulo: "Seguimiento con línea de tiempo",
        descripcion: "El vecino ve en qué estado está su solicitud, paso por paso.",
      },
      {
        icono: "MessageSquare",
        titulo: "Mensajes del municipio",
        descripcion: "El municipio le escribe al vecino directamente desde la solicitud.",
      },
      {
        icono: "BellRing",
        titulo: "Avisos de cada cambio de estado",
        descripcion: "El vecino se entera cuando su pedido avanza, sin tener que consultar.",
      },
    ],
    paraQuien:
      "Para municipios que quieren que el vecino pueda pedir y seguir sus trámites desde el celular, y para las áreas que reciben esos pedidos.",
    beneficios: [
      {
        titulo: "Reclamos unificados",
        texto: "Todos los pedidos entran por el mismo lugar, sin importar el canal.",
      },
      {
        titulo: "Seguimiento transparente",
        texto: "El vecino sabe en qué estado está su pedido sin tener que llamar.",
      },
      {
        titulo: "Menos carga en la atención presencial",
        texto: "Menos consultas de mostrador y por teléfono para el personal.",
      },
    ],
    casos: [
      {
        titulo: "Zoonosis - Municipalidad de Villa Allende",
        descripcion: "Registro de mascotas, adopción y registro de vacunación.",
        href: "https://zoonosis-villa-allende.vercel.app/",
      },
      {
        titulo: "Villa Allende Digital",
        href: "https://www.villaallende.gov.ar/villa-allende-digital/",
      },
    ],
  },
  {
    slug: "datos-y-analitica",
    nombre: "Datos y analítica pública",
    frase: "De los datos a las decisiones.",
    resumen:
      "Tableros, mapas y análisis de la información que el municipio ya genera. Indicadores claros para ver qué pasa en el territorio y decidir con evidencia.",
    descripcion:
      "Convertimos en tableros, mapas y análisis la información que el municipio ya genera, para que se pueda ver, entender y usar.",
    chips: [
      "Indicadores y gráficos",
      "Mapa de calor por zona",
      "Automatización e IA",
    ],
    imagen: {
      src: "/Imagenes/mockup-datos-ia.png",
      alt: "Tablero de indicadores de gestión con gráficos, mapa de calor y panel de automatización mostrado en una notebook",
      width: 2110,
      height: 1281,
    },
    acento: "azul",
    resuelve:
      "El municipio ya genera mucha información, pero suele quedar guardada y sin usar. La convertimos en indicadores, gráficos y mapas que muestran dónde pasan las cosas, cuántas son y cuánto se tarda en resolverlas.",
    funciones: [
      {
        icono: "Gauge",
        titulo: "Indicadores y gráficos de gestión",
        descripcion: "Volumen, tiempos y cumplimiento de plazos, con evolución y distribución por tipo.",
      },
      {
        icono: "Flame",
        titulo: "Mapa de calor por zona",
        descripcion: "Mirá en qué zonas se concentran los reclamos.",
      },
      {
        icono: "Timer",
        titulo: "Tiempos de resolución por área",
        descripcion: "Compará cuánto tarda cada área en resolver.",
      },
      {
        icono: "Workflow",
        titulo: "Automatizaciones",
        descripcion: "Derivación al área responsable y aviso de estado al vecino.",
      },
      {
        icono: "Sparkles",
        titulo: "Clasificación por motivo y detección de duplicados",
        descripcion: "Ordená los reclamos que entran con ayuda de IA.",
        enDesarrollo: true,
      },
      {
        icono: "TrendingUp",
        titulo: "Sugerencias de priorización y predicción",
        descripcion: "Recomendaciones para reforzar zonas y anticipar picos de demanda.",
        enDesarrollo: true,
      },
    ],
    paraQuien:
      "Para intendencias, secretarías y equipos de gestión que necesitan ver qué pasa en el territorio para decidir.",
    beneficios: [
      {
        titulo: "Indicadores claros",
        texto: "Los números que importan, a la vista y sin armar planillas a mano.",
      },
      {
        titulo: "Priorización con evidencia",
        texto: "Decidí dónde y cuándo actuar mirando datos, no intuiciones.",
      },
      {
        titulo: "Transparencia",
        texto: "Información ordenada para rendir cuentas con claridad.",
      },
    ],
  },
];

export const POR_QUE = {
  items: [
    "Conocemos la gestión municipal desde adentro",
    "Soluciones a medida, no un producto cerrado",
    "Implementación con capacitación del equipo",
    "Tecnología moderna y simple de mantener",
  ],
};

export const CTA_FINAL = {
  texto:
    "¿Tenés un problema concreto en tu municipio? Escribinos y vemos juntos por dónde empezar.",
  cta: { label: "Contanos qué querés mejorar", href: "/#contacto" },
};

export function getSolucion(slug: string) {
  return SOLUCIONES.find((s) => s.slug === slug);
}
