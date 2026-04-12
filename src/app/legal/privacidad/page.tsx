import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata = { title: "Política de Privacidad — Nulbia" };

export default function PrivacidadPage() {
  return (
    <LegalPageLayout title="Política de Privacidad" lastUpdated="Última actualización: Abril de 2026">
      <p>
        En Nulbia, tu privacidad y la seguridad de tus datos biométricos son nuestra prioridad. Esta
        política explica cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h2>1. Datos que recopilamos</h2>

      <p><strong>Datos de compra:</strong> Nombre, dirección de envío en España, email y teléfono
      para procesar tus pedidos.</p>

      <p><strong>Datos de la App:</strong> Los datos de tus patrones de ronquido y niveles de
      oxígeno procesados por la aplicación se gestionan de forma cifrada y anónima. No comercializamos
      con tus datos de salud.</p>

      <p><strong>Datos de navegación:</strong> Utilizamos cookies para mejorar tu experiencia de
      compra y personalizar nuestras ofertas.</p>

      <h2>2. Uso de la información</h2>
      <p>
        Tus datos se utilizan exclusivamente para gestionar el envío de tu dispositivo, procesar el
        pago de forma segura y ofrecerte soporte técnico post-venta.
      </p>

      <h2>3. Tus derechos</h2>
      <p>
        Puedes solicitar el acceso, rectificación o eliminación de tus datos personales escribiendo a{" "}
        <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a>.
      </p>
    </LegalPageLayout>
  );
}
