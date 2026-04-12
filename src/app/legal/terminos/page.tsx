import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata = { title: "Términos y Condiciones — Nulbia" };

export default function TerminosPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones">
      <h2>1. Aceptación</h2>
      <p>
        Al realizar un pedido en nuestra web, aceptas estos términos y condiciones en su totalidad.
      </p>

      <h2>2. Pagos y Precios</h2>
      <p>
        Los precios están expresados en Euros (€). La compra se procesa a través de pasarelas seguras.
        Nulbia se reserva el derecho de cancelar pedidos en caso de errores informáticos o falta de stock.
      </p>

      <h2>3. Identidad del Producto y Embalaje</h2>
      <p>
        El cliente reconoce y acepta que el producto comercializado bajo el nombre "Nulbia Sleep Pro"
        se envía con su embalaje, manuales y serigrafía original de fábrica bajo la marca comercial
        "Snore Circle", proveniente directamente de nuestro proveedor tecnológico. Nulbia actúa como
        distribuidor autorizado. La recepción del producto con el diseño original del fabricante no
        constituye un error de envío ni defecto de conformidad.
      </p>

      <h2>4. Descargo de Responsabilidad Médica</h2>
      <p>
        Este dispositivo es una ayuda para el bienestar diseñada para reducir los ronquidos mediante
        estimulación muscular. No sustituye el diagnóstico de un profesional médico ni está destinado
        a tratar casos de apnea del sueño severa sin supervisión clínica.
      </p>
    </LegalPageLayout>
  );
}
