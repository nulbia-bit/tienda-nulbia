// IDs de variante reales de Shopify (numéricos)
export const VARIANT_IDS = {
  oneUnit:    "gid://shopify/ProductVariant/7881254928427",
  twoUnits:   "gid://shopify/ProductVariant/7881256009771",
  threeUnits: "gid://shopify/ProductVariant/7881256665131",
} as const;

// URLs de checkout directo (formato /cart/ID:cantidad)
export const CHECKOUT_URLS = {
  oneUnit:    "https://nulbia.myshopify.com/cart/7881254928427:1",
  twoUnits:   "https://nulbia.myshopify.com/cart/7881256009771:1",
  threeUnits: "https://nulbia.myshopify.com/cart/7881256665131:1",
} as const;

/**
 * Devuelve la URL de checkout directa para un variantId.
 * Usa el formato /cart/NUMERIC_ID:1 que va directo a Shopify
 * sin pasar por Next.js ni causar redirecciones.
 */
export function createCheckout(variantId: string): string {
  // Mapeo explícito variantId → URL de checkout
  const map: Record<string, string> = {
    [VARIANT_IDS.oneUnit]:    CHECKOUT_URLS.oneUnit,
    [VARIANT_IDS.twoUnits]:   CHECKOUT_URLS.twoUnits,
    [VARIANT_IDS.threeUnits]: CHECKOUT_URLS.threeUnits,
  };

  if (map[variantId]) return map[variantId];

  // Fallback: extrae ID numérico del GID y construye la URL
  const numericId = variantId.split("/").pop() ?? variantId;
  return `https://nulbia.myshopify.com/cart/${numericId}:1`;
}
