"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ShoppingBag, Loader2, Star, ShieldCheck, Truck, RotateCcw,
  Zap, Moon, Mic, Activity, Brain, Sparkles, ChevronDown, Check,
} from "lucide-react";

import { HeroCollage }        from "@/components/ui/hero-collage";
import { LiveVisitorCounter } from "@/components/ui/live-visitor-counter";
import { BentoGridShowcase }  from "@/components/ui/bento-grid-showcase";
import { Stepper }            from "@/components/ui/stepper";
import { AccordionFAQ }       from "@/components/ui/accordion-faq";
import { TestimonialSlider }  from "@/components/ui/testimonial-slider";
import { SideCartDrawer, CartItem } from "@/components/ui/side-cart-drawer";
import { VARIANT_IDS } from "@/lib/shopify";
import { cn } from "@/lib/utils";

// ─── Pack config ──────────────────────────────────────────────────────────────

type PackKey = "individual" | "pareja" | "familiar";

const PACK_CONFIG: Record<PackKey, {
  key: PackKey;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  variantId: string;
  badge: string | null;
}> = {
  individual: {
    key: "individual",
    name: "Nulbia Sleep Pro — 1 Unidad",
    subtitle: "Para ti · Prueba sin riesgo",
    price: 149,
    originalPrice: 199,
    variantId: VARIANT_IDS.oneUnit,
    badge: null,
  },
  pareja: {
    key: "pareja",
    name: "Nulbia Sleep Pro — Pack Pareja",
    subtitle: "2 unidades · El más elegido",
    price: 249,
    originalPrice: 458,
    variantId: VARIANT_IDS.twoUnits,
    badge: "Más popular",
  },
  familiar: {
    key: "familiar",
    name: "Nulbia Sleep Pro — Pack Familiar",
    subtitle: "3 unidades · Toda la familia",
    price: 349,
    originalPrice: 597,
    variantId: VARIANT_IDS.threeUnits,
    badge: "Mejor valor",
  },
};

const PACK_KEYS: PackKey[] = ["individual", "pareja", "familiar"];

const IMAGES = [
  "/producto-1.jpg",
  "/producto-2.jpg",
  "/producto-3.jpg",
  "/producto-4.jpg",
  "/producto-5.jpg",
];

// ─── Static content ───────────────────────────────────────────────────────────

const BENTO_ITEMS = [
  { icon: <Brain    className="h-5 w-5" />, highlight: "IA",    title: "Inteligencia Artificial Biométrica",   description: "Aprende tu patrón de sueño y ajusta la estimulación ósea en tiempo real para máxima eficacia." },
  { icon: <Moon     className="h-5 w-5" />, highlight: "98%",   title: "Reducción de ronquidos",               description: "En estudios clínicos independientes, el 98% de los usuarios dejaron de roncar desde la primera noche." },
  { icon: <Mic      className="h-5 w-5" />, highlight: "-36dB", title: "Silencio garantizado",                 description: "La conducción ósea detiene los ronquidos sin despertar al usuario ni a su pareja." },
  { icon: <Activity className="h-5 w-5" />, highlight: "7h",    title: "Batería ultralarga",                   description: "Carga completa en 60 minutos y aguanta toda la noche sin interrupción." },
  { icon: <Zap      className="h-5 w-5" />, highlight: "0.3s",  title: "Respuesta instantánea",                description: "Detecta y neutraliza el ronquido en menos de 300ms. Tu pareja no sabrá que ocurrió." },
  { icon: <ShieldCheck className="h-5 w-5" />, highlight: "30d", title: "Garantía sin preguntas",              description: "Si no notas resultados en 30 noches, devolvemos el 100% de tu dinero. Sin letra pequeña." },
];

const HOW_IT_WORKS = [
  { number: 1, title: "Colócatelo antes de dormir",  description: "En menos de 30 segundos. Se adapta a cualquier forma de nariz con la almohadilla flexible incluida." },
  { number: 2, title: "La IA detecta el ronquido",   description: "El sensor biométrico identifica las vibraciones características del ronquido con precisión del 99,2%." },
  { number: 3, title: "La conducción ósea actúa",    description: "Una microestimulación imperceptible relaja los tejidos de la garganta y elimina el ronquido al instante." },
  { number: 4, title: "Aprende y mejora cada noche", description: "La IA crea un perfil biométrico personalizado que optimiza la respuesta noche tras noche." },
];

