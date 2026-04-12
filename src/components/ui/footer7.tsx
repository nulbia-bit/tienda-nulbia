import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = {
  Producto: [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Testimonios", href: "#testimonios-3d" },
    { label: "Preguntas frecuentes", href: "#faq" },
  ],
  Legal: [
    { label: "Política de privacidad", href: "#" },
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de cookies", href: "#" },
    { label: "Aviso legal", href: "#" },
  ],
  Soporte: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Contacto", href: "mailto:soporte@nulbia.com" },
    { label: "Garantía 30 noches", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
};

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaXTwitter, href: "#", label: "X / Twitter" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
];

export function Footer7() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/">
              <img src="/logo.jpg" alt="Nulbia" className="h-8 w-auto object-contain mb-4" />
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Neurotecnología wearable para eliminar los ronquidos y mejorar la calidad del sueño desde la primera noche.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-500 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-slate-900 font-bold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-500 hover:text-sky-500 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-y border-slate-100 mb-6">
          {["🛡️ Garantía 30 noches", "🔒 Pago seguro SSL", "🚚 Envío gratis 24h", "⭐ 4.9/5 · 2.400 reseñas", "🏥 Certificado médicamente"].map((badge) => (
            <span key={badge} className="text-xs text-slate-500 font-medium">{badge}</span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Nulbia Technologies SL · Todos los derechos reservados</p>
          <p>Fabricado con ❤️ para los que merecen dormir bien</p>
        </div>
      </div>
    </footer>
  );
}
