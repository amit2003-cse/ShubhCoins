"use client";

import React from "react";
import { Award, Gift, RotateCcw, ShieldCheck } from "lucide-react";

export function TrustStrip() {
  const trustItems = [
    {
      icon: Award,
      title: "Premium Finish",
      subtitle: "Gold & Silver Plated",
    },
    {
      icon: Gift,
      title: "Perfect for Gifting",
      subtitle: "Festive Packaging",
    },
    {
      icon: RotateCcw,
      title: "7-Day Return",
      subtitle: "Easy & Hassle Free",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      subtitle: "Razorpay | COD",
    },
  ];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#EDE7DC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-[#EDE7DC]/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#DFC278] hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#F5EED3]/60 flex items-center justify-center text-[#996515] group-hover:bg-[#4A0D17] group-hover:text-[#DFC278] transition-colors shrink-0">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1C1917] tracking-tight truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#57534E] truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
