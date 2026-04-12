"use client";
import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UpgradeBannerProps {
  buttonText?: string;
  description?: string;
  href?: string;
  className?: string;
}

export function UpgradeBanner({
  buttonText = "Ver Oferta Especial",
  description = "30 Noches de Prueba Sin Compromiso",
  href = "#precios",
  className,
}: UpgradeBannerProps) {
  const [visible, setVisible] = React.useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative z-50 flex items-center justify-center gap-3 bg-sky-50 border-b border-sky-200 px-4 py-2.5 text-sm",
            className
          )}
        >
          <span className="text-sky-700 font-medium">
            🚀 {description}
          </span>
          <a
            href={href}
            className="font-bold text-sky-600 underline underline-offset-4 hover:text-sky-800 transition-colors"
          >
            {buttonText} →
          </a>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-700 transition-colors"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
