"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  ShoppingBag, Loader2, Star, ShieldCheck, Truck, RotateCcw,
  Zap, Moon, Mic, Activity, Brain, Sparkles, ChevronDown,
} from "lucide-react";

import { HeroCollage } from "@/components/ui/hero-collage";
import { LiveVisitorCounter } from "@/components/ui/live-visitor-counter";
import { BentoGridShowcase } from "@/components/ui/bento-grid-showcase";
import { Stepper } from "@/components/ui/stepper";
import { AccordionFAQ } from "@/components/ui/accordion-faq";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { SideCartDrawer, CartItem } from "@/components/ui/side-cart-drawer";
import { createCheckout, VARIANT_IDS, CHECKOUT_URLS } from "@/lib/shopify";

// ─── Product catalogue ──────────────────────────────────────────────────────

const PRODUCTS = {
  "sleep-pro": {
    slug: "sleep-pro",
    name: "Nulbia Sleep Pro",
    tagline: "Estimulador Muscular Electrónico inteligente · Solución avanzada para el tratamiento de ronquidos",
    price: 149,
    originalPrice: 229,
    variantId: VARIANT_IDS.oneUnit,
    checkoutUrl: CHECKOUT_URLS.oneUnit,
    badge: "Más vendido",
    images: [
      "/producto-1.jpg",
      "/producto-2.jpg",
      "/producto-3.jpg",
      "/producto-4.jpg",
      "/producto-5.jpg",
    ],
    shortFeatures: [
      "IA biométrica personalizada",
      "Sin pastillas ni aparatos molestos",
      "Resultados en la 1.ª noche",
      "30 noches de garantía",
    ],
  },
  "pack-pareja": {
    slug: "pack-pareja",
    name: "Pack Pareja",
    tagline: "Dos unidades para dormir juntos sin ronquidos",
    price: 249,
    originalPrice: 458,
    variantId: VARIANT_IDS.twoUnits,
    checkoutUrl: CHECKOUT_URLS.twoUnits,
    badge: "Ahorra 45%",
    images: [
      "/producto-1.jpg",
      "/producto-2.jpg",
      "/producto-3.jpg",
      "/producto-4.jpg",
    ],
    shortFeatures: [
      "2 × Nulbia Sleep Pro",
      "IA independiente para cada usuario",
      "Ahorro de 209€ vs 2 unidades",
      "30 noches de garantía",
    ],
  },
  "pack-familiar": {
    slug: "pack-familiar",
    name: "Pack Familiar",
    tagline: "Tres unidades para toda la familia",
    price: 329,
    originalPrice: 687,
    variantId: VARIANT_IDS.threeUnits,
    checkoutUrl: CHECKOUT_URLS.threeUnits,
    badge: "Mejor valor",
    images: [
      "/producto-1.jpg",
      "/producto-2.jpg",
      "/producto-3.jpg",
    ],
    shortFeatures: [
      "3 × Nulbia Sleep Pro",
      "IA personalizada por usuario",
      "Ahorro de 358€",
      "30 noches de garantía",
    ],
  },
};

type Slug = keyof typeof PRODUCTS;

// ─── Shared content ──────────────────────────────────────────────────────────

const BENTO_ITEMS = [
  {
    icon: <Brain className="h-5 w-5" />,
    highlight: "EMS",
    title: "Estimulación Muscular Electrónica",
    description:
      "Impulsos de frecuencia media (10Hz - 1500Hz) activan los músculos de la garganta para abrir las vías respiratorias automáticamente.",
  },
  {
    icon: <Moon className="h-5 w-5" />,
    highlight: "98%",
    title: "Reducción de ronquidos",
    description:
      "En estudios clínicos independientes, el 98% de los usuarios dejaron de roncar desde la primera noche.",
  },
  {
    icon: <Mic className="h-5 w-5" />,
    highlight: "-36dB",
    title: "Silencio garantizado",
    description:
      "La estimulación EMS detiene los ronquidos sin despertar al usuario ni a su pareja.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    highlight: "15h+",
    title: "Batería ultralarga",
    description:
      "Más de 15 horas de uso continuo. Se carga en 2 horas mediante la base de carga incluida.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    highlight: "0.3s",
    title: "Respuesta instantánea",
    description:
      "Detecta y neutraliza el ronquido en menos de 300ms. Tu pareja no sabrá que ocurrió.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    highlight: "30d",
    title: "Garantía sin preguntas",
    description:
      "Si no notas resultados en 30 noches, devolvemos el 100% de tu dinero. Sin letra pequeña.",
  },
];