const REVIEWS = [
  { name: "Carlos M.", location: "Madrid",    rating: 5, text: "Mi mujer llevaba años sin dormir bien por culpa de mis ronquidos. Desde la primera noche con Nulbia, silencio total. Mejor inversión de mi vida.",    verified: true },
  { name: "Laura P.",  location: "Barcelona", rating: 5, text: "Compré el pack pareja porque mi marido también roncaba. Llevamos 3 semanas y los dos dormimos perfectamente. El envío llegó al día siguiente.",       verified: true },
  { name: "Javier R.", location: "Sevilla",   rating: 5, text: "Era muy escéptico pero la garantía de 30 días me convenció de probar. Al tercer día ya no roncaba. Lo recomendé a mi padre y le funcionó igual.",    verified: true },
  { name: "Ana G.",    location: "Valencia",  rating: 5, text: "Después de probar tiras nasales, almohadas especiales y pastillas sin resultado, Nulbia fue un antes y un después. Tecnología increíble.",           verified: true },
  { name: "Tomás F.",  location: "Bilbao",    rating: 5, text: "La app me muestra cómo mejoro cada noche. Y duermo como nunca había dormido en 20 años.",                                                            verified: true },
  { name: "Elena D.",  location: "Zaragoza",  rating: 4, text: "Al principio tuve dudas pero se olvida que lo llevas puesto. Los ronquidos de mi marido desaparecieron desde el primer uso.",                        verified: true },
];

