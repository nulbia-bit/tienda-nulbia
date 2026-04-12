"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Moon,
  Shield,
  Star,
  Eye,
  Brain,
  Radio,
  Wind,
  BarChart3,
  Package,
  Heart,
  Users,
} from "lucide-react";

// ── New components ────────────────────────────────────────────────────────────
import { ProjectBanner } from "@/components/ui/project-banner";
import { NavbarHero } from "@/components/ui/navbar-hero";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import PricingSection from "@/components/ui/pricing-section";
import { TestimonialsScroll, type TestimonialCard } from "@/components/ui/container-scroll";

// ── Animation helper ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "Detección Sensorial",
    content:
      "El micrófono MEMS de alta sensibilidad captura tu patrón de ronquido único en tiempo real. Reconoce la frecuencia exacta de tus vías respiratorias en menos de 300 ms, incluso en entornos ruidosos.",
    icon: Eye,
    relatedIds: [2],
    color: "#0EA5E9",
  },
  {
    id: 2,
    title: "Análisis IA",
    content:
      "El motor de inteligencia artificial procesa la señal acústica, clasifica el tipo de ronquido (obstructivo, posicional o nasal) y determina la intensidad de respuesta necesaria. Aprende de ti cada noche.",
    icon: Brain,
    relatedIds: [1, 3],
    color: "#38BDF8",
  },
  {
    id: 3,
    title: "Conducción Ósea",
    content:
      "Micro-impulsos de 20–50 Hz viajan por el hueso mandibular mediante conducción ósea directa. Completamente imperceptibles durante el sueño, no te despiertan ni molestan.",
    icon: Radio,
    relatedIds: [2, 4],
    color: "#0EA5E9",
  },
  {
    id: 4,
    title: "Apertura Vías",
    content:
      "La vibración estimula de forma involuntaria la musculatura faríngea y el paladar blando, reposicionando los tejidos que colapsan durante el ronquido y abriendo la vía aérea de forma natural.",
    icon: Wind,
    relatedIds: [3, 5],
    color: "#38BDF8",
  },
  {
    id: 5,
    title: "Reporte App",
    content:
      "Cada mañana recibes un informe detallado de tu calidad de sueño: fases, eventos de ronquido corregidos, saturación de oxígeno estimada y puntuación Nulbia. Tu historial, siempre en tu bolsillo.",
    icon: BarChart3,
    relatedIds: [1, 4],
    color: "#0EA5E9",
  },
];

