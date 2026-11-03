import { redirect } from "next/navigation";

// La sección vive ahora en la landing; esto mantiene vivos los enlaces viejos.
export default function SolucionesPage() {
  redirect("/#soluciones");
}
