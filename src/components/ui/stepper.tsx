"use client";
import { motion } from "framer-motion";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 relative"
        >
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="absolute left-5 top-10 bottom-0 w-px bg-sky-100" />
          )}

          {/* Step number circle */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500 text-white font-black text-sm flex items-center justify-center shadow-sm shadow-sky-200 z-10">
            {step.icon ?? step.number}
          </div>

          {/* Content */}
          <div className={`pb-8 ${i === steps.length - 1 ? "pb-0" : ""}`}>
            <h4 className="font-bold text-slate-900 text-base mb-1">{step.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
