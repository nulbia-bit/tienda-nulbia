"use client";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  cloneElement,
} from "react";

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  href?: string;
  onClick?: () => void;
};

interface LimelightNavProps {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  {
    id: "1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    label: "El Problema",
    href: "#como-funciona",
  },
  {
    id: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    label: "La Tecnología",
    href: "#tecnologia",
  },
  {
    id: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Testimonios",
    href: "#testimonios",
  },
  {
    id: "4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    label: "Precios",
    href: "#precios",
  },
];

export const LimelightNav: React.FC<LimelightNavProps> = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) setTimeout(() => setIsReady(true), 50);
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, item: NavItem) => {
    setActiveIndex(index);
    onTabChange?.(index);
    item.onClick?.();
  };

  return (
    <nav
      className={`relative inline-flex items-center h-12 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200/80 shadow-sm px-1 ${className}`}
    >
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.href}
          ref={(el) => {
            navItemRefs.current[index] = el;
          }}
          className="relative z-20 flex h-full cursor-pointer items-center justify-center px-4 gap-2 text-sm font-medium transition-colors duration-150"
          onClick={() => handleItemClick(index, item)}
        >
          {cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
            className: `w-4 h-4 transition-all duration-150 ${
              activeIndex === index
                ? "text-sky-500 opacity-100"
                : "text-slate-400 opacity-70"
            }`,
          })}
          <span
            className={`hidden sm:block transition-colors duration-150 ${
              activeIndex === index ? "text-sky-500 font-semibold" : "text-slate-600"
            }`}
          >
            {item.label}
          </span>
        </a>
      ))}

      {/* Limelight indicator */}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-12 h-[3px] rounded-full bg-sky-500 shadow-[0_3px_12px_rgba(14,165,233,0.6)] ${
          isReady ? "transition-[left] duration-300 ease-in-out" : ""
        }`}
        style={{ left: "-999px" }}
      >
        <div className="absolute left-[-30%] top-[3px] w-[160%] h-10 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-sky-400/20 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