const PRICING_PLANS = [
  {
    name: "1 Unidad",
    price: 149,
    description: "Para ti · Prueba sin riesgo",
    popular: false,
    buttonText: "Probar Nulbia",
    shopifyProductId: "gid://shopify/ProductVariant/43919647342635",
    includes: [
      "1 dispositivo Nulbia Sleep Pro",
      "App Nulbia con IA personalizada",
      "Seguimiento de calidad de sueño",
      "30 noches de garantía total",
      "Soporte prioritario por chat",
      "Carga magnética inalámbrica",
    ],
  },
  {
    name: "Pack Pareja",
    price: 249,
    description: "2 unidades · El más elegido",
    popular: true,
    buttonText: "Pedir Pack Pareja",
    shopifyProductId: "gid://shopify/ProductVariant/43919665397803",
    includes: [
      "2 dispositivos Nulbia Sleep Pro",
      "App para ambos con sincronía",
      "Panel de pareja en tiempo real",
      "30 noches de garantía total",
      "Envío express gratuito 24 h",
      "Soporte VIP prioritario",
      "Ahorra 49€ vs 2 unidades",
    ],
  },
  {
    name: "Pack Familiar",
    price: 349,
    description: "3 unidades · Toda la familia",
    popular: false,
    buttonText: "Pedir Pack Familiar",
    shopifyProductId: "gid://shopify/ProductVariant/43919674474539",
    includes: [
      "3 dispositivos Nulbia Sleep Pro",
      "App familiar multiusuario",
      "Historial de sueño 12 meses",
      "30 noches de garantía total",
      "Envío express gratuito 24 h",
      "Soporte VIP + línea directa",
      "Ahorra 98€ vs 3 unidades",
    ],
  },
];

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: 1,
    name: "María G.",
    role: "Madrid · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=5",
    initials: "MG",
    rating: 5,
    text: "Llevábamos 3 años durmiendo en habitaciones separadas. La primera semana con Nulbia ya dormimos juntos. Esto cambió mi matrimonio.",
    highlight: "Primera noche de cambio",
  },
  {
    id: 2,
    name: "Carlos R.",
    role: "Barcelona · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "CR",
    rating: 5,
    text: "Probé tiras nasales, almohadas especiales y hasta un aparato dental carísimo. Nada funcionó. Nulbia fue diferente desde el primer uso.",
    highlight: "97% de eficacia",
  },
  {
    id: 3,
    name: "Laura S.",
    role: "Valencia · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=9",
    initials: "LS",
    rating: 5,
    text: "Se lo compré a mi marido y ahora él me lo recomendó a mí. Somos un matrimonio de roncadores reformados. Dormimos mejor que nunca.",
    highlight: "Pack Pareja",
  },
  {
    id: 4,
    name: "Pablo M.",
    role: "Sevilla · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=14",
    initials: "PM",
    rating: 5,
    text: "El primer día pensé que era placebo. A la semana le pregunté a mi mujer y me dijo que no escuchaba nada. Absolutamente brutal.",
    highlight: "Silencio total",
  },
  {
    id: 5,
    name: "Sofía T.",
    role: "Bilbao · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=47",
    initials: "ST",
    rating: 5,
    text: "Mi padre tenía apnea leve. Después de 2 semanas con Nulbia, mi madre me llama para darme las gracias. Familia feliz, familia descansada.",
    highlight: "Pack Familiar",
  },
  {
    id: 6,
    name: "Javier L.",
    role: "Málaga · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=33",
    initials: "JL",
    rating: 5,
    text: "El pack de 2 fue la mejor inversión del año. Mi pareja y yo dormimos como nunca. Fin de los conflictos nocturnos para siempre.",
    highlight: "Mejor inversión",
  },
  {
    id: 7,
    name: "Ana P.",
    role: "Zaragoza · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=25",
    initials: "AP",
    rating: 5,
    text: "Increíble la tecnología. La app me muestra las fases del sueño y los eventos corregidos cada mañana. Me siento como nueva cada día.",
    highlight: "App imprescindible",
  },
  {
    id: 8,
    name: "Roberto V.",
    role: "Bilbao · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=52",
    initials: "RV",
    rating: 5,
    text: "Pequeño, cómodo y efectivo. No noto que lo llevo puesto. Mi pareja dice que llevo 3 semanas sin roncar ni una sola vez.",
    highlight: "Invisible al usarlo",
  },
  {
    id: 9,
    name: "Carmen N.",
    role: "Toledo · Compra verificada",
    avatar: "https://i.pravatar.cc/150?img=44",
    initials: "CN",
    rating: 5,
    text: "Dudaba mucho al principio. 30 noches de garantía me dieron la confianza. Ahora no me imagino dormir sin Nulbia.",
    highlight: "Garantía total",
  },
];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-sky-500" />,
    title: "Detección en 300 ms",
    description:
      "El micrófono MEMS de Nulbia reconoce tu patrón de ronquido único y actúa antes de que tu pareja lo escuche siquiera.",
  },
  {
    icon: <Moon className="w-6 h-6 text-sky-500" />,
    title: "Conducción ósea suave",
    description:
      "Micro-vibraciones de 20–50 Hz viajan por el hueso mandibular reposicionando la musculatura de la garganta sin despertarte.",
  },
  {
    icon: <Shield className="w-6 h-6 text-sky-500" />,
    title: "Sin efectos secundarios",
    description:
      "Sin pastillas, sin cirugía, sin aparatos incómodos. Solo tecnología de conducción ósea certificada médicamente.",
  },
  {
    icon: <Star className="w-6 h-6 text-sky-500" />,
    title: "IA que aprende contigo",
    description:
      "El algoritmo se adapta a tu fisiología cada noche. Cuanto más la usas, más efectiva y personalizada se vuelve.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NulbiaLanding() {
  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">

      {/* ── 1. Project Banner ───────────────────────────────────────── */}
      <ProjectBanner
        variant="success"
        label={
          <span>
            🚀 <strong>Lanzamiento:</strong> Prueba Nulbia Sleep Pro 30 noches sin compromiso.
          </span>
        }
        callToAction={{
          label: "Ver oferta especial",
          href: "#precios",
        }}
      />

      {/* ── 2. Navbar + Hero (con LimelightNav integrado) ───────────── */}
      <NavbarHero
        brandName="NULBIA"
        heroTitle={"Descanso Profundo.\nSin Ronquidos."}
        heroSubtitle="Monitor Biométrico de Sueño con IA"
        heroDescription="La primera neurotecnología wearable que detecta y elimina los ronquidos mediante IA y conducción ósea. Sin cirugía. Sin pastillas. Desde la primera noche."
        videoUrl="/producto.mp4"
      />

      {/* ── Social proof bar ────────────────────────────────────────── */}
      <div className="bg-slate-50 border-y border-slate-100 py-5">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-2">
            <span className="text-sky-500 font-black text-base">★★★★★</span>
            4.9 / 5 · 2.400 reseñas
          </span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>+12.000 parejas felices</span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>97% de eficacia clínica</span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>30 noches de garantía</span>
        </div>
      </div>

      {/* ── Visual Story — 4 imágenes narrativas ────────────────────── */}
      <section id="como-funciona" className="py-24 overflow-hidden">

        {/* Bloque 1: El problema — imagen + texto lado a lado */}
        <FadeUp>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center mb-28">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/50 group">
              <img
                src="/producto-2.jpg"
                alt="Por qué roncamos — anatomía de los ronquidos"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-5">
              <SectionPill>El problema</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                ¿Por qué roncamos y<br />
                <span className="text-sky-500">tenemos apnea?</span>
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Cuando dormimos, la garganta, la lengua y la mandíbula se relajan por completo. Esto estrecha la vía aérea y cuando inhalamos, el tejido blando vibra produciendo el ronquido. En casos más graves, la garganta se bloquea completamente: Apnea Obstructiva del Sueño.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {["Vía aérea colapsada durante el sueño", "Vibración del paladar blando y úvula", "Puede derivar en apnea obstructiva (AOS)", "Afecta al 45% de adultos mayores de 40 años"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    </div>
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Bloque 2: La tecnología IA — texto izq + imagen dcha */}
        <div className="bg-slate-900 py-20 mb-28 overflow-hidden">
          <FadeUp>
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
                  Tecnología exclusiva
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Doble pulso automático.<br />
                  <span className="text-sky-400">Respira sin esfuerzo.</span>
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  La tecnología TENS + EMA de doble pulso detecta el ronquido y aplica micro-impulsos que tensan los músculos alrededor de la garganta, abriendo la vía aérea de forma automática e inconsciente.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { v: "TENS", d: "Estimulación eléctrica transcutánea" },
                    { v: "EMA", d: "Avance mandibular eléctrico" },
                    { v: "IA", d: "Chip de inteligencia artificial" },
                    { v: "Auto", d: "Intensidad adaptativa en tiempo real" },
                  ].map((s) => (
                    <div key={s.v} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-sky-400 font-black text-lg">{s.v}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 order-1 md:order-2 group">
                <img
                  src="/producto-3.jpg"
                  alt="Tecnología de doble pulso TENS + EMA con IA"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Bloque 3: Uso real + App — imagen full width con overlay */}
        <FadeUp>
          <div className="max-w-6xl mx-auto px-6 mb-28">
            <div className="text-center mb-10">
              <SectionPill>En acción</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Se lleva puesto. La app lo controla todo.
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                Ponlo en la mandíbula, actívalo con un toque y duerme. Por la mañana, tu informe completo en el móvil.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200/50 group">
              <img
                src="/producto-4.jpg"
                alt="Nulbia en uso — estimulador muscular con app de monitoreo"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                {["Frecuencia respiratoria", "Posición al dormir", "Ronquidos detectados", "Eventos AOS"].map((stat) => (
                  <span key={stat} className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Bloque 4: Hero product shot — centrado con fondo oscuro */}
        <div className="bg-gradient-to-b from-slate-50 to-white py-16">
          <FadeUp>
            <div className="max-w-sm mx-auto px-6 text-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 group mb-8">
                <img
                  src="/producto-5.jpg"
                  alt="Nulbia Sleep Pro — vista del producto"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Nulbia Sleep Pro</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-4">El dispositivo más pequeño.<br />El impacto más grande.</h3>
              <a href="#precios" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3 rounded-xl shadow-md shadow-sky-200 transition-all hover:-translate-y-0.5">
                Quiero uno →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Features grid ───────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
        <FadeUp>
          <div className="text-center mb-14">
            <SectionPill>En detalle</SectionPill>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Cuatro pilares de la tecnología Nulbia
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto text-lg">
              La misma conducción ósea usada en dispositivos militares y médicos. Ahora en tu mesilla de noche.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} index={i}>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300 group h-full">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-5 group-hover:bg-sky-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        </div>
      </section>

      {/* ── Producto Showcase ───────────────────────────────────────── */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionPill>El dispositivo</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Pequeño. Inteligente.{" "}
                <span className="text-sky-500">Silencioso.</span>
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                8 gramos de neurotecnología que se adaptan a tu mandíbula y actúan mientras duermes profundamente.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagen del producto */}
            <FadeUp index={0}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/50 group">
                <img
                  src="/producto-1.jpg"
                  alt="Nulbia Sleep Pro — dispositivo anti-ronquidos"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeUp>

            {/* Specs */}
            <FadeUp index={1}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Un solo botón.<br />
                    <span className="text-sky-500">Toda la tecnología.</span>
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    Diseñado para que no notes que lo llevas puesto. La forma ergonómica se adapta a la mandíbula mientras duermes en cualquier postura.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "8 g", label: "Peso ultraligero" },
                    { value: "7 días", label: "Batería por carga" },
                    { value: "300 ms", label: "Tiempo de respuesta" },
                    { value: "IPX4", label: "Resistente al sudor" },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:border-sky-100 transition-colors"
                    >
                      <p className="text-2xl font-black text-sky-500">{spec.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{spec.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    "Detección de ronquidos en tiempo real",
                    "Conducción ósea mandibular certificada",
                    "IA que aprende tu patrón cada noche",
                    "App con informe de sueño diario",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-600">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#precios"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Ver precios →
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 3. Radial Orbital Timeline ──────────────────────────────── */}
      <div id="tecnologia">
        <FadeUp>
          <RadialOrbitalTimeline
            timelineData={TIMELINE_DATA}
            title="El Ciclo del Sueño Inteligente"
            subtitle="Cinco fases de protección activa que Nulbia ejecuta cada noche mientras duermes"
          />
        </FadeUp>
      </div>

      {/* ── 4. Pricing Section ──────────────────────────────────────── */}
      <PricingSection plans={PRICING_PLANS} />

      {/* ── 5. Testimonios 3D (ContainerScroll + CardTransformed) ───── */}
      <TestimonialsScroll testimonials={TESTIMONIALS} />

      {/* ── Guarantee strip ─────────────────────────────────────────── */}
      <div className="bg-sky-500 py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <div className="text-5xl mb-4">🛡️</div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              30 noches de garantía total
            </h2>
            <p className="text-sky-100 text-lg max-w-xl mx-auto mb-8">
              Si en 30 noches Nulbia no elimina tus ronquidos, te devolvemos cada céntimo. Sin preguntas, sin formularios, sin excusas.
            </p>
            <a
              href="#precios"
              className="inline-flex items-center gap-2 bg-white text-sky-600 font-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-base"
            >
              Probar sin riesgo →
            </a>
          </FadeUp>
        </div>
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-24">
        <FadeUp>
          <div className="text-center mb-12">
            <SectionPill>Preguntas frecuentes</SectionPill>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Todo lo que necesitas saber
            </h2>
          </div>
        </FadeUp>

        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              q: "¿Cuánto tarda en funcionar?",
              a: "El 89% de los usuarios nota resultados desde la primera noche. Para el 97% la mejora es total antes de los 7 días.",
            },
            {
              q: "¿Es cómodo de llevar puesto?",
              a: "Nulbia pesa 8 g y tiene un diseño ergonómico certificado para ser imperceptible durante el sueño, en cualquier postura.",
            },
            {
              q: "¿Funciona para la apnea del sueño?",
              a: "Nulbia está diseñado para ronquidos habituales. Para apnea severa recomendamos consultar con un especialista antes de usarlo.",
            },
            {
              q: "¿Cómo funciona la garantía de 30 noches?",
              a: "Escríbenos a soporte@nulbia.com dentro de los 30 días tras recibirlo. Gestionamos la devolución en menos de 48 horas.",
            },
            {
              q: "¿Necesita cargarse? ¿Cuánto dura la batería?",
              a: "La batería dura una semana entera de uso nocturno. Se carga en 45 minutos con el estuche de carga magnética incluido.",
            },
          ].map((faq, i) => (
            <FadeUp key={i} index={i}>
              <details className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-sky-100 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-slate-900 font-semibold text-base select-none list-none">
                  {faq.q}
                  <span className="text-sky-400 text-xl font-light transition-transform group-open:rotate-45 ml-4 flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed -mt-2">
                  {faq.a}
                </p>
              </details>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="text-5xl mb-6 animate-float inline-block">🌙</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Esta noche puede ser diferente.
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Únete a más de 12.000 personas que recuperaron su sueño y el de su pareja con Nulbia. Sin riesgos, sin permanencia.
            </p>
            <a
              href="#precios"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-black px-10 py-4 rounded-2xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-1 transition-all duration-200 text-lg pulse-glow"
            >
              Pedir Nulbia ahora →
            </a>
            <p className="mt-5 text-slate-400 text-sm">
              30 noches de garantía · Envío gratis · Pago seguro SSL
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-slate-50 border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <a href="/">
            <img src="/logo.jpg" alt="Nulbia" className="h-7 w-auto object-contain" />
          </a>
          <p>© 2026 Nulbia Technologies SL · Todos los derechos reservados</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-sky-500 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-sky-500 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-sky-500 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
