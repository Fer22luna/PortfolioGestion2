import {
  BellRing,
  CalendarClock,
  ClipboardCheck,
  Flame,
  Gauge,
  Inbox,
  ListChecks,
  MapPin,
  MessageSquare,
  Scale,
  Smartphone,
  Sparkles,
  Tags,
  Timer,
  TrendingUp,
  TreePine,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconoNombre } from "@/data/soluciones";

const ICONOS: Record<IconoNombre, LucideIcon> = {
  Inbox,
  MapPin,
  CalendarClock,
  TreePine,
  ClipboardCheck,
  Scale,
  Smartphone,
  Tags,
  ListChecks,
  MessageSquare,
  BellRing,
  Gauge,
  Flame,
  Timer,
  Workflow,
  Sparkles,
  TrendingUp,
};

export default function IconoFuncion({ nombre }: { nombre: IconoNombre }) {
  const Icono = ICONOS[nombre];
  return <Icono aria-hidden="true" className="h-5 w-5" strokeWidth={2} />;
}
