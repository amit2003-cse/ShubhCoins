"use client";

import React from "react";
import { Flame, Briefcase, Heart, Home } from "lucide-react";

export function GiftingOccasions() {
  const occasions = [
    {
      icon: Flame,
      title: "Diwali & Dhanteras",
      subtitle: "Auspicious Tokens",
      description: "Share wishes of health, prosperity, and light with family and neighbors.",
    },
    {
      icon: Briefcase,
      title: "Corporate Gifting",
      subtitle: "Professional Yet Warm",
      description: "Express gratitude to esteemed clients, partners, and teams with an upscale keepsake.",
    },
    {
      icon: Heart,
      title: "Weddings & Anniversaries",
      subtitle: "Distinguished Favors",
      description: "Memorable mementos for wedding guests, sangeet favors, and milestones.",
    },
    {
      icon: Home,
      title: "Griha Pravesh",
      subtitle: "Blessings for Beginnings",
      description: "Celebrate housewarming ceremonies with a gesture of goodwill and lasting elegance.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
        <span className="text-[11px] font-bold tracking-widest text-[#9A7D3E] uppercase">
          Versatile Celebrations
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
          Perfect for Every Auspicious Moment
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6661]">
          Blessed with auspicious Goddess Lakshmi engravings, making them cherished tokens of prosperity across all celebrations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {occasions.map((occ, idx) => {
          const Icon = occ.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#EAE4D9] hover:border-[#C5A869]/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE4D9] flex items-center justify-center text-[#4A0D17]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1A1817]">
                    {occ.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#9A7D3E] mt-0.5">
                    {occ.subtitle}
                  </p>
                </div>
                <p className="text-xs text-[#6B6661] leading-relaxed">
                  {occ.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0EBE2] text-xs font-semibold text-[#4A0D17]">
                <span>Discover Gifting →</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
