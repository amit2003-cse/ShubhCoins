"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, X, Gift, ArrowRight, ShieldCheck, Tag } from "lucide-react";

interface ExitIntentModalProps {
  hasItemsInCart: boolean;
  onClaimDiscount: (code: string) => void;
}

export function ExitIntentModal({
  hasItemsInCart,
  onClaimDiscount,
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only arm the exit intent if user has items in cart
    if (!hasItemsInCart) return;

    try {
      const alreadyShown = sessionStorage.getItem("shubhcoins_exit_shown");
      if (alreadyShown === "true") return;
    } catch {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves through the top of the browser window (toward tabs/URL bar)
      if (e.clientY <= 15) {
        try {
          const alreadyShown = sessionStorage.getItem("shubhcoins_exit_shown");
          if (alreadyShown === "true") return;
          sessionStorage.setItem("shubhcoins_exit_shown", "true");
        } catch {}
        setIsOpen(true);
      }
    };

    // Delay arming listener by 5 seconds to prevent accidental immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasItemsInCart]);

  if (!isOpen) return null;

  const handleClaim = () => {
    setIsOpen(false);
    onClaimDiscount("DIWALI50");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-2xl transition-all w-full max-w-md border border-[#EAE4D9] p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-4">
            {/* Royal Festive Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A0D17] to-[#32080F] text-[#DFC278] flex items-center justify-center mx-auto shadow-lg border border-[#C5A869]/40">
              <Gift className="w-7 h-7 text-[#DFC278]" />
            </div>

            {/* Header copy */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#9A7D3E] tracking-widest uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wait! Special Festive Offer</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                Don&apos;t Leave Empty-Handed
              </h3>
              <p className="text-xs text-[#6B6661] max-w-xs mx-auto leading-relaxed">
                Take an instant extra <strong className="text-[#4A0D17]">₹50 OFF</strong> on your festive coin order before this browser session closes!
              </p>
            </div>

            {/* Voucher Box */}
            <div className="p-3.5 bg-gradient-to-r from-[#4A0D17]/5 via-[#C5A869]/15 to-[#4A0D17]/5 rounded-2xl border border-[#C5A869]/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-left">
                <Tag className="w-4 h-4 text-[#9A7D3E] shrink-0" />
                <div>
                  <span className="font-mono font-bold text-sm text-[#4A0D17] tracking-wider block">
                    DIWALI50
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    Flat ₹50 Instant Voucher
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Valid Now
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleClaim}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A0D17] via-[#5C101D] to-[#4A0D17] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg border border-[#DFC278]/40 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Claim ₹50 OFF &amp; Complete Order</span>
                <ArrowRight className="w-4 h-4 text-[#DFC278]" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-[#6B6661] hover:text-[#1A1817] hover:underline transition-colors pt-1 block mx-auto"
              >
                No thanks, I will pay full price
              </button>
            </div>

            {/* Reassurance footer */}
            <div className="pt-2 border-t border-[#EAE4D9] flex items-center justify-center gap-1.5 text-[11px] text-[#6B6661]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Luxury Velvet Gift Box • Insured Pan-India Transit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
