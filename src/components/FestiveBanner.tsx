"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function FestiveBanner() {
  return (
    <section className="py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#3D0A12] via-[#4A0D17] to-[#2D060D] border border-[#DFC278]/30">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Image Section */}
            <div className="md:col-span-6 relative h-64 sm:h-80 md:h-96 w-full">
              <Image
                src="/images/festive-banner.jpg"
                alt="Indian family celebrating Diwali and exchanging festive gifts"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Gradient blend on right side */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#4A0D17]/40 to-[#4A0D17] pointer-events-none" />
            </div>

            {/* Right Content Section */}
            <div className="md:col-span-6 p-8 sm:p-10 lg:p-12 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC278]/20 border border-[#DFC278]/40 text-[#DFC278] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Spirit of Indian Festivities</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF7F2] leading-tight">
                Make this Diwali More Special with a Timeless Gift
              </h2>

              <p className="text-sm sm:text-base text-[#E7DFD3]/90 max-w-lg leading-relaxed">
                Tokens of appreciation that express warm wishes and prosperity. 
                Delivered in velvet gift cases, ready to delight family, friends, and colleagues.
              </p>

              <div>
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#DFC278] to-[#C6922B] text-[#2D060D] font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
