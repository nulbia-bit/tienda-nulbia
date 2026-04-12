import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata = { title: "Política de Cookies — Nulbia" };

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies" lastUpdated="Última actualización: Abril de 2026">
      <p>
        Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en Nulbia
        (nulbia.com) y cuáles son tus opciones para gestionarlas. Al navegar y continuar en nuestra
        web, aceptas el uso de cookies según se describe en este documento.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web que visitas almacenan en tu
        ordenador, smartphone o dispositivo móvil. Son ampliamente utilizadas para que las páginas
        web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a
        los propietarios del sitio (por ejemplo, recordar los artículos en tu carrito de compra o tus
        preferencias de idioma).
      </p>

      <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
      <p>En Nulbia utilizamos las siguientes categorías de cookies:</p>

      <p>
        <strong>Cookies Estrictamente Necesarias (Técnicas):</strong> Son fundamentales para que
        puedas navegar por nuestra página web y utilizar sus funciones. Sin estas cookies, servicios
        básicos como añadir el Nulbia Sleep Pro al carrito, iniciar sesión de forma segura o
        finalizar el proceso de pago (gestionado a través de Shopify) no podrían funcionar. No se
        pueden desactivar en nuestros sistemas.
      </p>

      <p>
        <strong>Cookies de Rendimiento y Análisis:</strong> Estas cookies nos permiten contar las
        visitas y fuentes de tráfico para poder evaluar y mejorar el rendimiento de nuestro sitio.
        Nos ayudan a saber qué páginas son las más o menos visitadas y cómo navegan los visitantes
        por la web. Toda la información que recogen estas cookies es agregada y, por lo tanto,
        anónima. Utilizamos herramientas como Google Analytics para este propósito.
      </p>

      <p>
        <strong>Cookies de Funcionalidad:</strong> Permiten que la página web proporcione una mayor
        funcionalidad y personalización (por ejemplo, recordar tu región). Pueden ser establecidas
        por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas.
      </p>

      <p>
        <strong>Cookies de Marketing y Publicidad:</strong> Estas cookies pueden ser establecidas a
        través de nuestro sitio por nuestros socios publicitarios (como Meta/Facebook, Instagram,
        TikTok o Google). Pueden ser utilizadas por esas empresas para crear un perfil de tus
        intereses y mostrarte anuncios relevantes de Nulbia en otros sitios. No almacenan
        información personal directamente, sino que se basan en la identificación única de tu
        navegador y dispositivo de Internet.
      </p>

      <h2>3. Cookies de Terceros</h2>
      <p>
        Al ser una tienda alojada en la plataforma de comercio electrónico Shopify, algunas de las
        cookies esenciales y de análisis son gestionadas directamente por ellos para garantizar el
        correcto funcionamiento y seguridad de la transacción. Además, utilizamos píxeles de
        seguimiento de redes sociales para medir la efectividad de nuestras campañas publicitarias.
      </p>

      <h2>4. ¿Cómo puedes gestionar o desactivar las cookies?</h2>
      <p>
        Tienes el derecho a decidir si aceptas o rechazas las cookies no esenciales. Puedes
        configurar las preferencias de tu navegador para bloquearlas o para que te avise cuando una
        web intente guardar una cookie.
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Google Chrome
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">
            Apple Safari
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        <strong>Nota importante:</strong> Si decides bloquear las cookies estrictamente necesarias a
        través de tu navegador, es muy probable que no puedas completar una compra en nuestra
        tienda, ya que el carrito de la compra no podrá guardar el producto.
      </p>

      <h2>5. Cambios en la Política de Cookies</h2>
      <p>
        Es posible que actualicemos esta política en el futuro para reflejar cambios operacionales,
        legales o reglamentarios. Te recomendamos revisarla periódicamente.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Si tienes alguna duda o pregunta sobre el uso que hacemos de las cookies, por favor envíanos
        un correo electrónico a <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a>.
      </p>
    </LegalPageLayout>
  );
}
