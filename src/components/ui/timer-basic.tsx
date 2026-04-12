"use client";
import { useEffect, useState } from "react";

interface TimerBasicProps {
  initialSeconds?: number; // default 2 horas
  label?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimerBasic({
  initialSeconds = 2 * 60 * 60,
  label = "La oferta de lanzamiento termina en:",
}: TimerBasicProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="w-full bg-sky-500 py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-white font-bold text-base md:text-lg">{label}</p>
        <div className="flex items-center gap-3">
          {[
            { value: pad(h), label: "Horas" },
            { value: pad(m), label: "Minutos" },
            { value: pad(s), label: "Segundos" },
          ].map((unit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-xl px-4 py-2 min-w-[64px] text-center">
                  <span className="text-3xl md:text-4xl font-black font-mono text-sky-600 tabular-nums">
                    {unit.value}
                  </span>
                </div>
                <span className="text-sky-100 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
              {i < 2 && (
                <span className="text-3xl font-black text-white/70 -mt-4">:</span>
              )}
            </div>
          ))}
        </div>
        {seconds <= 0 && (
          <p className="text-white/80 text-sm">La oferta ha expirado</p>
        )}
        <a
          href="#precios"
          className="mt-2 inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-sky-600 font-black px-8 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
        >
          Aprovechar oferta →
        </a>
      </div>
    </div>
  );
}
