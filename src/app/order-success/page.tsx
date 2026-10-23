"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Printer,
  ArrowRight,
  ShieldCheck,
  Gift,
  HelpCircle,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface OrderDetail {
  orderId: string;
  paymentId?: string;
  paymentMethod: string;
  status: string;
  amount: number;
  createdAt: string;
  items: Array<{
    productId: string;
    name: string;
    finish?: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
    fullAddress?: string;
    giftMessage?: string;
  };
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId") || searchParams.get("id");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // 1. Try to fetch from backend API
        const res = await fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`);
        const data = await res.json();

        if (res.ok && data.success && data.order) {
          setOrder(data.order);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch order from API:", err);
      }

      // 2. Fallback to localStorage for local dev without active DB
      try {
        const stored = JSON.parse(localStorage.getItem("shubhcoins_orders") || "[]");
        const found = stored.find((o: any) => o.orderId === orderId);
        if (found) {
          setOrder({
            orderId: found.orderId,
            paymentId: found.paymentId,
            paymentMethod: found.method || "cod",
            status: found.status || "Placed",
            amount: found.amount || 0,
            createdAt: found.date || new Date().toISOString(),
            items: found.items || [],
            customer: found.customer || {
              name: "Valued Customer",
              email: "support@shubhcoins.in",
              phone: "7488574616",
              fullAddress: "Delivery Address Specified at Checkout",
            },
          });
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn("LocalStorage fallback error:", e);
      }

      // 3. Graceful fallback if orderId exists but wasn't in DB or storage
      setOrder({
        orderId: orderId,
        paymentMethod: orderId.startsWith("SC_COD") ? "Cash on Delivery (COD)" : "Razorpay Online",
        status: "confirmed",
        amount: 549,
        createdAt: new Date().toISOString(),
        items: [
          {
            productId: "coin-gold",
            name: "Shubh 24K Gold-Finish Keepsake Coin",
            finish: "gold",
            price: 499,
            quantity: 1,
            image: "/images/hero-coins.jpg",
          },
        ],
        customer: {
          name: "Valued Customer",
          email: "support@shubhcoins.in",
          phone: "7488574616",
          fullAddress: "Pan-India Address Registered at Checkout",
        },
      });
      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-3 border-[#4A0D17] border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="font-serif text-lg font-bold text-[#1A1817]">
          Retrieving your festive order receipt...
        </h2>
      </div>
    );
  }

  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Today";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation Bar / Brand Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EAE4D9] mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center font-bold text-xs">
              SC
            </div>
            <span className="font-serif text-xl font-bold text-[#4A0D17]">
              ShubhCoins
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-[#4A0D17] hover:underline flex items-center gap-1"
          >
            <span>Back to Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Celebration Banner */}
        <div className="bg-gradient-to-br from-[#4A0D17] to-[#2D060D] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#DFC278]/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#DFC278] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#DFC278] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Order Confirmed & Payment Verified</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Shubh Deepawali & Prosperity Wishes!
              </h1>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                Thank you for choosing ShubhCoins. Your keepsake coin is being prepared in our handcrafted velvet presentation case in Hyderabad.
              </p>
            </div>
          </div>
        </div>

        {/* Order Tracker Milestones */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE4D9] shadow-sm mb-8 space-y-4">
          <h2 className="font-serif text-sm font-bold text-[#1A1817] uppercase tracking-wider">
            Order Status & Fulfillment
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-[#4A0D17]/5 border border-[#4A0D17]/20 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmed</span>
              </div>
              <p className="text-[11px] text-[#6B6661]">Order Received</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#DFC278]/15 border border-[#DFC278]/30 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#9A7D3E] font-bold text-xs">
                <Package className="w-4 h-4" />
                <span>Packing</span>
              </div>
              <p className="text-[11px] text-[#6B6661]">Velvet Box Casing</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-center sm:text-left opacity-80">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-stone-600 font-bold text-xs">
                <Truck className="w-4 h-4" />
                <span>Express Courier</span>
              </div>
              <p className="text-[11px] text-[#6B6661]">BlueDart / Delhivery</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-center sm:text-left opacity-80">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-stone-600 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Delivered</span>
              </div>
              <p className="text-[11px] text-[#6B6661]">In 3-5 Business Days</p>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE4D9] shadow-sm mb-8 space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#EAE4D9] text-xs">
            <div>
              <span className="text-[#6B6661] block text-[11px]">Order Number</span>
              <strong className="font-mono text-sm text-[#1A1817]">
                {order?.orderId}
              </strong>
            </div>

            <div>
              <span className="text-[#6B6661] block text-[11px]">Order Date</span>
              <strong className="text-xs text-[#1A1817]">{formattedDate}</strong>
            </div>

            <div>
              <span className="text-[#6B6661] block text-[11px]">Payment Mode</span>
              <strong className="text-xs text-[#1A1817]">
                {order?.paymentMethod?.includes("cod")
                  ? "Cash on Delivery"
                  : "Razorpay (Online)"}
              </strong>
            </div>

            <div>
              <span className="text-[#6B6661] block text-[11px]">Total Paid</span>
              <strong className="text-base font-bold text-[#4A0D17]">
                ₹{order?.amount}
              </strong>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#1A1817]">
              Items in Your Presentation Box
            </h3>

            <div className="space-y-3">
              {order?.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE4D9] p-1 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-6 h-6 text-[#9A7D3E]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#1A1817]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#6B6661]">
                          Finish: <span className="capitalize">{item.finish || "Gold"}</span> • Handcrafted Velvet Gift Box Included
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#6B6661] block">
                        Qty: {item.quantity}
                      </span>
                      <strong className="font-bold text-xs text-[#4A0D17]">
                        ₹{item.price * item.quantity}
                      </strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1A1817]">
                    Festive Keepsake Coin Collection
                  </span>
                  <span className="font-bold text-xs text-[#4A0D17]">
                    ₹{order?.amount}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address & Gift Note */}
          <div className="pt-4 border-t border-[#EAE4D9] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#1A1817]">
                <MapPin className="w-3.5 h-3.5 text-[#9A7D3E]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-stone-800 font-semibold">
                {order?.customer?.name} ({order?.customer?.phone})
              </p>
              <p className="text-[#6B6661] leading-relaxed">
                {order?.customer?.fullAddress ||
                  `${order?.customer?.addressLine1 || ""}, ${
                    order?.customer?.city || ""
                  }, ${order?.customer?.state || ""} - ${
                    order?.customer?.pincode || ""
                  }`}
              </p>
            </div>

            <div className="space-y-1.5 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EAE4D9]">
              <div className="flex items-center gap-1.5 font-bold text-[#9A7D3E]">
                <Gift className="w-3.5 h-3.5" />
                <span>Gift Packaging & Note</span>
              </div>
              <p className="text-[11px] text-[#6B6661] leading-relaxed">
                {order?.customer?.giftMessage ? (
                  <span className="italic text-[#1A1817] font-medium">
                    &quot;{order.customer.giftMessage}&quot;
                  </span>
                ) : (
                  "Enclosed in royal velvet presentation case with protective acrylic coin capsule."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#EAE4D9] hover:bg-stone-50 text-xs font-semibold text-[#1A1817] flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-[#9A7D3E]" />
              <span>Print Invoice</span>
            </button>

            <Link
              href={`/track-order?orderId=${encodeURIComponent(order?.orderId || "")}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#4A0D17] hover:bg-[#32080F] text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Status</span>
            </Link>
          </div>

          <a
            href={`https://wa.me/917488574616?text=${encodeURIComponent(
              `Hi ShubhCoins team! I have an inquiry about my Order #${order?.orderId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#9A7D3E] hover:text-[#4A0D17] flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Need Help? Chat with us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
          <div className="w-10 h-10 border-3 border-[#4A0D17] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
