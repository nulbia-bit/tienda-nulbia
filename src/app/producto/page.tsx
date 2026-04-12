import { redirect } from "next/navigation";

// Ruta limpia /producto → redirige a la PDP principal
export default function ProductoPage() {
  redirect("/products/sleep-pro");
}