const FAQ_ITEMS = [
  { question: "¿Nulbia funciona desde la primera noche?",       answer: "El 94% de los usuarios reportan una reducción significativa desde la primera noche. El dispositivo aprende tu patrón de sueño y mejora con el tiempo." },
  { question: "¿Es incómodo dormir con él puesto?",             answer: "No. Pesa menos de 12 gramos y se diseñó para ser completamente olvidado durante el sueño. La mayoría dice que en 2-3 noches no lo nota." },
  { question: "¿Cómo funciona la conducción ósea?",             answer: "Transmite microvibraciones a través del cartílago nasal hasta los tejidos blandos de la garganta, produciendo una leve contracción muscular que abre la vía aérea sin despertar al usuario." },
  { question: "¿Qué pasa si no me funciona?",                   answer: "Tienes 30 noches de garantía total. Si no estás satisfecho, te devolvemos el 100% del importe pagado. Sin preguntas, sin letra pequeña." },
  { question: "¿Es seguro para personas con marcapasos?",       answer: "Nulbia usa microestimulación de baja frecuencia (<1mA). Si llevas marcapasos o tienes condición cardíaca, consulta con tu médico antes de usarlo." },
  { question: "¿Cuánto dura la batería y cómo se carga?",       answer: "7-9 horas de batería, suficiente para una noche completa. Carga USB-C en 60 minutos. Cable y cargador incluidos." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductoClient() {
  const searchParams = useSearchParams();
  const rawPack = searchParams.get("pack") as PackKey | null;
  const activePack: PackKey = rawPack && PACK_CONFIG[rawPack] ? rawPack : "individual";

  const [selectedKey, setSelectedKey] = useState<PackKey>(activePack);
  const [cartOpen, setCartOpen]       = useState(false);
  const [cartItems, setCartItems]     = useState<CartItem[]>([]);

  const ctaRef    = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: false });

  const pack     = PACK_CONFIG[selectedKey];
  const discount = Math.round(((pack.originalPrice - pack.price) / pack.originalPrice) * 100);

  // Añade el pack seleccionado al carrito y abre el drawer
  const openCartWith = (key: PackKey = selectedKey) => {
    const p = PACK_CONFIG[key];
    setCartItems((prev) => {
      const exists = prev.find((i) => i.variantId === p.variantId);
      if (exists) {
        return prev.map((i) =>
          i.variantId === p.variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          variantId:     p.variantId,
          title:         p.name,
          subtitle:      p.subtitle,
          price:         p.price,
          originalPrice: p.originalPrice,
          quantity:      1,
          image:         IMAGES[0],
        },
      ];
    });
    setCartOpen(true);
  };

  const handleQtyChange = (variantId: string, qty: number) =>
    setCartItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity: qty } : i))
    );

  const handleRemove = (variantId: string) =>
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));

  return (
    <>
      {/* ── Side Cart Drawer ── */}
      <SideCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onQuantityChange={handleQtyChange}
        onRemove={handleRemove}
      />

      {/* ── Sticky bottom bar (aparece cuando el CTA principal sale de pantalla) ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          ctaInView ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="bg-white border-t border-slate-200 shadow-2xl px-4 py-3 flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm truncate">{pack.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-sky-600 font-black text-base">{pack.price}€</span>
              <span className="text-slate-400 text-xs line-through">{pack.originalPrice}€</span>
            </div>
          </div>
          <button
            onClick={() => openCartWith()}
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="h-4 w-4" />
            Añadir
          </button>
        </div>
      </div>

      <main className="min-h-screen bg-white pb-24">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <nav className="text-xs text-slate-400 flex items-center gap-1.5">
            <a href="/" className="hover:text-sky-500 transition-colors">Inicio</a>
            <ChevronDown className="h-3 w-3 -rotate-90" />
            <span className="text-slate-600 font-medium">Nulbia Sleep Pro</span>
          </nav>
        </div>

        {/* ── HERO: imagen + configurador ── */}
        <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <HeroCollage images={IMAGES} productName="Nulbia Sleep Pro" />

          <div className="flex flex-col gap-5">
            {/* Badge + live counter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">Más vendido</span>
              <LiveVisitorCounter baseCount={37} productName="Nulbia Sleep Pro" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Nulbia Sleep Pro
              </h1>
              <p className="text-slate-500 mt-1.5 text-base">
                Elimina los ronquidos con IA + conducción ósea
              </p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">4.9</span>
              <span className="text-sm text-slate-400">(2.847 valoraciones)</span>
            </div>

            {/* ── Pack selector ── */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selecciona tu pack</p>
              {PACK_KEYS.map((key) => {
                const p = PACK_CONFIG[key];
                const isActive = selectedKey === key;
                const packDiscount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className={cn(
                      "relative flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-all",
                      isActive ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-200"
                    )}
                  >
                    {p.badge && (
                      <span className="absolute -top-2.5 right-3 bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        isActive ? "border-sky-500 bg-sky-500" : "border-slate-300"
                      )}>
                        {isActive && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{p.name.replace("Nulbia Sleep Pro — ", "")}</p>
                        <p className="text-slate-400 text-xs">{p.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="font-black text-slate-900 text-base">{p.price}€</p>
                      <p className="text-slate-400 text-xs line-through">{p.originalPrice}€ <span className="text-rose-500 no-underline">-{packDiscount}%</span></p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-sky-600">{pack.price}€</span>
              <span className="text-xl text-slate-400 line-through">{pack.originalPrice}€</span>
              <span className="bg-rose-50 text-rose-600 text-sm font-bold px-2.5 py-0.5 rounded-lg">
                -{discount}%
              </span>
            </div>

            {/* ── CTA buttons ── */}
            <div ref={ctaRef} className="flex flex-col gap-3 pt-1">
              {/* Comprar ahora → abre carrito */}
              <button
                onClick={() => openCartWith()}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-sky-200/60 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Comprar ahora — {pack.price}€
              </button>
              {/* Añadir al carrito → abre carrito */}
              <button
                onClick={() => openCartWith()}
                className="w-full border-2 border-sky-200 text-sky-600 hover:border-sky-400 hover:bg-sky-50 font-bold py-3.5 rounded-2xl text-base transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Añadir al carrito
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <RotateCcw className="h-4 w-4 text-sky-500" />30 noches garantía
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Truck className="h-4 w-4 text-sky-500" />Envío gratis 24h
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="h-4 w-4 text-sky-500" />Pago 100% seguro
              </span>
            </div>
          </div>
        </section>

        {/* ── Bento features ── */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Tecnología que transforma tu sueño
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              Cada detalle de Nulbia ha sido diseñado para darte resultados reales desde la primera noche.
            </p>
          </div>
          <BentoGridShowcase items={BENTO_ITEMS} />
        </section>

        {/* ── How it works ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Cómo funciona</h2>
            <p className="text-slate-500 text-base">En 4 pasos simples, tu vida cambia.</p>
          </div>
          <Stepper steps={HOW_IT_WORKS} />
        </section>

        {/* ── Testimonials ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Más de 2.800 familias duermen mejor
            </h2>
            <p className="text-slate-500 text-base">Opiniones reales de compradores verificados</p>
          </div>
          <TestimonialSlider reviews={REVIEWS} />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[{value:"4.9/5",label:"Valoración media"},{value:"98%",label:"Reduce ronquidos"},{value:"2.847",label:"Clientes felices"}].map((s) => (
              <div key={s.label} className="text-center bg-sky-50 rounded-2xl py-4 px-2 border border-sky-100">
                <p className="text-2xl font-black text-sky-600">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Preguntas frecuentes</h2>
          </div>
          <AccordionFAQ items={FAQ_ITEMS} />
        </section>

        {/* ── Final CTA ── */}
        <section className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="bg-gradient-to-b from-sky-50 to-white border border-sky-100 rounded-3xl p-8">
            <Sparkles className="h-8 w-8 text-sky-500 mx-auto mb-3" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">Esta noche duermes bien</h2>
            <p className="text-slate-500 mb-6 text-base">
              Únete a más de 2.800 personas que ya duermen sin ronquidos. Con garantía de 30 noches.
            </p>
            <button
              onClick={() => openCartWith()}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-sky-200/60 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Quiero dormir mejor — {pack.price}€
            </button>
            <p className="text-xs text-slate-400 mt-3">
              Pago seguro · Envío gratis 24h · Devolución sin preguntas
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
