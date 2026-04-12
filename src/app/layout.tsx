import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nulbia — Despierta con energía, no con reproches",
  description:
    "Elimina los ronquidos desde la primera noche con tecnología de conducción ósea. Sin cirugía. Sin pastillas. 30 noches de garantía total.",
  openGraph: {
    title: "Nulbia — Despierta con energía, no con reproches",
    description:
      "El dispositivo anti-ronquidos más avanzado del mercado. 97% de eficacia. Garantía de 30 noches.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Script
          src="https://static.klaviyo.com/onsite/js/S6pTvE/klaviyo.js?company_id=S6pTvE"
          strategy="afterInteractive"
        />
        <Script id="klaviyo-init" strategy="afterInteractive">{`
          !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
        `}</Script>
      </body>
    </html>
  );
}
