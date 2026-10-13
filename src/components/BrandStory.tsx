"use client";

import React from "react";
import { Sparkles, Shield, HeartHandshake, Eye } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Universal & Secular Design",
      description:
        "Every ShubhCoins piece features a completely plain, mirror-polished finish without deity illustrations or religious imagery, ensuring it is a welcoming gift for everyone.",
    },
    {
      icon: Shield,
      title: "Honest Material Standards",
      description:
        "We are 100% transparent. Our coins are made with heavy decorative metal alloy cores finished in durable 24K gold and silver-tone electroplating — not solid bullion.",
    },
    {
      icon: HeartHandshake,
      title: "Thoughtful Festive Gifting",
      description:
        "Delivering the warmth and auspicious feeling of classic Indian gifting at accessible prices (₹349 & ₹499), without high jeweler premiums.",
    },
    {
      icon: Eye,
      title: "Presentation Perfection",
      description:
        "Each coin arrives safely enclosed in a handcrafted royal velvet presentation case, turning every unboxing into a joyous festive memory.",
    },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FAF7F2] border-y border-[#EDE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#996515] uppercase">
            Our Purpose & Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
            Tradition Reimagined for Modern Festivities
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#DFC278] via-[#C6922B] to-[#DFC278] mx-auto" />
          <p className="text-base text-[#57534E] leading-relaxed pt-2">
            In Indian culture, gifting a gleaming metal coin during festivals like Diwali and Dhanteras 
            signifies sharing wishes of goodwill, abundance, and bright beginnings. 
            At <strong className="text-[#4A0D17]">ShubhCoins</strong>, we celebrate this timeless emotion 
            with beautifully finished decorative keepsake coins that are elegant, accessible, and ready to gift.
          </p>
        </div>

        {/* 4 Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EDE7DC] shadow-sm hover:border-[#DFC278] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EED3]/70 text-[#996515] flex items-center justify-center group-hover:bg-[#4A0D17] group-hover:text-[#DFC278] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#4A0D17] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
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
