import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata = { title: "Centro de Ayuda — Nulbia" };

export default function CentroAyudaPage() {
  return (
    <LegalPageLayout title="Centro de Ayuda (FAQ)">
      <h2>¿Cómo funciona Nulbia Sleep Pro?</h2>
      <p>
        Utiliza un sensor de alta precisión que detecta el ronquido. Al activarse, la Estimulación
        Muscular Electrónica (EMS) emite impulsos de frecuencia media (10Hz - 1500Hz) que activan
        los músculos de la garganta para abrir las vías respiratorias.
      </p>

      <h2>¿Por qué en la caja pone "Snore Circle"?</h2>
      <p>
        Nulbia es nuestra marca comercial, pero para garantizarte el mejor precio y que recibes la
        tecnología original patentada, enviamos el producto con su embalaje original de fábrica.
        Esto certifica que el dispositivo es auténtico y ha pasado los controles de calidad directos
        del fabricante.
      </p>

      <h2>¿Es seguro de usar?</h2>
      <p>
        Sí, es 100% seguro. Está fabricado con materiales hipoalergénicos y utiliza frecuencias
        bajas que no interrumpen tu ciclo de sueño.
      </p>

      <hr />

      <p>
        ¿Tienes más preguntas? Escríbenos a{" "}
        <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a> y te respondemos en 24/48 h
        laborables.
      </p>
    </LegalPageLayout>
  );
}
