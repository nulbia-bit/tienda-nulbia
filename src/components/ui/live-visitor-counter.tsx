"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveVisitorCounterProps {
  baseCount?: number;
  productName?: string;
}

export function LiveVisitorCounter({
  baseCount = 34,
  productName = "este producto",
}: LiveVisitorCounterProps) {
  const [count, setCount] = useState(baseCount);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0 o +1
      setCount((prev) => {
        const next = Math.max(18, Math.min(72, prev + delta));
        setDirection(next > prev ? "up" : "down");
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 w-fit">
      {/* Pulsing dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
      </span>

      <p className="text-xs font-semibold text-sky-700 flex items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === "up" ? -8 : 8 }}
            transition={{ duration: 0.25 }}
            className="inline-block font-black text-sky-600"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        personas están viendo {productName} ahora mismo
      </p>
    </div>
  );
}
