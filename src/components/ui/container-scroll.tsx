"use client";
import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ── ContainerScroll ─────────────────────────────────────────────────────── */
export const ContainerScroll: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className={cn("relative w-full", className)}
      style={{ perspective: "1200px" }}
      {...props}
    >
      {children}
    </div>
  );
};

/* ── CardTransformed ─────────────────────────────────────────────────────── */
interface CardTransformedProps extends React.HTMLAttributes<HTMLDivElement> {
  arrayLength: number;
  index: number;
  incrementY?: number;
  incrementZ?: number;
  children?: React.ReactNode;
}

export const CardTransformed = React.forwardRef<HTMLDivElement, CardTransformedProps>(
  (
    {
      arrayLength,
      index,
      incrementY = 8,
      incrementZ = 10,
      className,
      children,
      style,
    },
    ref
  ) => {
    const cardStyle: React.CSSProperties = {
      position: "absolute",
      top: index * incrementY,
      left: 0,
      right: 0,
      zIndex: (arrayLength - index) * incrementZ,
      ...style,
    };

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -4,
          transition: { duration: 0.25 },
        }}
        className={cn(
          "w-full flex flex-col justify-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl hover:border-sky-100 transition-colors duration-300",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

CardTransformed.displayName = "CardTransformed";

/* ── TestimonialsScroll (composed section) ───────────────────────────────── */
export interface TestimonialCard {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  rating: number;
  text: string;
  highlight?: string;
}

interface TestimonialsScrollProps {
  testimonials: TestimonialCard[];
}

import { Avatar, AvatarImage, AvatarFallback, ReviewStars } from "@/components/ui/avatar";

export const TestimonialsScroll: React.FC<TestimonialsScrollProps> = ({
  testimonials,
}) => {
  return (
    <section className="bg-white py-24 overflow-hidden" id="testimonios-3d">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
            Testimonios reales
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Matrimonios rescatados.{" "}
            <span className="text-sky-500">Noches devueltas.</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto text-lg">
            Más de 12.000 personas ya duermen juntas gracias a Nulbia.
          </p>
        </div>

        {/* 3-column stacked cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((colIndex) => {
            const colTestimonials = testimonials.filter((_, i) => i % 3 === colIndex);
            return (
              <ContainerScroll
                key={colIndex}
                className="relative"
                style={{ minHeight: `${colTestimonials.length * 260 + 40}px` }}
              >
                {colTestimonials.map((t, i) => (
                  <CardTransformed
                    key={t.id}
                    arrayLength={colTestimonials.length}
                    index={i}
                    incrementY={i === 0 ? 0 : 240}
                    style={{
                      position: "relative",
                      top: "auto",
                      marginBottom: "16px",
                      zIndex: colTestimonials.length - i,
                    }}
                  >
                    {/* Stars */}
                    <ReviewStars rating={t.rating} />

                    {/* Quote */}
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Highlight chip */}
                    {t.highlight && (
                      <span className="inline-block text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100 rounded-full px-3 py-1">
                        {t.highlight}
                      </span>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <Avatar className="w-10 h-10 ring-2 ring-sky-100">
                        <AvatarImage src={t.avatar} alt={t.name} />
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-slate-900 text-sm font-semibold">{t.name}</p>
                        <p className="text-slate-400 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </CardTransformed>
                ))}
              </ContainerScroll>
            );
          })}
        </div>

        {/* Rating summary */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <ReviewStars rating={4.9} className="scale-125" />
          <p className="text-slate-500 text-sm">
            <strong className="text-slate-900">4.9 / 5</strong> basado en 2.400 reseñas verificadas
          </p>
        </div>
      </div>
    </section>
  );
};
