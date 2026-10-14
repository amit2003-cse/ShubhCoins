"use client";

import React from "react";
import { Award, Gift, RotateCcw, ShieldCheck } from "lucide-react";

export function TrustStrip() {
  const trustItems = [
    {
      icon: Award,
      title: "Premium Finish",
      subtitle: "Gold & Silver Plated Look",
    },
    {
      icon: Gift,
      title: "Perfect for Gifting",
      subtitle: "Festive Velvet Packaging",
    },
    {
      icon: RotateCcw,
      title: "7-Day Easy Return",
      subtitle: "Hassle-Free Replacements",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      subtitle: "Razorpay | COD Available",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm hover:border-[#C5A869]/60 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#9A7D3E] shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-xs sm:text-sm text-[#1A1817] truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#6B6661] truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
