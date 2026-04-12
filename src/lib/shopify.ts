// Variant IDs obtenidos de la Storefront API de Shopify
export const VARIANT_IDS = {
  oneUnit:    "gid://shopify/ProductVariant/43919647342635",
  twoUnits:   "gid://shopify/ProductVariant/43919665397803",
  threeUnits: "gid://shopify/ProductVariant/43919674474539",
} as const;

/**
 * Construye la URL directa de checkout de Shopify para una variante.
 *
 * Usamos el formato /cart/NUMERIC_ID:1 en lugar de la Cart API porque:
 * - La Cart API devuelve checkoutUrl con el dominio primario (nulbia.com),
 *   lo que causa 404 en Next.js y bucles de redirección.
 * - La URL /cart/ID:1 va directo al checkout de Shopify sin redirecciones.
 *
 * @param variantId  GID completo, e.g. "gid://shopify/ProductVariant/43919647342635"
 */
export function createCheckout(variantId: string): string {
  // Extrae el ID numérico del GID: "gid://shopify/ProductVariant/12345" → "12345"
  const numericId = variantId.split("/").pop() ?? variantId;
  return `https://nulbia.myshopify.com/cart/${numericId}:1`;
}
