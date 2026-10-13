"use client";

import React from "react";
import { Flame, Briefcase, Heart, Home } from "lucide-react";

export function GiftingOccasions() {
  const occasions = [
    {
      icon: Flame,
      title: "Diwali & Dhanteras",
      subtitle: "Auspicious Tokens of Prosperity",
      description:
        "The quintessential Indian festive gesture. Share wishes of light, joy, and good fortune with family and neighbors.",
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-700",
    },
    {
      icon: Briefcase,
      title: "Corporate & Client Gifting",
      subtitle: "Professional Yet Warm",
      description:
        "Express gratitude to teams, clients, and partners with an upscale, secular keepsake that stays on their desks for years.",
      color: "from-rose-500/10 to-amber-500/10",
      accent: "text-[#881B2E]",
    },
    {
      icon: Heart,
      title: "Weddings & Anniversaries",
      subtitle: "Memorable Mementos",
      description:
        "A distinguished gift favor for guests attending sangeet, wedding ceremonies, and milestone celebrations.",
      color: "from-purple-500/10 to-pink-500/10",
      accent: "text-purple-800",
    },
    {
      icon: Home,
      title: "Griha Pravesh & Milestones",
      subtitle: "Blessings for New Beginnings",
      description:
        "Celebrate housewarming pujas, new ventures, and promotions with a touch of enduring beauty and elegance.",
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-800",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#996515] uppercase">
            Meaningful Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
            Ideal for Every Auspicious Occasion
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            Our coins are created without deity iconography, making them versatile tokens suitable for any celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white border border-[#EDE7DC] hover:border-[#DFC278] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${occ.color} flex items-center justify-center ${occ.accent}`}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#4A0D17] transition-colors">
                      {occ.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#996515] mt-0.5">
                      {occ.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDE7DC]/60 flex items-center justify-between text-xs font-medium text-[#4A0D17]">
                  <span>Explore Gifting</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
