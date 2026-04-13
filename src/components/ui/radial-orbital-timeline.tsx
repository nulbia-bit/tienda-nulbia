"use client";
import { useState, useEffect, useRef, useCallback, type ElementType } from "react";

export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: ElementType;
  relatedIds: number[];
  color?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  title?: string;
  subtitle?: string;
}

const RADIUS = 185;

function calcPos(index: number, total: number, angleDeg: number) {
  const deg = ((index / total) * 360 + angleDeg) % 360;
  const rad = (deg * Math.PI) / 180;
  return {
    x: RADIUS * Math.cos(rad),
    y: RADIUS * Math.sin(rad),
    zIndex: Math.round(100 + 50 * Math.cos(rad)),
    opacity: Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2))),
  };
}

export default function RadialOrbitalTimeline({
  timelineData,
  title = "El Ciclo del Sueño Inteligente",
  subtitle = "Cinco fases de protección activa cada noche que duermes con Nulbia",
}: RadialOrbitalTimelineProps) {
  // React state sólo para interacciones — NO para el ángulo de rotación
  const [expandedItems, setExpandedItems]   = useState<Record<number, boolean>>({});
  const [pulseEffect,   setPulseEffect]     = useState<Record<number, boolean>>({});
  const [activeNodeId,  setActiveNodeId]    = useState<number | null>(null);

  // Refs para la animación RAF — nunca provocan re-renders
  const nodeRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef      = useRef(0);
  const autoRotate    = useRef(true);
  const rafId         = useRef(0);
  // Espejo de expandedItems accesible síncronamente desde el loop RAF
  const expandedRef   = useRef<Record<number, boolean>>({});

  // ── Loop de animación — DOM directo, sin setState ─────────────────────────
  const tick = useCallback(() => {
    if (autoRotate.current) {
      angleRef.current = (angleRef.current + 0.3) % 360;
    }

    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[index];
      if (!el) return;
      const { x, y, zIndex, opacity } = calcPos(index, timelineData.length, angleRef.current);
      // transform siempre se actualiza (movimiento fluido a 60fps)
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      // opacity y zIndex sólo si el nodo no está expandido (el activo queda fijo)
      if (!expandedRef.current[item.id]) {
        el.style.zIndex  = String(zIndex);
        el.style.opacity = opacity.toFixed(3);
      }
    });

    rafId.current = requestAnimationFrame(tick);
  }, [timelineData]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const resetAll = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    expandedRef.current = {};
    autoRotate.current  = true;
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isOpening      = !prev[id];
      const newExpanded    = isOpening ? { [id]: true } : {};
      expandedRef.current  = newExpanded;

      if (isOpening) {
        setActiveNodeId(id);
        autoRotate.current = false;
        const item = timelineData.find((i) => i.id === id);
        setPulseEffect(
          Object.fromEntries((item?.relatedIds ?? []).map((r) => [r, true]))
        );
        // Fijar visualmente el nodo activo
        const idx = timelineData.findIndex((i) => i.id === id);
        const el  = nodeRefs.current[idx];
        if (el) { el.style.opacity = "1"; el.style.zIndex = "200"; }
      } else {
        setActiveNodeId(null);
        autoRotate.current = true;
        setPulseEffect({});
      }
      return newExpanded;
    });
  };

  const activeItem = timelineData.find((i) => i.id === activeNodeId);

  return (
    <div className="w-full bg-slate-50 py-20">
      {/* Header */}
      <div className="text-center mb-4 px-6">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse inline-block" />
          Sistema de 5 fases
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Orbital */}
      <div
        className="relative w-full max-w-4xl h-[420px] mx-auto flex items-center justify-center"
        onClick={(e) => {
          const t = e.target as Node;
          if (!nodeRefs.current.some((el) => el?.contains(t))) resetAll();
        }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: "900px" }}
        >
          {/* Orbit rings */}
          <div className="absolute w-[370px] h-[370px] rounded-full border border-slate-200/70 pointer-events-none" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-100/80 pointer-events-none" />

          {/* Center pulse */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center z-10 shadow-lg shadow-sky-200 pointer-events-none">
            <div className="absolute w-20 h-20 rounded-full border-2 border-sky-300/40 animate-ping" />
            <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          {/* Nodos — posición gestionada 100% por RAF, sin CSS transition en transform */}
          {timelineData.map((item, index) => {
            const isExpanded = expandedItems[item.id];
            const activeItem_ = timelineData.find((i) => i.id === activeNodeId);
            const isRelated  = activeItem_?.relatedIds.includes(item.id) ?? false;
            const isPulsing  = pulseEffect[item.id];
            const Icon       = item.icon;
            // Posición inicial en el primer render (RAF la toma enseguida)
            const init = calcPos(index, timelineData.length, angleRef.current);

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[index] = el; }}
                className="absolute cursor-pointer"
                style={{
                  transform:   `translate(${init.x.toFixed(1)}px,${init.y.toFixed(1)}px)`,
                  willChange:  "transform",
                  // zIndex y opacity NO se declaran aquí → RAF los controla sin interferencia de React
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Círculo del nodo — sólo transition de colores, nunca de transform */}
                <div
                  className={[
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 transition-colors duration-300",
                    isExpanded
                      ? "bg-sky-500 text-white border-sky-400 shadow-sky-300 scale-125"
                      : isRelated || isPulsing
                      ? "bg-sky-50 text-sky-600 border-sky-300 animate-pulse scale-110"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-500",
                  ].join(" ")}
                >
                  <Icon size={18} />
                </div>

                {/* Etiqueta */}
                <div
                  className={[
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-wide transition-colors duration-300",
                    isExpanded ? "text-sky-600" : "text-slate-500",
                  ].join(" ")}
                >
                  {item.title}
                </div>

                {/* Badge numérico */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm pointer-events-none">
                  {item.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de detalle — debajo del orbital, nunca se corta */}
      <div className="px-4 max-w-lg mx-auto mt-2 min-h-[180px]">
        {activeItem ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-sky-100/40 p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <activeItem.icon size={16} className="text-sky-500" />
                </div>
                <div>
                  <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">
                    Fase {activeItem.id}
                  </p>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeItem.title}
                  </h4>
                </div>
              </div>
              <button
                onClick={resetAll}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{activeItem.content}</p>
            {activeItem.relatedIds.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex gap-1 flex-wrap">
                {activeItem.relatedIds.map((rid) => {
                  const related = timelineData.find((t) => t.id === rid);
                  return related ? (
                    <span key={rid} className="text-[10px] bg-sky-50 text-sky-600 border border-sky-100 rounded-full px-2 py-0.5 font-medium">
                      → {related.title}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-xs text-slate-400 pt-6">
            Toca cada nodo para descubrir la fase
          </p>
        )}
      </div>
    </div>
  );
}
