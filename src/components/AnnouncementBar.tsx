"use client";

import React from "react";
import { Sparkles, Clock, Truck, ShieldCheck } from "lucide-react";
import { useDailyCutoffTimer } from "@/hooks/useCountdownTimer";

export function AnnouncementBar() {
  const { hours, minutes, seconds, isMounted } = useDailyCutoffTimer(17); // 5:00 PM IST daily cutoff

  return (
    <div className="bg-[#32080F] text-[#FAF8F5] text-xs font-medium py-2 px-4 border-b border-[#C5A869]/25 tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-center sm:text-left">
        {/* Left: Festive Perk */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#DFC278] shrink-0" />
          <span className="text-[11px] sm:text-xs">
            Diwali Special:{" "}
            <strong className="text-[#DFC278] font-semibold">
              Free Royal Velvet Gift Box
            </strong>{" "}
            with every order
          </span>
        </div>

        {/* Center: Live Same-Day Express Dispatch Countdown */}
        <div className="flex items-center justify-center gap-1.5 mx-auto lg:mx-0 text-[11px] bg-black/30 border border-[#DFC278]/35 px-2.5 py-0.5 rounded-full shadow-inner">
          <Clock className="w-3 h-3 text-[#DFC278] shrink-0" />
          <span className="text-[#FAF8F5]/85">Express Dispatch in</span>
          <span className="font-mono font-bold text-[#DFC278] tracking-wider">
            {isMounted ? `${hours}h : ${minutes}m : ${seconds}s` : "04h : 12m : 30s"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5 shrink-0" />
        </div>

        {/* Right: Coupon badge & trust */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] mx-auto sm:mx-0">
          <div className="hidden md:flex items-center gap-1 text-[#FAF8F5]/75">
            <Truck className="w-3 h-3 text-[#DFC278]" />
            <span>Pan-India 3-5d</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FAF8F5]/70">Code:</span>
            <span className="font-mono font-bold text-[#DFC278] tracking-wider bg-white/10 px-2 py-0.5 rounded border border-[#DFC278]/30">
              NEWSHUBH
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">10% OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
