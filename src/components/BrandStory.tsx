"use client";

import React from "react";
import { Sparkles, Shield, HeartHandshake, Eye } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Universal & Secular Design",
      description:
        "Clean, mirror-polished plain finish with zero deity illustrations or religious imagery — making it a welcoming gift for everyone.",
    },
    {
      icon: Shield,
      title: "Honest Material Standards",
      description:
        "100% transparent. Heavyweight zinc-brass alloy core finished in durable 24K gold and silver-tone electroplating — not solid bullion.",
    },
    {
      icon: HeartHandshake,
      title: "Thoughtful Festive Gifting",
      description:
        "Delivering the warmth of classic Indian festive tokens at honest prices (₹349 & ₹499), without jeweler markups.",
    },
    {
      icon: Eye,
      title: "Presentation Perfection",
      description:
        "Enclosed in a handcrafted royal velvet presentation case with satin ribbon, turning every unboxing into a joyous memory.",
    },
  ];

  return (
    <section id="story" className="py-14 sm:py-20 border-y border-[#EAE4D9] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-widest text-[#9A7D3E] uppercase">
            Heritage & Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
            Tradition Reimagined for Modern Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6661] leading-relaxed pt-1">
            Gifting a lustrous coin during Diwali signifies sharing wishes of prosperity, light, and bright beginnings. 
            At ShubhCoins, we make this timeless tradition accessible with impeccable decorative craft.
          </p>
        </div>

        {/* 4 Clean Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EAE4D9] hover:border-[#C5A869]/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] text-[#9A7D3E] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1A1817]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#6B6661] leading-relaxed">
                    {pillar.description}
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
