"use client";
import * as React from "react";
import { MenuIcon, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Tecnología", href: "#como-funciona" },
  { label: "Precios", href: "#precios" },
  { label: "Testimonios", href: "#testimonios-3d" },
];

export function FloatingHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-3 z-50 mx-auto w-[95%] max-w-3xl rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-slate-200 shadow-lg shadow-slate-200/50 bg-white/95 backdrop-blur-xl"
            : "border-slate-200/60 bg-white/80 backdrop-blur-md"
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-2.5">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src="/logo.jpg" alt="Nulbia" className="h-7 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#precios"
              className="hidden md:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold px-5 py-2 rounded-full transition-all duration-200"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Comprar
            </a>
            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? <X className="w-5 h-5 text-slate-700" /> : <MenuIcon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-700 font-medium py-3 px-3 rounded-xl hover:bg-slate-50 hover:text-sky-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <a
                  href="#precios"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl w-full transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar Ahora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
