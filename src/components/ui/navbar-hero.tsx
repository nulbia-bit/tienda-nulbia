"use client";
import React, { useState, useRef } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { motion } from "framer-motion";

interface NavbarHeroProps {
  brandName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  videoUrl?: string;
}

export const NavbarHero: React.FC<NavbarHeroProps> = ({
  brandName = "NULBIA",
  heroTitle = "Descanso Profundo.\nSin Ronquidos.",
  heroSubtitle = "Monitor Biométrico de Sueño",
  heroDescription = "La primera neurotecnología wearable que detecta y corrige la apnea leve mediante IA y conducción ósea. Sin cirugía. Sin pastillas.",
  videoUrl = "/producto.mp4",
}) => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPaused) {
      videoRef.current.play();
      setIsVideoPaused(false);
    } else {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };

  return (
    <div className="bg-white">
      {/* ── Sticky Navbar ─────────────────────────────────────────── */}
      <header className="sticky top-11 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="Nulbia"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* LimelightNav — center */}
          <div className="flex-1 flex justify-center">
            <LimelightNav />
          </div>

          {/* CTA */}
          <a
            href="#precios"
            className="flex-shrink-0 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-200 hover:shadow-sky-300 transition-all duration-200 hover:-translate-y-0.5"
          >
            Comprar
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ── Hero Content ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
            {heroSubtitle}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight whitespace-pre-line">
            {heroTitle.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <>
                    Sin <span className="text-sky-500">Ronquidos.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {heroDescription}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#precios"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              Ver Oferta
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#como-funciona"
              className="flex items-center gap-2 text-slate-600 hover:text-sky-500 px-6 py-3.5 rounded-xl font-semibold border border-slate-200 hover:border-sky-200 transition-all duration-200 text-base bg-white"
            >
              Cómo funciona
            </a>
          </div>

          {/* Social proof micro */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-sky-400 text-sky-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </span>
              <strong className="text-slate-600">4.9</strong> · 2.400+ reseñas
            </span>
            <span className="w-px h-4 bg-slate-200" />
            <span>30 noches garantía</span>
            <span className="w-px h-4 bg-slate-200" />
            <span>Envío gratis</span>
          </div>
        </motion.div>

        {/* ── Video ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 ring-1 ring-slate-200/50 group"
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
            loop
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />

          {/* Play/Pause button */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={isVideoPaused ? "Reproducir" : "Pausar"}
          >
            {isVideoPaused ? (
              <Play className="w-4 h-4 text-slate-800 ml-0.5" />
            ) : (
              <Pause className="w-4 h-4 text-slate-800" />
            )}
          </button>

          {/* Badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Conducción ósea en acción
          </div>
        </motion.div>
      </section>
    </div>
  );
};
