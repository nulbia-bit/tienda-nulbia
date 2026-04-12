"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from "lucide-react";

interface TestimonialSliderProps {
  reviews: {
    name: string;
    location?: string;
    rating: number;
    text: string;
    avatar?: string;
    verified?: boolean;
    date?: string;
  }[];
}

export function TestimonialSlider({ reviews }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = (dir: "left" | "right") => {
    setDirection(dir);
    setIndex((prev) =>
      dir === "right"
        ? (prev + 1) % reviews.length
        : (prev - 1 + reviews.length) % reviews.length
    );
  };

  const review = reviews[index];

  return (
    <div className="relative select-none">
      {/* Slide */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (d: string) => ({ opacity: 0, x: d === "right" ? 40 : -40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: string) => ({ opacity: 0, x: d === "right" ? -40 : 40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 md:p-8"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-slate-700 text-base leading-relaxed mb-6">"{review.text}"</p>

            {/* Author row */}
            <div className="flex items-center gap-3">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                {review.location && (
                  <p className="text-slate-400 text-xs">{review.location}</p>
                )}
              </div>

              {review.verified !== false && (
                <div className="ml-auto flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Compra Verificada
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Dots */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? "right" : "left");
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === index ? "bg-sky-500 w-5" : "bg-slate-200 w-2 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => go("left")}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-sky-300 hover:text-sky-500 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go("right")}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-sky-300 hover:text-sky-500 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
