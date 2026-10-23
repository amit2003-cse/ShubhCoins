"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Sparkles, ShieldCheck, LogOut, CheckCircle2, Truck, ArrowRight, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isAdminEmail } from "@/utils/admin";
import Image from "next/image";

export function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, user, logout, loginWithCredential } =
    useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentOrder, setRecentOrder] = useState<{
    orderId: string;
    amount: number;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      try {
        const stored = JSON.parse(
          localStorage.getItem("shubhcoins_orders") || "[]"
        );
        if (stored.length > 0) {
          setRecentOrder(stored[0]);
        }
      } catch (err) {
        console.warn("Could not load recent order:", err);
      }
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (!isAuthModalOpen || user) return;

    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "439593796565-5t183h1r9oaphtahj3bv2q2gn0t94iv9.apps.googleusercontent.com";

    // Initialize Google Identity Services
    const initializeGoogle = () => {
      if ((window as any).google?.accounts?.id && googleBtnRef.current) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: any) => {
              if (response.credential) {
                setIsProcessing(true);
                setAuthError(null);
                const loggedInUser = await loginWithCredential(response.credential);
                setIsProcessing(false);
                if (loggedInUser) {
                  if (loggedInUser.isAdmin || isAdminEmail(loggedInUser.email)) {
                    sessionStorage.setItem("shubhcoins_admin_auth", "true");
                    router.push("/admin");
                  }
                } else {
                  setAuthError("Failed to sign in with Google. Please try again.");
                }
              }
            },
          });

          // Render the official Google button
          googleBtnRef.current.innerHTML = "";
          (window as any).google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: 320,
            text: "continue_with",
            shape: "pill",
          });
        } catch (e) {
          console.warn("Google button rendering error:", e);
        }
      }
    };

    if ((window as any).google?.accounts?.id) {
      initializeGoogle();
    } else {
      // Check every 300ms if script loaded
      const interval = setInterval(() => {
        if ((window as any).google?.accounts?.id) {
          initializeGoogle();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isAuthModalOpen, user, loginWithCredential]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-2xl transition-all w-full max-w-md border border-[#EAE4D9] p-6 sm:p-8">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
            /* Logged in state */
            <div className="text-center py-4 space-y-5">
              <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[#C5A869] shadow-md bg-stone-100 flex items-center justify-center">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-2xl font-bold text-[#4A0D17]">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                {isAdminEmail(user.email) ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFC278] bg-[#4A0D17] px-3 py-1 rounded-full mb-1 border border-[#C5A869]/40 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFC278]" />
                    <span>👑 Store Administrator</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Google Account Linked</span>
                  </div>
                )}
                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                  {user.name}
                </h3>
                <p className="text-xs text-[#6B6661] mt-0.5">{user.email}</p>
              </div>

              {/* Recent Order Card if available */}
              {recentOrder && (
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] text-left text-xs space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#6B6661] flex items-center gap-1 font-medium">
                      <Package className="w-3.5 h-3.5 text-[#9A7D3E]" />
                      <span>Latest Order</span>
                    </span>
                    <span className="font-mono font-bold text-[#1A1817]">
                      {recentOrder.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#EAE4D9]/60">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      {recentOrder.status || "Confirmed"}
                    </span>
                    <span className="font-bold text-[#4A0D17]">₹{recentOrder.amount}</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-white rounded-2xl border border-[#EAE4D9] text-xs text-[#6B6661] space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Fast Checkout:</span>
                  <span className="font-semibold text-emerald-700">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>Pan-India Delivery:</span>
                  <span className="font-semibold text-[#1A1817]">BlueDart & Delhivery</span>
                </div>
                {isAdminEmail(user.email) && (
                  <div className="flex justify-between pt-1 border-t border-[#EAE4D9]/60 text-emerald-700 font-semibold">
                    <span>Admin Clearance:</span>
                    <span>Granted</span>
                  </div>
                )}
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-2 pt-1">
                {isAdminEmail(user.email) && (
                  <Link
                    href="/admin"
                    onClick={closeAuthModal}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4A0D17] via-[#5C101D] to-[#4A0D17] text-white text-xs font-bold flex items-center justify-between shadow-lg border border-[#DFC278]/40 hover:brightness-110 transition-all active:scale-95 group"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#DFC278]" />
                      <span>Open Admin Orders Dashboard</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#DFC278] group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}

                <Link
                  href={
                    recentOrder
                      ? `/track-order?orderId=${encodeURIComponent(recentOrder.orderId)}`
                      : "/track-order"
                  }
                  onClick={closeAuthModal}
                  className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1A1817] text-xs font-bold flex items-center justify-between border border-[#EAE4D9] shadow-xs transition-all active:scale-95 group"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#9A7D3E]" />
                    <span>My Orders / Track Live Order</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9A7D3E] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => {
                    logout();
                    closeAuthModal();
                  }}
                  className="w-full py-2 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login state */
            <div className="text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#9A7D3E] tracking-widest uppercase">
                  Welcome to ShubhCoins
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                  Sign In with Google
                </h3>
                <p className="text-xs text-[#6B6661] max-w-xs mx-auto leading-relaxed">
                  Log in to track your festive coin orders, save delivery addresses, and enjoy fast 1-click checkout.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {authError}
                </div>
              )}

              {/* Google Button Container */}
              <div className="flex flex-col items-center justify-center min-h-[50px] py-2">
                {isProcessing ? (
                  <div className="text-xs text-[#9A7D3E] animate-pulse">
                    Authenticating with Google...
                  </div>
                ) : (
                  <div ref={googleBtnRef} className="flex justify-center" />
                )}
              </div>

              <div className="pt-2 border-t border-[#EAE4D9] flex items-center justify-center gap-1.5 text-[11px] text-[#6B6661]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your data is protected with 256-bit encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
