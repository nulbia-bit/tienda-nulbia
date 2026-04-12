import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata = { title: "Aviso Legal — Nulbia" };

export default function AvisoLegalPage() {
  return (
    <LegalPageLayout title="Aviso Legal">
      <p>
        En cumplimiento de la normativa vigente, se exponen los datos del titular:
      </p>

      <ul>
        <li><strong>Titular:</strong> Ivan Vazquez Sancho</li>
        <li><strong>Domicilio Fiscal:</strong> Pas de la Casa, AD200, Principado de Andorra.</li>
        <li>
          <strong>Email de Contacto:</strong>{" "}
          <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a>
        </li>
        <li>
          <strong>Actividad:</strong> Distribución online de dispositivos de neurotecnología y
          bienestar.
        </li>
      </ul>
    </LegalPageLayout>
  );
}
