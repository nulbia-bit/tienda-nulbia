import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: "nulbia.myshopify.com",
  apiVersion: "2024-10",
  publicAccessToken: "4568dc8f70032a876082b363d51aff87",
});

// Variant IDs obtenidos de la Storefront API
export const VARIANT_IDS = {
  oneUnit:    "gid://shopify/ProductVariant/43919647342635",
  twoUnits:   "gid://shopify/ProductVariant/43919665397803",
  threeUnits: "gid://shopify/ProductVariant/43919674474539",
} as const;

// Cart API (reemplaza el deprecado checkoutCreate)
const CREATE_CART = `
  mutation CartCreate($variantId: ID!) {
    cartCreate(input: {
      lines: [{ merchandiseId: $variantId, quantity: 1 }]
    }) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;

export async function createCheckout(variantId: string): Promise<string | null> {
  try {
    const { data, errors } = await shopifyClient.request(CREATE_CART, {
      variables: { variantId },
    });

    if (errors) {
      console.error("Shopify error:", errors);
      return null;
    }

    const userErrors = data?.cartCreate?.userErrors;
    if (userErrors?.length > 0) {
      console.error("Cart user error:", userErrors[0].message);
      return null;
    }

    return data?.cartCreate?.cart?.checkoutUrl ?? null;
  } catch (err) {
    console.error("Shopify cart error:", err);
    return null;
  }
}
