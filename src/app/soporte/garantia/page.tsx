import { LegalPageLayout } from "@/components/ui/legal-page-layout";
import { ShieldCheck } from "lucide-react";

export const metadata = { title: "Garantía de 30 Noches — Nulbia" };

export default function GarantiaPage() {
  return (
    <LegalPageLayout title="Garantía de 30 Noches">
      <div className="not-prose flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-8">
        <ShieldCheck className="h-8 w-8 text-sky-500 flex-shrink-0" />
        <p className="font-bold text-sky-800 text-base">
          Pruébalo sin miedo. Si no funciona, te devolvemos tu dinero.
        </p>
      </div>

      <p>
        Queremos que recuperes tu descanso. Por eso, te ofrecemos nuestra garantía especial:
      </p>

      <ol>
        <li>
          Utiliza el dispositivo durante al menos <strong>14 noches consecutivas</strong> para que
          los músculos de tu garganta se adapten a la estimulación.
        </li>
        <li>
          Si después de este periodo y antes de los <strong>30 días naturales</strong> desde la
          entrega no notas mejoría, escríbenos a{" "}
          <a href="mailto:nulbia@nulbia.com">nulbia@nulbia.com</a>.
        </li>
        <li>
          Te guiaremos en el proceso de devolución y te reembolsaremos el importe del dispositivo.
        </li>
      </ol>
    </LegalPageLayout>
  );
}
