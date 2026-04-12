"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createCheckout } from "@/lib/shopify";


interface PricingPlan {
  name: string;
  price: number;
  description: string;
  includes: string[];
  buttonText: string;
  popular?: boolean;
  shopifyProductId: string;
}

interface PricingSectionProps {
  plans: PricingPlan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleBuy = async (plan: PricingPlan, index: number) => {
    setLoadingIndex(index);
    setErrorMsg(null);
    const url = await createCheckout(plan.shopifyProductId);
    if (url) {
      window.location.href = url;
    } else {
      setErrorMsg("Error al conectar con la tienda. Inténtalo de nuevo.");
      setLoadingIndex(null);
    }
  };

  return (
    <section
      id="precios"
      className="w-full bg-slate-50 py-24 border-y border-slate-100 overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Elige tu pack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Nulbia Sleep <span className="text-sky-500">Pro</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Un solo pago. Sin suscripción. Descansa mejor desde esta noche.
          </p>
        </div>

        {/* Error global */}
        {errorMsg && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center">
            {errorMsg} — Por favor inténtalo de nuevo.
          </div>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-white p-8 transition-all duration-300",
                plan.popular
                  ? "border-sky-200 shadow-2xl shadow-sky-100 scale-105 z-10"
                  : "border-slate-200 shadow-sm hover:shadow-lg hover:border-sky-100"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md shadow-sky-200 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  Más elegido
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-400">€</span>
                  <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Pago único · Sin renovación</p>
              </div>

              {/* CTA — conectado a Shopify */}
              <button
                onClick={() => handleBuy(plan, i)}
                disabled={loadingIndex !== null}
                className={cn(
                  "w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 mb-7 flex items-center justify-center gap-2",
                  plan.popular
                    ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                )}
              >
                {loadingIndex === i ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cargando...
                  </>
                ) : (
                  plan.buttonText
                )}
              </button>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-5" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.includes.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        plan.popular ? "bg-sky-500" : "bg-slate-100"
                      )}
                    >
                      <Check
                        className={cn(
                          "w-3 h-3",
                          plan.popular ? "text-white" : "text-sky-500"
                        )}
                      />
                    </div>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Guarantee footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            <span>🛡️</span>
            <span>30 noches de garantía total · Pago seguro SSL · Envío gratis en 24 h</span>
          </p>
        </div>
      </div>
    </section>
  );
}
