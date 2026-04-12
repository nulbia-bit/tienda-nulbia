import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Los redirects /cart y /checkout causaban ERR_TOO_MANY_REDIRECTS:
  // Shopify devuelve checkoutUrl con nulbia.com como dominio primario →
  // Next.js redirigía a nulbia.myshopify.com → Shopify redirigía de vuelta → bucle.
  // Eliminados. El checkout ahora ocurre desde la PDP directamente.
};

export default nextConfig;
