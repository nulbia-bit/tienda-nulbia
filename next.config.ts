import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirige todo /cart/... a la tienda Shopify
      {
        source: "/cart/:path*",
        destination: "https://nulbia.myshopify.com/cart/:path*",
        permanent: false,
      },
      // Redirige /checkout/... por si acaso
      {
        source: "/checkout/:path*",
        destination: "https://nulbia.myshopify.com/checkout/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
