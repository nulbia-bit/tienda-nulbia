import { Suspense } from "react";
import { ProductoClient } from "./ProductoClient";

// page.tsx es un Server Component.
// Envuelve el Client Component en <Suspense> para que useSearchParams
// funcione correctamente durante el prerendering (requerido en Next.js 15+).

export const metadata = {
  title: "Nulbia Sleep Pro — Elimina los ronquidos desde la primera noche",
  description:
    "Tecnología de conducción ósea con IA biométrica. 98% de eficacia. 30 noches de garantía total. Envío gratis en 24h.",
};

export default function ProductoPage() {
  return (
    <Suspense>
      <ProductoClient />
    </Suspense>
  );
}
