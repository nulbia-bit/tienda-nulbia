"use client";
import * as React from "react";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Check, Loader2, Shield, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { createCheckout } from "@/lib/shopify";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  isBestSeller?: boolean;
  variantId?: string;
  includes?: string[];
}

export function ProductCard({
  name = "Nulbia Sleep Pro™ — Pack Pareja",
  price = 249,
  originalPrice = 458,
  rating = 4.9,
  reviewCount = 2415,
  images = ["/producto-1.jpg", "/producto-4.jpg", "/producto-5.jpg"],
  isBestSeller = true,
  variantId = "gid://shopify/ProductVariant/43919665397803",
  includes = [
    "2 dispositivos Nulbia Sleep Pro™",
    "App con panel de pareja en tiempo real",
    "Historial de sueño 30 días",
    "Envío express gratuito 24h",
    "30 noches de garantía total",
  ],
}: ProductCardProps) {
  const [currentImg, setCurrentImg] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const prevImg = () => setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setCurrentImg((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    const url = await createCheckout(variantId);
    if (url) {
      window.location.href = url;
    } else {
      setError("Error al conectar. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
      {/* Image carousel */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg]}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isBestSeller && (
            <span className="bg-sky-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md shadow-sky-500/30">
              ⭐ MÁS VENDIDO
            </span>
          )}
          <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
            -{discount}% HOY
          </span>
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? "bg-sky-500 w-3" : "bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-sky-400 text-sky-400" : "fill-slate-200 text-slate-200"}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700">{rating}</span>
          <span className="text-xs text-slate-400">({reviewCount.toLocaleString("es-ES")} reseñas)</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-slate-900 text-base leading-tight mb-3">{name}</h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-black text-slate-900">{price}€</span>
          <span className="text-sm text-slate-400 line-through">{originalPrice}€</span>
          <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
            Ahorras {originalPrice - price}€
          </span>
        </div>

        {/* Includes */}
        <ul className="space-y-1.5 mb-5">
          {includes.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-2">{error}</p>
        )}
        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-200 mb-3"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
          {loading ? "Procesando..." : "Comprar Ahora — 249€"}
        </button>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-sky-500" />30 noches garantía</span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-sky-500" />Envío gratis 24h</span>
        </div>
      </div>
    </div>
  );
}
