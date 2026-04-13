"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Shield,
  Truck,
  Zap,
  Moon,
  Star,
  Eye,
  Brain,
  Radio,
  Wind,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Smile,
  Check,
  Sparkles,
} from "lucide-react";

// ── Componentes del embudo ────────────────────────────────────────────────────
import { UpgradeBanner }      from "@/components/ui/upgrade-banner";
import { FloatingHeader }     from "@/components/ui/floating-header";
import { CustomButton }       from "@/components/ui/custom-button";
import { StatusBadge }        from "@/components/ui/status-badge";
import { ProductCard }        from "@/components/ui/product-card";
import { Frame, FramePanel, FrameHeader, FrameIcon, FrameTitle, FrameDescription } from "@/components/ui/frames";
import { TestimonialsScroll } from "@/components/ui/container-scroll";
import TimerBasic             from "@/components/ui/timer-basic";
import { LeadCapture }        from "@/components/ui/lead-capture";
import { Footer7 }            from "@/components/ui/footer7";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";

// ── Helper ────────────────────────────────────────────────────────────────────
function FadeUp({ children, index = 0, className = "" }: { children: React.ReactNode; index?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TIMELINE_DATA: TimelineItem[] = [
  { id: 1, title: "Detección Sensorial", content: "El micrófono MEMS captura tu patrón de ronquido en menos de 300 ms, incluso en entornos ruidosos.", icon: Eye, relatedIds: [2] },
  { id: 2, title: "Análisis IA", content: "El motor de IA clasifica el tipo de ronquido (obstructivo, posicional o nasal) y determina la respuesta necesaria. Aprende de ti cada noche.", icon: Brain, relatedIds: [1, 3] },
  { id: 3, title: "Estimulación EMS", content: "Impulsos de frecuencia media (10Hz - 1500Hz) activan los músculos de la garganta para abrir las vías respiratorias de forma automática e imperceptible.", icon: Radio, relatedIds: [2, 4] },
  { id: 4, title: "Apertura Vías", content: "La Estimulación Muscular Electrónica (EMS) reactiva los tejidos que colapsan durante el ronquido, abriendo la vía aérea de forma natural.", icon: Wind, relatedIds: [3, 5] },
  { id: 5, title: "Sincronización Sleeplus", content: "Sincroniza tus datos vía Bluetooth con la App Sleeplus para monitorizar tus ronquidos, fases del sueño y reportes de calidad respiratoria.", icon: BarChart3, relatedIds: [1, 4] },
];

const TESTIMONIALS = [
  { id: 1, name: "María G.", role: "Madrid · Compra verificada", avatar: "https://i.pravatar.cc/150?img=5", initials: "MG", rating: 5, text: "Llevábamos 3 años durmiendo en habitaciones separadas. La primera semana con Nulbia ya dormimos juntos. Esto cambió mi matrimonio.", highlight: "Primera noche de cambio" },
  { id: 2, name: "Carlos R.", role: "Barcelona · Compra verificada", avatar: "https://i.pravatar.cc/150?img=12", initials: "CR", rating: 5, text: "Probé tiras nasales, almohadas especiales y hasta un aparato dental carísimo. Nada funcionó. Nulbia fue diferente desde el primer uso.", highlight: "97% de eficacia" },
  { id: 3, name: "Laura S.", role: "Valencia · Compra verificada", avatar: "https://i.pravatar.cc/150?img=9", initials: "LS", rating: 5, text: "Se lo compré a mi marido y ahora él me lo recomendó a mí. Somos un matrimonio de roncadores reformados. Dormimos mejor que nunca.", highlight: "Pack Pareja" },
  { id: 4, name: "Pablo M.", role: "Sevilla · Compra verificada", avatar: "https://i.pravatar.cc/150?img=14", initials: "PM", rating: 5, text: "El primer día pensé que era placebo. A la semana le pregunté a mi mujer y me dijo que no escuchaba nada. Absolutamente brutal.", highlight: "Silencio total" },
  { id: 5, name: "Sofía T.", role: "Bilbao · Compra verificada", avatar: "https://i.pravatar.cc/150?img=47", initials: "ST", rating: 5, text: "Mi padre tenía apnea leve. Después de 2 semanas con Nulbia, mi madre me llama para darme las gracias.", highlight: "Pack Familiar" },
  { id: 6, name: "Javier L.", role: "Málaga · Compra verificada", avatar: "https://i.pravatar.cc/150?img=33", initials: "JL", rating: 5, text: "El pack de 2 fue la mejor inversión del año. Mi pareja y yo dormimos como nunca. Fin de los conflictos nocturnos.", highlight: "Mejor inversión" },
  { id: 7, name: "Ana P.", role: "Zaragoza · Compra verificada", avatar: "https://i.pravatar.cc/150?img=25", initials: "AP", rating: 5, text: "La app me muestra las fases del sueño y los eventos corregidos cada mañana. Me siento como nueva cada día.", highlight: "App imprescindible" },
  { id: 8, name: "Roberto V.", role: "Bilbao · Compra verificada", avatar: "https://i.pravatar.cc/150?img=52", initials: "RV", rating: 5, text: "Pequeño, cómodo y efectivo. No noto que lo llevo puesto. Mi pareja dice que llevo 3 semanas sin roncar.", highlight: "Invisible al usarlo" },
  { id: 9, name: "Carmen N.", role: "Toledo · Compra verificada", avatar: "https://i.pravatar.cc/150?img=44", initials: "CN", rating: 5, text: "Dudaba mucho al principio. 30 noches de garantía me dieron la confianza. Ahora no me imagino dormir sin Nulbia.", highlight: "Garantía total" },
];

const OBJECTIONS = [
  {
    icon: <Smile className="w-5 h-5" />,
    title: "¿Es incómodo llevarlo?",
    description: "Solo 11.6 gramos. El diseño ergonómico mandibular se adapta a cualquier postura de sueño. El 94% de los usuarios dice no notarlo después de la primera noche.",
    stat: "11.6g",
    statLabel: "Peso ultraligero",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "¿Realmente funciona?",
    description: "Estimulación Muscular Electrónica (EMS) con impulsos de frecuencia media (10Hz - 1500Hz). 97% de eficacia clínica demostrada. Resultados visibles desde la primera noche en el 89% de los casos.",
    stat: "97%",
    statLabel: "Eficacia clínica",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "¿Y si no me funciona?",
    description: "30 noches de garantía total. Si no elimina tus ronquidos, te devolvemos cada céntimo sin preguntas, sin formularios, sin excusas.",
    stat: "30",
    statLabel: "Noches garantizadas",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NulbiaLanding() {
  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">

      {/* 1. UPGRADE BANNER */}
      <UpgradeBanner
        description="🚀 Prueba Nulbia Sleep Pro 30 noches sin compromiso."
        buttonText="Ver Oferta Especial"
        href="#precios"
      />

      {/* 2. FLOATING HEADER */}
      <FloatingHeader />

      {/* 3. HERO */}
      <section className="relative bg-white pt-16 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
              Solución avanzada para el tratamiento de ronquidos
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
              Descanso Profundo.<br />
              <span className="text-sky-500">Sin Ronquidos.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              La neurotecnología wearable que abre tus vías respiratorias desde la primera noche. Sin cirugía, sin pastillas, sin esfuerzo.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <CustomButton variant="primary" size="large" href="#precios">
                Comprar Ahora <ArrowRight className="w-5 h-5" />
              </CustomButton>
              <CustomButton variant="secondary" size="large" href="#como-funciona">
                Cómo Funciona
              </CustomButton>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <StatusBadge
                leftIcon={Shield}
                leftLabel="Garantía 30 Días"
                rightIcon={Truck}
                rightLabel="Envío 24/48h"
              />
              <StatusBadge
                leftIcon={Star}
                leftLabel="4.9 / 5"
                rightIcon={CheckCircle2}
                rightLabel="2.400+ reseñas"
              />
            </div>
          </FadeUp>

          {/* Hero video */}
          <FadeUp index={1} className="mt-14">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200/50 group">
              <video
                src="/producto.mp4"
                className="w-full h-full object-cover"
                playsInline muted autoPlay loop
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Estimulación EMS en acción
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="bg-slate-50 border-y border-slate-100 py-4">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><span className="text-sky-400 font-black">★★★★★</span> 4.9 / 5</span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>+12.000 parejas</span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>97% eficacia clínica</span>
          <span className="w-px h-4 bg-slate-200 hidden sm:block" />
          <span>🛡️ 30 noches garantía</span>
        </div>
      </div>

      {/* 4. PRODUCT CARD — Pack Pareja destacado */}
      <section className="py-20 bg-white" id="precios">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionPill>Más vendido</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                El favorito de las parejas
              </h2>
              <p className="mt-3 text-slate-500 max-w-md mx-auto">
                El 68% de nuestros clientes eligen el Pack Pareja. Dos estimuladores, el doble de descanso.
              </p>
            </div>
          </FadeUp>
          <FadeUp index={1}>
            <ProductCard />
          </FadeUp>

          {/* Ver todos los packs */}
          <FadeUp index={2} className="mt-8 text-center">
            <a href="#todos-los-precios" className="text-sm text-sky-500 hover:text-sky-700 font-semibold underline underline-offset-4 transition-colors">
              Ver todos los packs (1, 2 y 3 unidades) ↓
            </a>
          </FadeUp>
        </div>
      </section>

      {/* 5. RADIAL ORBITAL TIMELINE */}
      <div id="como-funciona">
        <FadeUp>
          <RadialOrbitalTimeline
            timelineData={TIMELINE_DATA}
            title="El Ciclo del Sueño Inteligente"
            subtitle="Cinco fases que Nulbia ejecuta automáticamente cada noche"
          />
        </FadeUp>
      </div>

      {/* Imágenes narrativas */}
      <section className="py-16 overflow-hidden">
        {/* Problema */}
        <FadeUp>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center mb-20">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/50 group">
              <img src="/producto-2.jpg" alt="Por qué roncamos" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="space-y-4">
              <SectionPill>El problema</SectionPill>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">¿Por qué roncamos y<br /><span className="text-sky-500">tenemos apnea?</span></h2>
              <p className="text-slate-500 leading-relaxed text-sm">Cuando dormimos, la garganta y la mandíbula se relajan por completo. La vía aérea se estrecha y el tejido blando vibra produciendo el ronquido. En casos más graves, la garganta se bloquea completamente: Apnea Obstructiva del Sueño.</p>
              {["Vía aérea colapsada durante el sueño", "Vibración del paladar blando y úvula", "Puede derivar en apnea obstructiva (AOS)", "Afecta al 45% de adultos mayores de 40 años"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Tecnología dark */}
        <div className="bg-slate-900 py-16 mb-20">
          <FadeUp>
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />Tecnología exclusiva
                </div>
                <h2 className="text-3xl font-black text-white leading-tight">Estimulación EMS automática.<br /><span className="text-sky-400">Respira sin esfuerzo.</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed">La Estimulación Muscular Electrónica (EMS) con impulsos de frecuencia media (10Hz - 1500Hz) detecta el ronquido y activa los músculos de la garganta para abrir las vías respiratorias automáticamente.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[{v:"EMS",d:"Estimulación muscular electrónica"},{v:"10–1500Hz",d:"Rango de frecuencia media"},{v:"IA",d:"Chip inteligencia artificial"},{v:"Auto",d:"Intensidad adaptativa"}].map((s) => (
                    <div key={s.v} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-sky-400 font-black text-lg">{s.v}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 order-1 md:order-2 group">
                <img src="/producto-3.jpg" alt="Tecnología EMS Nulbia" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Uso real + app */}
        <FadeUp>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <SectionPill>En acción</SectionPill>
              <h2 className="text-3xl font-black text-slate-900">Un toque. Una noche. Un cambio.</h2>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200/50 group">
              <img src="/producto-4.jpg" alt="Nulbia en uso" className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {["Frecuencia respiratoria","Posición al dormir","Ronquidos detectados","Eventos AOS"].map((s) => (
                  <span key={s} className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* 6. GRID OBJECIONES */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <SectionPill>Resolvemos tus dudas</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Preguntas que se hace todo el mundo
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OBJECTIONS.map((obj, i) => (
              <FadeUp key={i} index={i}>
                <Frame className="h-full">
                  <FramePanel className="h-full">
                    <FrameHeader>
                      <FrameIcon>{obj.icon}</FrameIcon>
                      <div className="mb-2">
                        <span className="text-3xl font-black text-sky-500">{obj.stat}</span>
                        <span className="text-xs text-slate-400 font-medium ml-2">{obj.statLabel}</span>
                      </div>
                      <FrameTitle>{obj.title}</FrameTitle>
                    </FrameHeader>
                    <FrameDescription>{obj.description}</FrameDescription>
                  </FramePanel>
                </Frame>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIOS */}
      <TestimonialsScroll testimonials={TESTIMONIALS} />

      {/* 8. TIMER — Urgencia */}
      <TimerBasic label="🔥 La oferta de lanzamiento termina en:" />

      {/* TODOS LOS PRECIOS */}
      <section id="todos-los-precios" className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <SectionPill>Elige tu pack</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Nulbia Sleep <span className="text-sky-500">Pro</span></h2>
              <p className="mt-3 text-slate-500 max-w-md mx-auto">Un solo pago. Sin suscripción. Sin permanencia.</p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-center">
            {[
              { name:"1 Unidad",     price:149, originalPrice:199, packKey:"individual", description:"Para ti · Prueba sin riesgo",     popular:false, buttonText:"Probar Nulbia",      includes:["1 estimulador Nulbia Sleep Pro","Sleeplus App (iOS 9.0+ / Android 4.3+)","Seguimiento de calidad de sueño","30 noches de garantía total","Soporte prioritario por chat","Batería +15h · Base de carga incluida"] },
              { name:"Pack Pareja",  price:249, originalPrice:458, packKey:"pareja",     description:"2 unidades · El más elegido",     popular:true,  buttonText:"Pedir Pack Pareja",  includes:["2 estimuladores Nulbia Sleep Pro","Sleeplus App para ambos","Panel de pareja en tiempo real","30 noches de garantía total","Envío express gratuito 24h","Soporte VIP prioritario","Ahorra 209€ vs 2 unidades"] },
              { name:"Pack Familiar",price:349, originalPrice:597, packKey:"familiar",   description:"3 unidades · Toda la familia",   popular:false, buttonText:"Pedir Pack Familiar",includes:["3 estimuladores Nulbia Sleep Pro","Sleeplus App multiusuario","Historial de sueño 12 meses","30 noches de garantía total","Envío express gratuito 24h","Soporte VIP + línea directa","Ahorra 248€ vs 3 unidades"] },
            ].map((plan, i) => (
              <PricingCard key={i} plan={plan} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">🛡️ 30 noches de garantía total · Pago seguro SSL · Envío gratis en 24h</p>
          </div>
        </div>
      </section>

      {/* Guarantee strip */}
      <div className="bg-sky-500 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <div className="text-4xl mb-3">🛡️</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">30 noches de garantía total</h2>
            <p className="text-sky-100 max-w-xl mx-auto mb-7">Si en 30 noches Nulbia no elimina tus ronquidos, te devolvemos cada céntimo. Sin preguntas, sin formularios.</p>
            <a href="#todos-los-precios" className="inline-flex items-center gap-2 bg-white text-sky-600 font-black px-8 py-4 rounded-2xl shadow-lg hover:-translate-y-1 transition-all">Probar sin riesgo →</a>
          </FadeUp>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-20">
        <FadeUp>
          <div className="text-center mb-10">
            <SectionPill>FAQ</SectionPill>
            <h2 className="text-3xl font-black text-slate-900">Todo lo que necesitas saber</h2>
          </div>
        </FadeUp>
        <div className="space-y-3">
          {[
            { q:"¿Cuánto tarda en funcionar?", a:"El 89% nota resultados desde la primera noche. Para el 97% la mejora es total antes de los 7 días." },
            { q:"¿Es cómodo de llevar puesto?", a:"Pesa 11.6g y tiene diseño ergonómico certificado para ser imperceptible en cualquier postura de sueño." },
            { q:"¿Funciona para la apnea del sueño?", a:"Nulbia está diseñado para ronquidos habituales y apnea leve. Para apnea severa consulta con un especialista." },
            { q:"¿Cómo funciona la garantía de 30 noches?", a:"Escríbenos a soporte@nulbia.com dentro de los 30 días. Gestionamos la devolución en menos de 48 horas." },
            { q:"¿Cuánto dura la batería?", a:"Más de 15 horas de uso continuo. Se carga en 2 horas mediante la base de carga incluida." },
          ].map((faq, i) => (
            <FadeUp key={i} index={i}>
              <details className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-sky-100 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-slate-900 font-semibold text-sm list-none select-none">
                  {faq.q}
                  <span className="text-sky-400 text-xl font-light transition-transform group-open:rotate-45 ml-3 flex-shrink-0">+</span>
                </summary>
                <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed -mt-1">{faq.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ¿QUÉ ES NULBIA? — Transparencia */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-6">

          {/* Cabecera */}
          <FadeUp>
            <div className="text-center mb-14">
              <SectionPill>Transparencia total</SectionPill>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
                ¿Qué es Nulbia?
              </h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
                Creemos que mereces saber exactamente quién hay detrás del producto que confías para mejorar tu descanso.
              </p>
            </div>
          </FadeUp>

          {/* Grid 2×2 */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: <Eye className="w-5 h-5" />,
                label: "El Concepto",
                title: "Nace de una necesidad real",
                body: "Nulbia nace de una necesidad real: encontrar soluciones tecnológicas que de verdad funcionen para mejorar el descanso.",
              },
              {
                icon: <Brain className="w-5 h-5" />,
                label: "Nuestra Función",
                title: "Curadores de tecnología, no fabricantes",
                body: "No somos un laboratorio médico, somos curadores de tecnología. Identificamos los estimuladores biométricos más avanzados del mercado y los ponemos a tu alcance con nuestra garantía y soporte.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                label: "El Producto",
                title: "Selección rigurosa y probada",
                body: "Hemos seleccionado este Estimulador Muscular Electrónico inteligente por su eficacia probada mediante tecnología EMS de frecuencia media (10Hz – 1500Hz).",
              },
              {
                icon: <Shield className="w-5 h-5" />,
                label: "Nuestro Compromiso",
                title: "Respaldo total en el post-venta",
                body: "En Nulbia nos responsabilizamos de todo el proceso post-venta: garantía de 30 noches y atención al cliente, para que tú solo te centres en recuperar tu energía.",
              },
            ].map((item, i) => (
              <FadeUp key={i} index={i}>
                <div className="flex gap-5 p-7 rounded-2xl border border-slate-100 bg-slate-50/60 hover:border-sky-100 hover:bg-sky-50/30 transition-colors group h-full">
                  {/* Icono */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-sky-200 group-hover:bg-sky-50 flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors shadow-sm">
                    {item.icon}
                  </div>
                  {/* Texto */}
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Cierre honesto */}
          <FadeUp index={4}>
            <div className="mt-10 flex items-start gap-4 p-6 rounded-2xl bg-slate-900 text-white">
              <div className="flex-shrink-0 w-1 self-stretch rounded-full bg-sky-500" />
              <p className="text-sm leading-relaxed text-slate-300">
                <span className="font-bold text-white">Sin letra pequeña.</span>{" "}
                Si el estimulador no elimina tus ronquidos en 30 noches, te devolvemos cada céntimo. Sin formularios, sin excusas. Ese es el único compromiso que importa.
              </p>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white border-t border-slate-100 py-20 text-center px-6">
        <FadeUp>
          <div className="text-5xl mb-5 inline-block animate-float">🌙</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Esta noche puede ser diferente.</h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto mb-8">Únete a +12.000 personas que recuperaron su sueño con Nulbia.</p>
          <CustomButton variant="primary" size="large" href="#todos-los-precios" className="pulse-glow mx-auto">
            Pedir Nulbia ahora →
          </CustomButton>
          <p className="mt-4 text-slate-400 text-sm">30 noches garantía · Envío gratis · Pago seguro SSL</p>
        </FadeUp>
      </section>

      {/* 9. LEAD CAPTURE */}
      <LeadCapture />

      {/* 10. FOOTER */}
      <Footer7 />
    </main>
  );
}

// ── Pricing card inline ───────────────────────────────────────────────────────

function PricingCard({ plan, index }: { plan: any; index: number }) {
  const discount = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
      className={cn(
        "relative flex flex-col rounded-3xl border bg-white p-8",
        plan.popular
          ? "border-sky-200 shadow-2xl shadow-sky-100 scale-105 z-10"
          : "border-slate-200 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md shadow-sky-200 whitespace-nowrap">
          <Sparkles className="w-3 h-3" />Más elegido
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
      <div className="flex items-baseline gap-2 mb-0.5">
        <span className="text-xl font-bold text-slate-400">€</span>
        <span className="text-5xl font-black text-slate-900">{plan.price}</span>
        <span className="text-sm text-slate-400 line-through self-end pb-1">{plan.originalPrice}€</span>
      </div>
      <div className="flex items-center gap-2 mb-5">
        <span className="bg-rose-50 text-rose-500 text-xs font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
        <span className="text-xs text-slate-400">Pago único · Sin renovación</span>
      </div>
      {/* Link con ?pack= para preseleccionar la variante en la PDP */}
      <Link href={`/producto?pack=${plan.packKey}`} className="w-full mb-6">
        <span
          className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200"
        >
          {plan.buttonText}
        </span>
      </Link>
      <div className="border-t border-slate-100 pt-5">
        <ul className="space-y-2.5">
          {plan.includes.map((f: string, fi: number) => (
            <li key={fi} className="flex items-start gap-2.5">
              <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sky-500">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs text-slate-600">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
