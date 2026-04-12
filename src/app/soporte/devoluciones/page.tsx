import { LegalPageLayout } from "@/components/ui/legal-page-layout";
import { Truck, RotateCcw } from "lucide-react";

export const metadata = { title: "Envíos y Devoluciones — Nulbia" };

export default function DevolucionesPage() {
  return (
    <LegalPageLayout title="Política de Envíos y Devoluciones">

      <h2>Envíos Rápidos y Seguros desde España</h2>

      <div className="not-prose flex items-start gap-4 bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-6">
        <Truck className="h-6 w-6 text-sky-500 flex-shrink-0 mt-0.5" />
        <ul className="text-sm text-slate-700 flex flex-col gap-1.5">
          <li><strong>Plazo de entrega:</strong> De 24 a 48 horas laborables para envíos en la Península. Hasta 72 horas para Baleares.</li>
          <li><strong>Coste:</strong> Envío Gratuito en todos los packs.</li>
          <li><strong>Seguimiento:</strong> Recibirás un enlace de seguimiento por email tras la salida del paquete de nuestro almacén en España.</li>
        </ul>
      </div>

      <h2>Devoluciones Estándar (Derecho de Desistimiento)</h2>

      <div className="not-prose flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
        <RotateCcw className="h-6 w-6 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700">
          Tienes <strong>14 días naturales</strong> desde la recepción para devolver el producto si
          cambias de opinión, siempre que el dispositivo esté precintado, sin usar y en su caja
          original. Por motivos de higiene, no se aceptan devoluciones de dispositivos usados o
          paquetes de bandas conductivas adicionales desprecintados fuera del marco de la
          "Garantía de 30 Noches".
        </p>
      </div>

      <p>
        Para iniciar una devolución, escríbenos a{" "}
        <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a> indicando tu número de pedido.
      </p>
    </LegalPageLayout>
  );
}
