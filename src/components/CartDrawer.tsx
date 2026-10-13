"use client";

import React from "react";
import Image from "next/image";
import { CartItem } from "@/types";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#EDE7DC]">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EDE7DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A0D17]" />
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EED3] flex items-center justify-center text-[#996515]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1 max-w-xs">
                    Add our Gold Plated or Silver Plated coins to celebrate Diwali with elegance.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#4A0D17] text-white text-xs font-semibold hover:bg-[#30060D] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-xl border border-[#EDE7DC] shadow-sm flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#1C1917] truncate">
                      {item.product.name}
                    </h4>
                    <p className="font-bold text-sm text-[#881B2E] mt-0.5">
                      ₹{item.product.price}
                    </p>

                    {/* Quantity controls matching screenshot 4 */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#EDE7DC] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:text-[#4A0D17] text-stone-500"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:text-[#4A0D17] text-stone-500"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary matching screenshot 4 */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EDE7DC] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#57534E]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1917]">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#57534E]">
                  <span>Shipping (Pan-India)</span>
                  <span className="font-semibold text-[#1C1917]">
                    ₹{shipping}
                  </span>
                </div>
                <div className="border-t border-[#EDE7DC] pt-2 flex justify-between text-sm font-bold text-[#1C1917]">
                  <span className="font-serif text-base">Total</span>
                  <span className="font-serif text-lg text-[#881B2E]">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-[#881B2E] hover:bg-[#661220] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#881B2E]/20 active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#78716C] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>You can apply coupon codes on the next step</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
