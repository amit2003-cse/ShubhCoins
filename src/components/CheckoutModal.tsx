"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  CreditCard,
  Sparkles,
  Loader2,
  AlertCircle,
  Gift,
  Truck,
  Edit2,
  Clock,
} from "lucide-react";
import { loadRazorpayScript } from "@/utils/razorpay";
import { useAuth } from "@/context/AuthContext";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { CartItem, ShippingAddress } from "@/types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  discountAmount?: number;
  appliedCoupon?: string;
  onClearCart: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalAmount,
  discountAmount = 0,
  appliedCoupon,
  onClearCart,
}: CheckoutModalProps) {
  const { user, openAuthModal, requireAuth } = useAuth();
  const paymentTimer = useCountdownTimer({
    storageKey: "shubhcoins_payment_timer",
    initialMinutes: 10,
    autoResetOnExpire: true,
  });

  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    giftMessage: "",
  });

  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    paymentId?: string;
    method: string;
    items: CartItem[];
    shippingAddress: ShippingAddress;
    amount: number;
  } | null>(null);

  // Sync user info if user logs in
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  // Validate Address Form
  const validateAddress = () => {
    const errors: Record<string, string> = {};

    if (!address.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    const cleanPhone = address.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!address.email.trim() || !address.email.includes("@")) {
      errors.email = "Enter a valid email address";
    }

    const cleanPincode = address.pincode.replace(/\D/g, "");
    if (!cleanPincode || cleanPincode.length !== 6) {
      errors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (!address.addressLine1.trim()) {
      errors.addressLine1 = "House/Flat no, building or street name is required";
    }

    if (!address.city.trim()) {
      errors.city = "City is required";
    }

    if (!address.state.trim()) {
      errors.state = "State is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("Please sign in with Google to proceed with checkout.");
      return;
    }
    if (validateAddress()) {
      setStep("payment");
    }
  };

  const formattedFullAddress = `${address.addressLine1}${
    address.addressLine2 ? ", " + address.addressLine2 : ""
  }${address.landmark ? ", Near " + address.landmark : ""}, ${address.city}, ${
    address.state
  } - ${address.pincode}`;

  const preparedItems = items.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    finish: item.product.finish,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image,
  }));

  // Process Razorpay or COD payment
  const handleProceedPayment = async () => {
    setErrorMessage(null);

    const customerPayload = {
      name: address.fullName.trim(),
      email: address.email.trim(),
      phone: address.phone.trim(),
      addressLine1: address.addressLine1.trim(),
      addressLine2: address.addressLine2?.trim() || "",
      landmark: address.landmark?.trim() || "",
      city: address.city.trim(),
      state: address.state.trim(),
      pincode: address.pincode.trim(),
      fullAddress: formattedFullAddress,
      giftMessage: showGiftMessage ? address.giftMessage?.trim() : "",
    };

    // If Cash On Delivery
    if (paymentMethod === "cod") {
      try {
        setIsLoading(true);
        const generatedOrderId = `SC_COD_${Date.now().toString().slice(-6)}`;
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: generatedOrderId,
            amount: totalAmount,
            paymentMethod: "cod",
            items: preparedItems,
            customer: customerPayload,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to place COD order");
        }

        // Save last order to localStorage for customer reference
        try {
          const pastOrders = JSON.parse(localStorage.getItem("shubhcoins_orders") || "[]");
          pastOrders.unshift({
            orderId: generatedOrderId,
            amount: totalAmount,
            method: "Cash on Delivery (COD)",
            date: new Date().toISOString(),
            status: "Placed",
            items: preparedItems,
          });
          localStorage.setItem("shubhcoins_orders", JSON.stringify(pastOrders));
        } catch (storageErr) {
          console.warn("Could not save order locally:", storageErr);
        }

        setConfirmedOrder({
          orderId: generatedOrderId,
          method: "Cash on Delivery (COD)",
          items: [...items],
          shippingAddress: { ...address },
          amount: totalAmount,
        });
        setStep("success");
        onClearCart();
      } catch (e: any) {
        console.error("COD order error:", e);
        setErrorMessage(e.message || "Could not complete order. Please try again.");
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
          items: preparedItems,
          customer: customerPayload,
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
          name: customerPayload.name,
          email: customerPayload.email,
          contact: customerPayload.phone,
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

            // Save to local storage for quick tracking
            try {
              const pastOrders = JSON.parse(localStorage.getItem("shubhcoins_orders") || "[]");
              pastOrders.unshift({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: totalAmount,
                method: "Razorpay (Online Paid)",
                date: new Date().toISOString(),
                status: "Paid",
                items: preparedItems,
              });
              localStorage.setItem("shubhcoins_orders", JSON.stringify(pastOrders));
            } catch (err) {
              console.warn("Could not save order locally:", err);
            }

            // Payment Verified Successfully
            setConfirmedOrder({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              method: "Razorpay (Online Paid)",
              items: [...items],
              shippingAddress: { ...address },
              amount: totalAmount,
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
            "Payment failed. Please try a different card, UPI or select Cash on Delivery."
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
      <div className="flex min-h-full items-center justify-center p-3 text-center sm:p-4">
        <div
          onClick={step === "success" ? handleFinish : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="relative transform overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-2xl transition-all sm:my-8 w-full max-w-xl border border-[#EAE4D9] p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
          {step !== "success" && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* STEP 1: Address Input Form */}
          {step === "address" && (
            <form onSubmit={handleContinueToPayment} className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-[#9A7D3E] uppercase tracking-wider">
                  Step 1 of 2: Shipping Details
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817] mt-0.5">
                  Where should we deliver?
                </h3>
                <p className="text-xs text-[#6B6661] mt-1">
                  Enclosed in luxury velvet gift packaging with insured Pan-India transit.
                </p>
              </div>

              {/* Google Verified Customer Status */}
              {user ? (
                <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#EAE4D9] shadow-xs">
                  <div className="flex items-center gap-2.5">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-[#C5A869]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#4A0D17] text-[#DFC278] text-xs flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-[#1A1817] flex items-center gap-1.5">
                        <span>{user.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </p>
                      <p className="text-[11px] text-[#6B6661]">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Google Verified
                  </span>
                </div>
              ) : (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1817]">Sign In with Google Required</p>
                      <p className="text-[11px] text-[#6B6661]">Please sign in with Google to complete your order</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal("Sign in with Google to complete your order.")}
                    className="px-3.5 py-1.5 bg-[#4A0D17] hover:bg-[#32080F] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-3.5">
                {/* Full Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={address.fullName}
                      onChange={(e) => {
                        setAddress({ ...address, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                        formErrors.fullName ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                      } focus:outline-none focus:border-[#4A0D17]`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      Mobile Number (for delivery SMS) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-stone-100 text-stone-600 border border-r-0 border-[#EAE4D9] rounded-l-xl font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={address.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setAddress({ ...address, phone: val });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-r-xl border ${
                          formErrors.phone ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                        } focus:outline-none focus:border-[#4A0D17]`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Email Address (for order receipt & tracking) *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={address.email}
                    onChange={(e) => {
                      setAddress({ ...address, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                      formErrors.email ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                    } focus:outline-none focus:border-[#4A0D17]`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Flat / House No., Apartment & Street *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 402, Lotus Residency, 5th Main Road"
                    value={address.addressLine1}
                    onChange={(e) => {
                      setAddress({ ...address, addressLine1: e.target.value });
                      if (formErrors.addressLine1) setFormErrors({ ...formErrors, addressLine1: "" });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                      formErrors.addressLine1 ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                    } focus:outline-none focus:border-[#4A0D17]`}
                  />
                  {formErrors.addressLine1 && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.addressLine1}</p>
                  )}
                </div>

                {/* Area & Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      Area / Sector / Colony
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Banjara Hills"
                      value={address.addressLine2 || ""}
                      onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Opposite City Mall"
                      value={address.landmark || ""}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                    />
                  </div>
                </div>

                {/* PIN Code, City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="500001"
                      value={address.pincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setAddress({ ...address, pincode: val });
                        if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                        formErrors.pincode ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                      } focus:outline-none focus:border-[#4A0D17]`}
                    />
                    {formErrors.pincode && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Hyderabad"
                      value={address.city}
                      onChange={(e) => {
                        setAddress({ ...address, city: e.target.value });
                        if (formErrors.city) setFormErrors({ ...formErrors, city: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                        formErrors.city ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                      } focus:outline-none focus:border-[#4A0D17]`}
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="Telangana"
                      value={address.state}
                      onChange={(e) => {
                        setAddress({ ...address, state: e.target.value });
                        if (formErrors.state) setFormErrors({ ...formErrors, state: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                        formErrors.state ? "border-red-400 ring-1 ring-red-400" : "border-[#EAE4D9]"
                      } focus:outline-none focus:border-[#4A0D17]`}
                    />
                    {formErrors.state && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.state}</p>
                    )}
                  </div>
                </div>

                {/* Festive Gift Note Option */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGiftMessage(!showGiftMessage)}
                    className="flex items-center gap-2 text-xs font-semibold text-[#4A0D17] hover:text-[#32080F]"
                  >
                    <Gift className="w-4 h-4 text-[#9A7D3E]" />
                    <span>
                      {showGiftMessage
                        ? "Remove festive gift greeting card"
                        : "+ Add free printed festive greeting note inside box"}
                    </span>
                  </button>

                  {showGiftMessage && (
                    <div className="mt-2.5">
                      <textarea
                        rows={2}
                        placeholder="Write your personal festive message (e.g., 'Wishing you and your family abundant prosperity & joyous Diwali! — With love, Amit')"
                        value={address.giftMessage || ""}
                        onChange={(e) => setAddress({ ...address, giftMessage: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Promise Badge */}
              <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] text-xs text-[#6B6661] flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#9A7D3E] shrink-0" />
                <span>Express Pan-India Delivery (3-5 Business Days) via BlueDart & Delhivery.</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#EAE4D9]">
                <div>
                  <span className="text-[11px] text-[#6B6661] block">Order Total</span>
                  <strong className="text-base font-bold text-[#4A0D17]">₹{totalAmount}</strong>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-all shadow-md flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Method & Order Review */}
          {step === "payment" && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-[#9A7D3E] uppercase tracking-wider">
                  Step 2 of 2: Payment
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817] mt-0.5">
                  Select Payment Method
                </h3>
              </div>

              {/* Address Review Card */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#EAE4D9] flex items-start justify-between gap-3 shadow-xs">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9A7D3E]" />
                    <strong className="text-[#1A1817]">{address.fullName}</strong>
                    <span className="text-[#6B6661]">({address.phone})</span>
                  </div>
                  <p className="text-[#6B6661] leading-relaxed pl-5">
                    {formattedFullAddress}
                  </p>
                  {showGiftMessage && address.giftMessage && (
                    <p className="text-[11px] text-[#9A7D3E] font-medium pl-5 italic">
                      Gift Note: &quot;{address.giftMessage}&quot;
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setStep("address")}
                  className="p-1.5 text-stone-500 hover:text-[#4A0D17] hover:bg-stone-50 rounded-lg shrink-0 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Order Items Summary */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                <span className="text-[11px] font-bold text-[#6B6661] uppercase tracking-wider">
                  Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1A1817]">
                          {item.product.name}
                        </span>
                        <span className="text-stone-500">× {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#4A0D17]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold pt-1.5 border-t border-stone-200">
                    <span>Festive Discount ({appliedCoupon || "NEWSHUBH"} - 10%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-stone-200">
                  <span className="text-stone-500">Express Delivery (Pan-India)</span>
                  {items.reduce((s, i) => s + i.product.price * i.quantity, 0) >= 650 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="line-through text-stone-400 font-normal">₹50</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        FREE
                      </span>
                    </span>
                  ) : (
                    <span className="text-[#1A1817] font-semibold">₹50</span>
                  )}
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* Payment Methods */}
              <div className="space-y-3">
                {/* Online Payment Urgency / Anti-COD Priority Card */}
                <div className="p-3 bg-gradient-to-r from-emerald-50 via-amber-50/60 to-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1817] text-[11px] flex items-center gap-1.5">
                        <span>Online Payment Priority Perk</span>
                        <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded">
                          Priority Transit
                        </span>
                      </p>
                      <p className="text-[10px] text-emerald-800 mt-0.5">
                        Complete payment via UPI / Card in <span className="font-mono font-bold text-[#4A0D17]">{paymentTimer.isMounted ? paymentTimer.formatted : "09:59"}</span> for Free Express Dispatch!
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/95 border border-emerald-300 px-2.5 py-1 rounded-xl shadow-2xs text-center shrink-0 ml-2">
                    <span className="font-mono font-bold text-emerald-800 text-xs block">
                      {paymentTimer.isMounted ? paymentTimer.formatted : "09:59"}
                    </span>
                  </div>
                </div>

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
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ★ Recommended • Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B6661] mt-1">
                      UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking.
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
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#9A7D3E]" />
                        <span className="font-bold text-xs sm:text-sm text-[#1A1817]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        Standard Transit
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B6661] mt-1">
                      Pay in cash when your royal velvet gift box arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#EAE4D9]">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setErrorMessage(null);
                    setStep("address");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 disabled:opacity-50"
                >
                  ← Edit Address
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
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <span>
                      {paymentMethod === "razorpay"
                        ? `Pay Online (₹${totalAmount})`
                        : `Confirm COD Order (₹${totalAmount})`}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Success Confirmation */}
          {step === "success" && confirmedOrder && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A7D3E] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Confirmed!</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                  Shubh Deepawali & Thank You!
                </h3>
                <p className="text-xs text-[#6B6661] max-w-sm mx-auto pt-0.5">
                  Your festive decorative keepsake coin order is confirmed and being prepared in Hyderabad.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE4D9] text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                  <span className="text-[#6B6661]">Order ID:</span>
                  <span className="font-mono font-bold text-[#1A1817] text-sm">
                    {confirmedOrder.orderId}
                  </span>
                </div>

                {confirmedOrder.paymentId && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B6661]">Payment ID:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {confirmedOrder.paymentId}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-[#6B6661]">Payment Mode:</span>
                  <span className="font-bold text-[#1A1817]">
                    {confirmedOrder.method}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#6B6661]">Amount:</span>
                  <span className="font-bold text-[#4A0D17]">
                    ₹{confirmedOrder.amount}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[#6B6661] block mb-1">Delivering to:</span>
                  <p className="font-medium text-[#1A1817]">
                    {confirmedOrder.shippingAddress.fullName} (+91 {confirmedOrder.shippingAddress.phone})
                  </p>
                  <p className="text-[11px] text-[#6B6661] leading-relaxed">
                    {confirmedOrder.shippingAddress.addressLine1}, {confirmedOrder.shippingAddress.city},{" "}
                    {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                  </p>
                </div>

                <div className="pt-1 flex justify-between items-center text-[11px]">
                  <span className="text-[#6B6661]">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">3-5 Business Days (BlueDart)</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href={`/order-success?orderId=${encodeURIComponent(confirmedOrder.orderId)}`}
                  onClick={handleFinish}
                  className="w-full py-3 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>View Full Receipt & Track Shipment</span>
                  <span>→</span>
                </Link>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#EAE4D9] text-[#1A1817] font-semibold text-xs hover:bg-stone-50 transition-colors"
                >
                  Continue Exploring ShubhCoins
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
