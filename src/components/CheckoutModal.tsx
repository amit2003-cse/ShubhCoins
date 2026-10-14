"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  CreditCard,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { loadRazorpayScript } from "@/utils/razorpay";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    paymentId?: string;
    method: string;
  } | null>(null);

  if (!isOpen) return null;

  // Process Razorpay or COD payment
  const handleProceedPayment = async () => {
    setErrorMessage(null);

    // If Cash On Delivery
    if (paymentMethod === "cod") {
      try {
        setIsLoading(true);
        const generatedOrderId = `SC_COD_${Date.now().toString().slice(-6)}`;
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: generatedOrderId,
            amount: totalAmount,
            paymentMethod: "cod",
            customer: {
              name: "Amit Kumar",
              email: "amit4321sg@gmail.com",
              phone: "9876543210",
              address: "123, Main Street, Hyderabad, Telangana - 500001",
            },
          }),
        });

        setConfirmedOrder({
          orderId: generatedOrderId,
          method: "Cash on Delivery (COD)",
        });
        setStep("success");
        onClearCart();
      } catch (e) {
        console.warn("Could not save COD order to DB:", e);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Razorpay Standard Web Checkout
    try {
      setIsLoading(true);

      // 1. Ensure Razorpay Checkout SDK is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Unable to load Razorpay SDK. Please check your internet connection.");
      }

      // 2. Call backend to create Razorpay order
      const createOrderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "INR",
          isRupees: true,
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to create payment order on server");
      }

      const keyId =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderData.key_id;

      if (!keyId) {
        throw new Error("Razorpay Key ID is not configured");
      }

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ShubhCoins",
        description: "Gift Prosperity - Festive Decorative Keepsakes",
        image: "/images/hero-coins.jpg",
        order_id: orderData.order_id,
        prefill: {
          name: "Amit Kumar",
          email: "amit4321sg@gmail.com",
          contact: "9876543210",
        },
        theme: {
          color: "#4A0D17", // Royal Burgundy theme
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            setErrorMessage("Payment was cancelled. You can retry whenever you are ready.");
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setIsLoading(true);
            setErrorMessage(null);

            // 4. Verify payment signature on backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error(verifyData.error || "Payment signature verification failed!");
            }

            // Payment Verified Successfully
            setConfirmedOrder({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              method: "Razorpay (Online Paid)",
            });
            setStep("success");
            onClearCart();
          } catch (err: any) {
            console.error("Verification error:", err);
            setErrorMessage(err.message || "Payment verification failed. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);

      // Handle payment failure event
      paymentObject.on("payment.failed", (failureResponse: any) => {
        console.error("Payment failed:", failureResponse.error);
        setIsLoading(false);
        setErrorMessage(
          failureResponse?.error?.description ||
            "Payment failed. Please try a different card or UPI method."
        );
      });

      paymentObject.open();
    } catch (err: any) {
      console.error("Razorpay initiation error:", err);
      setErrorMessage(err.message || "Failed to initialize Razorpay checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    setStep("address");
    setErrorMessage(null);
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          onClick={step === "success" ? handleFinish : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="relative transform overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-[#EAE4D9] p-6 sm:p-8">
          {step !== "success" && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* STEP 1: Address */}
          {step === "address" && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9A7D3E] uppercase tracking-wider">
                  Step 1 of 2: Shipping
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1817] mt-1">
                  Delivery Address
                </h3>
              </div>

              <div className="p-4 rounded-2xl border-2 border-[#4A0D17] bg-white shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1817]">Amit Kumar</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#4A0D17]/10 text-[#4A0D17]">
                    Default
                  </span>
                </div>
                <p className="text-xs text-[#6B6661] leading-relaxed">
                  123, Main Street, Hyderabad, Telangana - 500001
                </p>
                <p className="text-xs text-[#6B6661]">
                  Phone: <strong>+91 98765 43210</strong>
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] text-xs text-[#6B6661] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A7D3E] shrink-0" />
                <span>Pan India Delivery via BlueDart & Delhivery (3-5 Business Days)</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#EAE4D9]">
                <span className="text-xs font-semibold text-[#6B6661]">
                  Order Total: <strong className="text-base font-bold text-[#4A0D17]">₹{totalAmount}</strong>
                </span>
                <button
                  onClick={() => setStep("payment")}
                  className="px-6 py-2.5 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === "payment" && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9A7D3E] uppercase tracking-wider">
                  Step 2 of 2: Payment
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1817] mt-1">
                  Select Payment Method
                </h3>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-[#4A0D17] bg-white shadow-sm ring-1 ring-[#4A0D17]"
                      : "border-[#EAE4D9] bg-white/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="mt-1 text-[#4A0D17]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#4A0D17]" />
                        <span className="font-bold text-xs sm:text-sm text-[#1A1817]">
                          Razorpay Standard Checkout
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Fast & Secure
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B6661] mt-1">
                      UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking & Wallets.
                    </p>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#4A0D17] bg-white shadow-sm ring-1 ring-[#4A0D17]"
                      : "border-[#EAE4D9] bg-white/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-[#4A0D17]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#9A7D3E]" />
                      <span className="font-bold text-xs sm:text-sm text-[#1A1817]">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B6661] mt-1">
                      Pay in cash when your royal velvet gift box arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#EAE4D9]">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setErrorMessage(null);
                    setStep("address");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 disabled:opacity-50"
                >
                  ← Back to Address
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleProceedPayment}
                  className="px-6 py-2.5 rounded-xl bg-[#4A0D17] hover:bg-[#32080F] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>
                      {paymentMethod === "razorpay"
                        ? `Pay with Razorpay (₹${totalAmount})`
                        : `Confirm COD Order (₹${totalAmount})`}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Success Confirmation */}
          {step === "success" && confirmedOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A7D3E] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Payment Verified & Confirmed!</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                  Thank you for your order!
                </h3>
                <p className="text-xs text-[#6B6661] max-w-sm mx-auto pt-1">
                  Your festive decorative keepsake coin order is confirmed and being prepared in Hyderabad.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE4D9] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B6661]">Order ID:</span>
                  <span className="font-mono font-bold text-[#1A1817]">
                    {confirmedOrder.orderId}
                  </span>
                </div>
                {confirmedOrder.paymentId && (
                  <div className="flex justify-between">
                    <span className="text-[#6B6661]">Payment ID:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {confirmedOrder.paymentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6B6661]">Payment Mode:</span>
                  <span className="font-bold text-[#1A1817]">
                    {confirmedOrder.method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6661]">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">3-5 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-colors"
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
