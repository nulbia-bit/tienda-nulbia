"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  className?: string;
  highlight?: string;
}

interface BentoGridShowcaseProps {
  items: BentoItem[];
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function BentoGridShowcase({ items }: BentoGridShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={cn(
            "relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300 group",
            item.className
          )}
        >
          {/* Image background if provided */}
          {item.image && (
            <div className="relative w-full h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
            </div>
          )}

          <div className="flex flex-col flex-1 p-6">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-4 text-sky-500 group-hover:bg-sky-100 transition-colors">
              {item.icon}
            </div>

            {/* Highlight stat */}
            {item.highlight && (
              <p className="text-3xl font-black text-sky-500 mb-1">{item.highlight}</p>
            )}

            <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
