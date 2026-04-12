"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function LeadCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="w-full bg-slate-900 py-20 px-4">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
          Comunidad Nulbia
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
          Únete a <span className="text-sky-400">Nulbia</span>
        </h2>
        <p className="text-slate-400 text-base max-w-sm">
          Recibe consejos de sueño, novedades y ofertas exclusivas para miembros. Sin spam, solo valor.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-sky-400" />
            <p className="text-white font-bold text-lg">¡Ya eres parte de Nulbia!</p>
            <p className="text-slate-400 text-sm">Revisa tu bandeja de entrada.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-70 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap text-sm shadow-lg shadow-sky-500/25"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Suscribirme
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-slate-500 text-xs">
          Sin spam · Cancelación en 1 clic · Datos protegidos bajo RGPD
        </p>
      </div>
    </section>
  );
}