const HOW_IT_WORKS = [
  {
    number: 1,
    title: "Colócatelo antes de dormir",
    description:
      "En menos de 30 segundos. Se adapta a cualquier forma de nariz con la almohadilla flexible incluida.",
  },
  {
    number: 2,
    title: "La IA detecta el ronquido",
    description:
      "El sensor biométrico identifica las vibraciones características del ronquido con precisión del 99,2%.",
  },
  {
    number: 3,
    title: "La estimulación EMS actúa",
    description:
      "La Estimulación Muscular Electrónica (EMS) activa los músculos de la garganta con impulsos de 10Hz - 1500Hz, abriendo las vías respiratorias al instante.",
  },
  {
    number: 4,
    title: "Aprende y mejora cada noche",
    description:
      "La IA crea un perfil biométrico personalizado que optimiza la respuesta noche tras noche.",
  },
];

const REVIEWS = [
  {
    name: "Carlos M.",
    location: "Madrid",
    rating: 5,
    text: "Mi mujer llevaba años sin dormir bien por culpa de mis ronquidos. Desde la primera noche con Nulbia, silencio total. No exagero. Mejor inversión de mi vida.",
    verified: true,
  },
  {
    name: "Laura P.",
    location: "Barcelona",
    rating: 5,
    text: "Compré el pack pareja porque mi marido también roncaba. Llevamos 3 semanas y los dos dormimos perfectamente. El envío llegó al día siguiente como prometieron.",
    verified: true,
  },
  {
    name: "Javier R.",
    location: "Sevilla",
    rating: 5,
    text: "Era muy escéptico pero la garantía de 30 días me convenció de probar. Al tercer día ya no roncaba. Me quedé flipado. Lo recomendé a mi padre y también le funcionó.",
    verified: true,
  },
  {
    name: "Ana G.",
    location: "Valencia",
    rating: 5,
    text: "Después de probar tiras nasales, almohadas especiales y pastillas sin resultado, Nulbia fue un antes y un después. Es increíble la tecnología que tiene.",
    verified: true,
  },
  {
    name: "Tomás F.",
    location: "Bilbao",
    rating: 5,
    text: "La aplicación de seguimiento del sueño me muestra cómo mejoro cada noche. Es adictivo ver la curva. Y duermo como nunca había dormido en 20 años.",
    verified: true,
  },
  {
    name: "Elena D.",
    location: "Zaragoza",
    rating: 4,
    text: "Al principio tuve dudas sobre si sería incómodo durante el sueño, pero se olvida que lo llevas puesto. Y los ronquidos de mi marido desaparecieron desde el primer uso.",
    verified: true,
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Nulbia funciona desde la primera noche?",
    answer:
      "El 94% de los usuarios reportan una reducción significativa de ronquidos desde la primera noche. El estimulador comienza a aprender tu patrón de sueño desde el primer uso y mejora con el tiempo.",
  },
  {
    question: "¿Es incómodo dormir con él puesto?",
    answer:
      "No. El estimulador pesa 11.6 gramos y se diseñó para ser completamente olvidado durante el sueño. La mayoría de usuarios dicen que en 2-3 noches no lo notan en absoluto.",
  },
  {
    question: "¿Cómo funciona exactamente la tecnología EMS?",
    answer:
      "La Estimulación Muscular Electrónica (EMS) emite impulsos de frecuencia media (10Hz - 1500Hz) que activan los músculos de la garganta para mantener abiertas las vías respiratorias sin despertar al usuario.",
  },
  {
    question: "¿Qué pasa si no me funciona?",
    answer:
      "Tienes 30 noches de garantía total. Si no estás satisfecho por cualquier motivo, contactas con nosotros y te devolvemos el 100% del importe pagado. Sin preguntas, sin letra pequeña.",
  },
  {
    question: "¿Es seguro para el corazón o personas con marcapasos?",
    answer:
      "Nulbia usa microestimulación de baja frecuencia (<1mA) sin campo electromagnético externo. No obstante, si llevas marcapasos o tienes una condición cardíaca, consulta con tu médico antes de usarlo.",
  },
  {
    question: "¿Cuánto dura la batería y cómo se carga?",
    answer:
      "Más de 15 horas de uso continuo. Se carga en 2 horas mediante la base de carga incluida.",
  },
];

