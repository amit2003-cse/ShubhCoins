"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types";
import { useAuth } from "@/context/AuthContext";
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
}: CartDrawerProps) {
  const { user, requireAuth } = useAuth();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
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
                  <span className="font-semibold text-[#1A1817]">₹{shipping}</span>
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
