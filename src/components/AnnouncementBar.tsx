"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#32080F] text-[#FAF8F5] text-xs font-medium py-2 px-4 border-b border-[#C5A869]/25 tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-center sm:text-left">
        {/* Left: Festive Perk */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#DFC278] shrink-0" />
          <span className="text-[11px] sm:text-xs">
            Diwali Special: <strong className="text-[#DFC278] font-semibold">Free Royal Velvet Gift Box</strong> with every order
          </span>
        </div>

        {/* Center: Reassurance perks on desktop */}
        <div className="hidden lg:flex items-center gap-6 text-[11px] text-[#FAF8F5]/80">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-[#DFC278]" />
            <span>Pan-India Express Delivery (3-5 Days)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#DFC278]" />
            <span>Cash on Delivery Available</span>
          </div>
        </div>

        {/* Right: Coupon badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
          <span className="text-[#FAF8F5]/70">Use Code:</span>
          <span className="font-mono font-bold text-[#DFC278] tracking-wider bg-white/10 px-2 py-0.5 rounded border border-[#DFC278]/30">
            SHUBH2024
          </span>
        </div>
      </div>
    </div>
  );
}
