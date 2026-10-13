"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, Sparkles } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onClearCart: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onClearCart,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    setStep("success");
    onClearCart();
  };

  const handleFinish = () => {
    setStep("address");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          onClick={step === "success" ? handleFinish : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="relative transform overflow-hidden rounded-3xl bg-[#FDFBF7] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-[#EDE7DC] p-6 sm:p-8">
          {step !== "success" && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {step === "address" && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#996515] uppercase tracking-wider">
                  Step 1 of 2: Shipping
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                  Delivery Address
                </h3>
              </div>

              {/* Saved Address Card matching screen 5 */}
              <div className="p-4 rounded-xl border-2 border-[#881B2E] bg-white shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1C1917]">
                    Amit Kumar
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#881B2E]/10 text-[#881B2E]">
                    Default
                  </span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  123, Main Street, Hyderabad, Telangana - 500001
                </p>
                <p className="text-xs text-[#57534E]">
                  Phone: <strong>+91 98765 43210</strong>
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC] text-xs text-[#78716C] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#996515] shrink-0" />
                <span>Pan India Delivery via BlueDart & Delhivery (3-5 Business Days)</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#EDE7DC]">
                <span className="text-xs font-semibold text-[#57534E]">
                  Order Total: <strong className="text-base font-bold text-[#881B2E]">₹{totalAmount}</strong>
                </span>
                <button
                  onClick={() => setStep("payment")}
                  className="px-6 py-2.5 rounded-xl bg-[#881B2E] text-white font-bold text-xs hover:bg-[#661220] transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#996515] uppercase tracking-wider">
                  Step 2 of 2: Payment
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                  Select Payment Method
                </h3>
              </div>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-[#881B2E] bg-white shadow-sm ring-1 ring-[#881B2E]"
                      : "border-[#EDE7DC] bg-[#FAF7F2]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="mt-1 text-[#881B2E]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#881B2E]" />
                      <span className="font-bold text-xs sm:text-sm text-[#1C1917]">
                        Razorpay (UPI, Google Pay, Cards, NetBanking)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Pay securely with 256-bit instant bank encryption.
                    </p>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#881B2E] bg-white shadow-sm ring-1 ring-[#881B2E]"
                      : "border-[#EDE7DC] bg-[#FAF7F2]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-[#881B2E]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#996515]" />
                      <span className="font-bold text-xs sm:text-sm text-[#1C1917]">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Pay in cash when your velvet gift box arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#EDE7DC]">
                <button
                  onClick={() => setStep("address")}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  ← Back to Address
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-6 py-2.5 rounded-xl bg-[#881B2E] text-white font-bold text-xs hover:bg-[#661220] transition-colors"
                >
                  Place Order (₹{totalAmount})
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#996515] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Placed Successfully!</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                  Thank you for your order!
                </h3>
                <p className="text-xs text-[#57534E] max-w-sm mx-auto pt-1">
                  Your festive gift box order <strong className="text-[#881B2E]">#SC123456</strong> is confirmed and being prepared in Hyderabad.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#EDE7DC] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Order ID:</span>
                  <span className="font-bold text-[#1C1917]">#SC123456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Payment Method:</span>
                  <span className="font-bold text-[#1C1917]">
                    {paymentMethod === "razorpay" ? "Razorpay (Online)" : "Cash on Delivery"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">3-5 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#30060D] transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
