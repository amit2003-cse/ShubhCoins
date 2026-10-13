"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#3D0A12] text-[#FDFBF7] text-xs font-medium py-2 px-4 border-b border-[#C6922B]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#DFC278] animate-pulse" />
          <span>
            Festive Special: <span className="text-[#DFC278] font-semibold">Free Royal Velvet Gift Box</span> on all orders!
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#E7DFD3]/90 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#DFC278]" />
            <span>Pan India Express Delivery (3-5 Days)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DFC278]" />
            <span>Cash on Delivery (COD) Available</span>
          </div>
        </div>

        <div className="text-[11px] text-[#DFC278] font-semibold tracking-wider">
          USE CODE: <span className="bg-[#5A121E] px-2 py-0.5 rounded border border-[#DFC278]/40">SHUBH2024</span>
        </div>
      </div>
    </div>
  );
}