// ─── Page component ──────────────────────────────────────────────────────────

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS[slug as Slug];
  if (!product) notFound();

  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Ref for the main CTA (to show sticky bar when out of view)
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: false });

  const handleAddToCart = () => {
    const existing = cartItems.find((i) => i.variantId === product.variantId);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.variantId === product.variantId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          variantId:    product.variantId,
          checkoutUrl:  product.checkoutUrl,
          title:        product.name,
          price:        product.price,
          originalPrice: product.originalPrice,
          quantity:     1,
          image:        product.images[0],
        },
      ]);
    }
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    setLoading(true);
    const url = createCheckout(product.variantId);
    window.open(url, "_top");
  };

  const handleQtyChange = (variantId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity: qty } : i))
    );
  };

  const handleRemove = (variantId: string) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <>
      {/* Side Cart Drawer */}
      <SideCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onQuantityChange={handleQtyChange}
        onRemove={handleRemove}
      />

      {/* Sticky Add-to-Cart bar (visible when main CTA out of view) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          ctaInView ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="bg-white border-t border-slate-200 shadow-2xl px-4 py-3 flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm truncate">{product.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-sky-600 font-black text-base">{product.price}€</span>
              <span className="text-slate-400 text-xs line-through">{product.originalPrice}€</span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            Añadir
          </button>
          <button
            onClick={handleBuyNow}
            disabled={loading}
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70 flex items-center gap-1.5"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Comprar"}
          </button>
        </div>
      </div>

      <main className="min-h-screen bg-white pb-24">
        {/* ── Breadcrumb ── */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <nav className="text-xs text-slate-400 flex items-center gap-1.5">
            <a href="/" className="hover:text-sky-500 transition-colors">Inicio</a>
            <ChevronDown className="h-3 w-3 -rotate-90" />
            <span className="text-slate-600 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* ── Hero: Image + Info ── */}
        <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Image collage */}
          <HeroCollage images={product.images} productName={product.name} />

          {/* Right: Product info */}
          <div className="flex flex-col gap-5">
            {/* Badge + Live counter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
              <LiveVisitorCounter baseCount={37} productName={product.name} />
            </div>

            {/* Title + tagline */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-500 mt-1.5 text-base">{product.tagline}</p>
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

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-sky-600">{product.price}€</span>
              <span className="text-xl text-slate-400 line-through">{product.originalPrice}€</span>
              <span className="bg-rose-50 text-rose-600 text-sm font-bold px-2.5 py-0.5 rounded-lg">
                -{discount}%
              </span>
            </div>

            {/* Short features */}
            <ul className="grid grid-cols-1 gap-1.5">
              {product.shortFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-col gap-3 pt-1">
              <button
                onClick={handleBuyNow}
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-sky-200/60 hover:shadow-sky-300/60 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Comprar ahora — {product.price}€
                  </>
                )}
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-sky-200 text-sky-600 hover:border-sky-400 hover:bg-sky-50 font-bold py-3.5 rounded-2xl text-base transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Añadir al carrito
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <RotateCcw className="h-4 w-4 text-sky-500" />
                30 noches garantía
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Truck className="h-4 w-4 text-sky-500" />
                Envío gratis 24h
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                Pago 100% seguro
              </span>
            </div>
          </div>
        </section>

        {/* ── Bento: Features Grid ── */}
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

        {/* ── How it works Stepper ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Cómo funciona
            </h2>
            <p className="text-slate-500 text-base">
              En 4 pasos simples, tu vida cambia.
            </p>
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

          {/* Aggregate stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { value: "4.9/5", label: "Valoración media" },
              { value: "98%", label: "Reduce ronquidos" },
              { value: "2.847", label: "Clientes felices" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-sky-50 rounded-2xl py-4 px-2 border border-sky-100"
              >
                <p className="text-2xl font-black text-sky-600">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Preguntas frecuentes
            </h2>
          </div>
          <AccordionFAQ items={FAQ_ITEMS} />
        </section>

        {/* ── Final CTA ── */}
        <section className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="bg-gradient-to-b from-sky-50 to-white border border-sky-100 rounded-3xl p-8">
            <Sparkles className="h-8 w-8 text-sky-500 mx-auto mb-3" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Esta noche duermes bien
            </h2>
            <p className="text-slate-500 mb-6 text-base">
              Únete a más de 2.800 personas que ya duermen sin ronquidos.
              Con garantía de 30 noches.
            </p>
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-sky-200/60 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Quiero dormir mejor — {product.price}€
                </>
              )}
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
