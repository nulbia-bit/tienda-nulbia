import { LegalPageLayout } from "@/components/ui/legal-page-layout";
import { Mail, Clock, MessageSquare } from "lucide-react";

export const metadata = { title: "Contacto — Nulbia" };

export default function ContactoPage() {
  return (
    <LegalPageLayout title="Contacto">
      <p>
        Estamos a tu disposición para cualquier duda sobre tu pedido o configuración.
      </p>

      <div className="not-prose grid gap-4 my-8">
        <div className="flex items-start gap-4 bg-sky-50 border border-sky-100 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm mb-0.5">Email</p>
            <a href="mailto:nulbia@nulbia.com" className="text-sky-600 font-semibold text-sm hover:underline">
              nulbia@nulbia.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm mb-0.5">Horario de atención</p>
            <p className="text-slate-600 text-sm">Lunes a Viernes de 09:00 a 18:00</p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm mb-0.5">Tiempo de respuesta</p>
            <p className="text-slate-600 text-sm">
              Respondemos a todas las consultas en un plazo de 24/48 horas laborables. Si tu
              consulta es sobre un pedido, por favor incluye tu número de pedido en el correo.
            </p>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
}
