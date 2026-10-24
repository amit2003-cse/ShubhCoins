"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem, Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Clock,
  Truck,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: { code: string; discountPercent: number } | null;
  discountAmount: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onAddToCart,
}: CartDrawerProps) {
  const { user, requireAuth } = useAuth();
  const cartTimer = useCountdownTimer({
    storageKey: "shubhcoins_cart_timer",
    initialMinutes: 15,
    autoResetOnExpire: true,
  });
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const inCartIds = new Set(items.map((i) => i.product.id));
  const upsellProduct = PRODUCTS.find((p) => !inCartIds.has(p.id)) || null;

  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const FREE_SHIPPING_THRESHOLD = 650;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const shipping = subtotal > 0 ? (isFreeShipping ? 0 : 50) : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a promo code");
      return;
    }

    setCouponError(null);
    setCouponSuccess(null);

    const result = onApplyCoupon(code);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponInput("");
    } else {
      setCouponError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#EAE4D9]">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#EAE4D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A0D17]" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1817]">
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

          {/* Velvet Gift Box Reservation Banner */}
          {items.length > 0 && (
            <div className="bg-gradient-to-r from-[#4A0D17]/10 via-[#C5A869]/15 to-[#4A0D17]/10 border-b border-[#C5A869]/30 px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1817] text-[11px] leading-tight">
                    Royal Velvet Box Reserved
                  </p>
                  <p className="text-[10px] text-[#6B6661]">
                    High festive demand • Held in cart for:
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white/95 border border-[#C5A869]/40 px-2.5 py-1 rounded-xl shadow-xs">
                <span className="font-mono font-bold text-[#4A0D17] text-xs">
                  {cartTimer.isMounted ? cartTimer.formatted : "14:59"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              </div>
            </div>
          )}

          {/* Free Shipping Progress Gamification Bar */}
          {items.length > 0 && (
            <div className="bg-[#FAF8F5] border-b border-[#EAE4D9] p-3 sm:p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-[#1A1817]">
                  <Truck className="w-3.5 h-3.5 text-[#9A7D3E] shrink-0" />
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-bold">
                        🎉 Unlocked FREE Pan-India Express Delivery!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <span className="text-[#4A0D17] font-bold">
                          ₹{amountAwayFromFreeShipping}
                        </span>{" "}
                        more for <span className="text-emerald-700 font-bold">FREE Delivery</span>
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#6B6661]">
                  {shippingProgressPercent}%
                </span>
              </div>

              {/* Animated Progress Track */}
              <div className="w-full h-2 rounded-full bg-[#EAE4D9] overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFreeShipping
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                      : "bg-gradient-to-r from-[#C5A869] to-[#4A0D17]"
                  }`}
                  style={{ width: `${shippingProgressPercent}%` }}
                />
              </div>

              {isFreeShipping ? (
                <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>You saved ₹50 courier shipping charges on this order!</span>
                </p>
              ) : (
                <p className="text-[10px] text-[#6B6661]">
                  Orders above ₹650 qualify for Insured Priority Courier Transit.
                </p>
              )}
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-14 h-14 rounded-full bg-white border border-[#EAE4D9] flex items-center justify-center text-[#9A7D3E]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1A1817]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#6B6661] mt-1 max-w-xs">
                    Choose from our 24K Gold-tone (₹499) and Silver-tone (₹349) keepsake coins.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#4A0D17] text-white text-xs font-semibold hover:bg-[#32080F] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#EAE4D9] flex gap-3 items-center shadow-xs"
                >
                  <div className="relative w-15 h-15 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1817] truncate">
                      {item.product.name}
                    </h4>
                    <p className="font-bold text-xs sm:text-sm text-[#4A0D17] mt-0.5">
                      ₹{item.product.price}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center border border-[#EAE4D9] rounded-lg bg-[#FAF8F5]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1A1817]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Dynamic 1-Click Festive Pairing Upsell */}
            {items.length > 0 && upsellProduct && onAddToCart && (
              <div className="p-3.5 bg-gradient-to-br from-[#FAF8F5] via-amber-50/50 to-[#FAF8F5] rounded-2xl border border-[#C5A869]/40 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1817] flex items-center gap-1.5 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A7D3E]" />
                    <span>Frequently Paired Together</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#4A0D17] bg-[#DFC278]/25 border border-[#C5A869]/40 px-2 py-0.5 rounded-full">
                    Complete Festive Pair
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#EAE4D9]/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#EAE4D9] shrink-0">
                      <Image
                        src={upsellProduct.image}
                        alt={upsellProduct.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#1A1817] truncate">
                        {upsellProduct.name}
                      </h4>
                      <p className="text-[10px] text-[#6B6661] truncate">
                        {upsellProduct.finish === "gold"
                          ? "Royal Crimson Velvet Case"
                          : "Royal Midnight Blue Velvet Case"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-serif font-bold text-xs text-[#4A0D17]">
                          ₹{upsellProduct.price}
                        </span>
                        <span className="text-[10px] text-stone-400 line-through">
                          ₹{upsellProduct.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(upsellProduct, 1)}
                    className="px-3.5 py-1.5 bg-[#4A0D17] hover:bg-[#32080F] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all shrink-0 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <p className="text-[10px] text-stone-500 italic flex items-center gap-1">
                  <span>💡</span>
                  <span>
                    Adding this qualifies your order for{" "}
                    <strong className="text-emerald-700 not-italic font-bold">
                      FREE Express Pan-India Delivery
                    </strong>
                    !
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Footer Summary & Promo Code Section */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE4D9] space-y-3">
              {/* Promo Code Box */}
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#1A1817]">
                    <Tag className="w-3.5 h-3.5 text-[#9A7D3E]" />
                    <span>Apply Festive Promo Code</span>
                  </div>
                  {!appliedCoupon && (
                    <button
                      type="button"
                      onClick={() => handleApply("NEWSHUBH")}
                      className="text-[11px] font-bold text-[#4A0D17] hover:underline"
                    >
                      Use NEWSHUBH (10% OFF)
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold font-mono text-emerald-800">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[11px] text-emerald-700 ml-1.5">
                          ({appliedCoupon.discountPercent}% OFF Applied!)
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveCoupon();
                        setCouponSuccess(null);
                        setCouponError(null);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline px-2 py-0.5 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleApply();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Enter code (e.g. NEWSHUBH)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          if (couponError) setCouponError(null);
                        }}
                        className="flex-1 px-3 py-2 text-xs font-mono font-semibold bg-white rounded-xl border border-[#EAE4D9] uppercase focus:outline-none focus:border-[#4A0D17]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#4A0D17] hover:bg-[#32080F] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Apply
                      </button>
                    </form>

                    {couponError && (
                      <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{couponError}</span>
                      </p>
                    )}
                    {couponSuccess && (
                      <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{couponSuccess}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B6661]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1817]">₹{subtotal}</span>
                </div>

                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#9A7D3E]" />
                      <span>10% Festive Discount ({appliedCoupon.code})</span>
                    </span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B6661]">
                  <span>Shipping (Pan-India)</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                      <span className="line-through text-stone-400 font-normal">₹50</span>
                      <span className="bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    </span>
                  ) : (
                    <span className="font-semibold text-[#1A1817]">₹{shipping}</span>
                  )}
                </div>

                <div className="border-t border-[#F0EBE2] pt-2 flex justify-between font-bold text-sm text-[#1A1817]">
                  <span className="font-serif">Total</span>
                  <div className="text-right">
                    <span className="font-serif text-base text-[#4A0D17]">
                      ₹{total}
                    </span>
                    {discountAmount > 0 && (
                      <span className="block text-[10px] text-emerald-700 font-bold">
                        You saved ₹{discountAmount}!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  if (!user) {
                    requireAuth(() => {
                      onCheckout();
                    }, "Please sign in with Google to proceed to checkout and track your festive order.");
                  } else {
                    onCheckout();
                  }
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#4A0D17] hover:bg-[#32080F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B6661]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure 256-bit Razorpay / COD Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
