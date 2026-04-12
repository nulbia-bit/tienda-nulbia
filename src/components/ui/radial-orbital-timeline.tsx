"use client";
import { useState, useEffect, useRef, type ElementType } from "react";

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

export default function RadialOrbitalTimeline({
  timelineData,
  title = "El Ciclo del Sueño Inteligente",
  subtitle = "Cinco fases de protección activa cada noche que duermes con Nulbia",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });
      const isOpening = !prev[id];
      newState[id] = isOpening;

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const currentItem = timelineData.find((item) => item.id === id);
        const newPulse: Record<number, boolean> = {};
        currentItem?.relatedIds.forEach((relId) => {
          newPulse[relId] = true;
        });
        setPulseEffect(newPulse);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 185;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));
    // true cuando el nodo está en la mitad inferior del orbita
    const isBottom = y > 40;
    return { x, y, zIndex, opacity, isBottom };
  };

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
        className="relative w-full max-w-4xl h-[520px] mx-auto flex items-center justify-center"
        ref={containerRef}
        onClick={handleContainerClick}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "900px" }}
        >
          {/* Orbit ring */}
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

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const currentItem = timelineData.find((i) => i.id === activeNodeId);
            const isRelated = currentItem
              ? currentItem.relatedIds.includes(item.id)
              : false;
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            // Capturamos isBottom en el momento del clic para que no cambie mientras está abierto
            const cardOpensUp = pos.isBottom;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2
                    transition-all duration-300
                    ${isExpanded
                      ? "bg-sky-500 text-white border-sky-400 shadow-sky-300 scale-125"
                      : isRelated || isPulsing
                      ? "bg-sky-50 text-sky-600 border-sky-300 animate-pulse scale-110"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-500"
                    }
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-wide transition-all duration-300
                    ${isExpanded ? "text-sky-600 scale-110" : "text-slate-500"}
                  `}
                >
                  {item.title}
                </div>

                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                  {item.id}
                </div>

                {/* Expanded card — se abre arriba si el nodo está en la zona inferior */}
                {isExpanded && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-72 bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl shadow-sky-100/60 p-5 z-[300] ${
                      cardOpensUp ? "bottom-16" : "top-16"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
                        <Icon size={14} className="text-sky-500" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex gap-1 flex-wrap">
                      {item.relatedIds.map((rid) => {
                        const related = timelineData.find((t) => t.id === rid);
                        return related ? (
                          <span key={rid} className="text-[10px] bg-sky-50 text-sky-600 border border-sky-100 rounded-full px-2 py-0.5 font-medium">
                            → {related.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Helper text */}
      <p className="text-center text-xs text-slate-400 -mt-4">
        Toca cada nodo para descubrir la fase
      </p>
    </div>
  );
}
