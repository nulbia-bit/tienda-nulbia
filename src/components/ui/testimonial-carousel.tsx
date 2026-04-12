"use client";

import * as React from "react";
import { motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  role?: string;
  description: string;
  stars?: number;
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState<number>(0);
    const [direction, setDirection] = React.useState(0);

    const next = React.useCallback(() => {
      setDirection(1);
      setExitX(-300);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setExitX(0);
      }, 200);
    }, [testimonials.length]);

    const prev = React.useCallback(() => {
      setDirection(-1);
      setExitX(300);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setExitX(0);
      }, 200);
    }, [testimonials.length]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 80) {
        if (info.offset.x < 0) next();
        else prev();
      } else {
        setExitX(0);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col items-center justify-center gap-8", className)}
        {...props}
      >
        {/* Stacked Cards */}
        <div className="relative w-full max-w-md h-72">
          {testimonials.map((t, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard = index === (currentIndex + 1) % testimonials.length;
            const isNextCard = index === (currentIndex + 2) % testimonials.length;
            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={t.id}
                className={cn(
                  "absolute w-full rounded-3xl cursor-grab active:cursor-grabbing",
                  "bg-white border border-slate-100",
                  "shadow-[0_4px_24px_rgba(14,165,233,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
                )}
                style={{ zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1 }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{ scale: 0.95, opacity: 0, y: isCurrentCard ? 0 : isPrevCard ? 10 : 20 }}
                animate={{
                  scale: isCurrentCard ? 1 : isPrevCard ? 0.96 : 0.92,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.55 : 0.25,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                  rotate: isCurrentCard ? exitX / 25 : isPrevCard ? -1.5 : -3,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <div className="p-7 flex flex-col gap-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars ?? 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    &ldquo;{t.description}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-100"
                    />
                    <div>
                      <p className="text-slate-900 text-sm font-semibold">{t.name}</p>
                      {t.role && <p className="text-slate-400 text-xs">{t.role}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Arrow Buttons (visible on current card) */}
          {showArrows && (
            <>
              <button
                onClick={prev}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-colors"
                aria-label="Anterior testimonio"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-colors"
                aria-label="Siguiente testimonio"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {showDots && (
          <div className="flex justify-center gap-2 mt-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-sky-500 w-5 h-2"
                    : "bg-slate-200 hover:bg-slate-300 w-2 h-2"
                )}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel, type Testimonial };
