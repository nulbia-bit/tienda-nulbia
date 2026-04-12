"use client";
import { Drawer } from "vaul";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
// URLs hardcodeadas: sin funciones, sin router, sin abstracción
const CHECKOUT_URLS: Record<string, string> = {
  "gid://shopify/ProductVariant/7881254928427": "https://nulbia.myshopify.com/cart/7881254928427:1",
  "gid://shopify/ProductVariant/7881256009771": "https://nulbia.myshopify.com/cart/7881256009771:1",
  "gid://shopify/ProductVariant/7881256665131": "https://nulbia.myshopify.com/cart/7881256665131:1",
};

export interface CartItem {
  variantId: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
}

interface SideCartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
}

export function SideCartDrawer({
  open,
  onClose,
  items,
  onQuantityChange,
  onRemove,
}: SideCartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginal = items.reduce(
    (sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity,
    0
  );
  const savings = totalOriginal - total;

  // URL de checkout: lookup directo en el mapa hardcodeado
  const checkoutUrl =
    items.length > 0
      ? (CHECKOUT_URLS[items[0].variantId] ?? "https://nulbia.myshopify.com/cart/7881254928427:1")
      : "https://nulbia.myshopify.com/cart/7881254928427:1";

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(v) => { if (!v) onClose(); }}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content
          className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white flex flex-col shadow-2xl"
          style={{ outline: "none" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-sky-500" />
              <span className="font-bold text-slate-900 text-base">
                Tu carrito ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                <ShoppingBag className="h-12 w-12 opacity-30" />
                <p className="text-sm font-medium">Tu carrito está vacío</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="flex gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-1 ring-slate-200"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-slate-400 text-xs mt-0.5">{item.subtitle}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 border border-slate-200 rounded-full px-1 py-0.5">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? onQuantityChange(item.variantId, item.quantity - 1)
                              : onRemove(item.variantId)
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-3 w-3" />
                          ) : (
                            <Minus className="h-3 w-3" />
                          )}
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onQuantityChange(item.variantId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-bold text-slate-900 text-sm">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-slate-400 text-xs line-through ml-1">
                            {(item.originalPrice * item.quantity).toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
              {savings > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-semibold">Ahorro total</span>
                  <span className="text-emerald-600 font-bold">-{savings.toFixed(2)}€</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 text-sm">Total</span>
                <span className="font-black text-slate-900 text-lg">{total.toFixed(2)}€</span>
              </div>
              <a
                href={checkoutUrl}
                target="_top"
                rel="noopener noreferrer"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 block"
                onClick={(e) => {
                  // Belt-and-suspenders: si el <a> no navega, forzamos con window
                  e.stopPropagation();
                  window.location.href = checkoutUrl;
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                Finalizar compra
              </a>
              <p className="text-center text-xs text-slate-400">
                Pago seguro · Envío gratis en 24h
              </p>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
