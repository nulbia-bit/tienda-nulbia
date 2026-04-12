// IDs de variante reales de Shopify
export const VARIANT_IDS = {
  oneUnit:    "gid://shopify/ProductVariant/43920665772075",
  twoUnits:   "gid://shopify/ProductVariant/43919665397803",
  threeUnits: "gid://shopify/ProductVariant/43919674474539",
} as const;

// URLs de checkout directo (formato /cart/ID:cantidad)
export const CHECKOUT_URLS = {
  oneUnit:    "https://nulbia.myshopify.com/cart/43920665772075:1",
  twoUnits:   "https://nulbia.myshopify.com/cart/43919665397803:1",
  threeUnits: "https://nulbia.myshopify.com/cart/43919674474539:1",
} as const;

/**
 * Devuelve la URL de checkout directa para un variantId.
 */
export function createCheckout(variantId: string): string {
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
