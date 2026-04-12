"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type React from "react";

interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

function CreativePricing({
  tag = "Elige tu pack",
  title = "Precio único. Sin suscripción.",
  description = "Un solo pago. Descansa mejor desde esta noche.",
  tiers,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-sm font-semibold px-4 py-1.5 rounded-full">
          {tag}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">{description}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group transition-all duration-300",
              index === 0 && "md:rotate-[-1deg]",
              index === 1 && "md:rotate-[0.5deg] md:-translate-y-2",
              index === 2 && "md:rotate-[-1.5deg]"
            )}
          >
            {/* Card shadow layer */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl transition-all duration-300",
                tier.popular
                  ? "bg-sky-500 translate-x-[5px] translate-y-[5px] group-hover:translate-x-[8px] group-hover:translate-y-[8px]"
                  : "bg-slate-200 translate-x-[5px] translate-y-[5px] group-hover:translate-x-[8px] group-hover:translate-y-[8px]"
              )}
            />

            {/* Card body */}
            <div
              className={cn(
                "relative rounded-2xl border-2 overflow-hidden bg-white",
                tier.popular ? "border-sky-500" : "border-slate-200"
              )}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-px left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400" />
              )}
              {tier.popular && (
                <div className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-sky-200">
                  MÁS POPULAR
                </div>
              )}

              <div className="p-7">
                {/* Icon + Name */}
                <div className="mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                      tier.popular
                        ? "bg-sky-100 text-sky-500"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">{tier.price}€</span>
                    {tier.originalPrice && (
                      <span className="text-slate-400 line-through text-lg mb-1">
                        {tier.originalPrice}€
                      </span>
                    )}
                  </div>
                  {tier.originalPrice && (
                    <p className="text-sky-500 text-xs font-semibold mt-1">
                      Ahorras {tier.originalPrice - tier.price}€
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          tier.popular ? "bg-sky-100 text-sky-500" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.ctaHref ?? "#comprar"}
                  className={cn(
                    "flex items-center justify-center w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200",
                    tier.popular
                      ? "bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5"
                      : "bg-slate-900 hover:bg-slate-800 active:bg-slate-900 text-white shadow-md hover:-translate-y-0.5"
                  )}
                >
                  {tier.ctaLabel ?? "Pedir ahora"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust footer */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Pago 100% seguro
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          30 noches de garantía total
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Envío gratis en 24–48 h
        </span>
      </div>
    </div>
  );
}

export { CreativePricing, type PricingTier };
