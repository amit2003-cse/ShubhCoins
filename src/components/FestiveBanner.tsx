"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function FestiveBanner() {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#32080F] via-[#4A0D17] to-[#2D060D] text-white border border-[#C5A869]/25 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Photo */}
          <div className="md:col-span-5 relative h-60 sm:h-72 md:h-80 w-full">
            <Image
              src="/images/festive-banner.jpg"
              alt="Indian family celebrating Diwali together"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#4A0D17]/40 to-[#4A0D17] pointer-events-none" />
          </div>

          {/* Right Content */}
          <div className="md:col-span-7 p-6 sm:p-10 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFC278] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Festive Gifting Traditions</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5] leading-snug">
              Make this Diwali More Special with a Timeless Gift
            </h2>

            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 max-w-lg leading-relaxed">
              Express gratitude, love, and auspicious wishes. Beautifully packaged in plush velvet gift boxes, ready to gift to loved ones, relatives, and colleagues.
            </p>

            <div className="pt-2">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#DFC278] to-[#C5A869] text-[#2D060D] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
