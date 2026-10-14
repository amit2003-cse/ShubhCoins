"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Check } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3D0A12] via-[#4A0D17] to-[#2D060D] text-white shadow-xl border border-[#C5A869]/30">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5A869]/40 text-[#DFC278] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC278]" />
              <span>Festive Edition 2026 • Plain Secular Design</span>
            </div>

            {/* Headlines */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block font-serif italic text-2xl sm:text-3xl text-[#DFC278] font-normal">
                This Diwali
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F5] leading-tight">
                Gift Happiness, <br />
                <span className="gold-shimmer">Gift Prosperity</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#FAF8F5]/85 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              High-luster Gold & Silver-finish decorative coins in handcrafted royal velvet gift cases. 
              Minimalist mirror finish with zero deity engravings for versatile, secular festive gifting.
            </p>

            {/* Quick Reassurances */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-[#DFC278]/90">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Heavy Alloy Core</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>From ₹349</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Free Velvet Box</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFC278] to-[#C5A869] text-[#2D060D] font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#transparency"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white text-xs sm:text-sm font-semibold hover:bg-white/5 transition-all"
              >
                <span>Material Specs</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-[#C5A869]/30 shadow-2xl bg-black/20">
              <Image
                src="/images/hero-coins.jpg"
                alt="ShubhCoins Gold & Silver finish coins in red velvet gift box with glowing diyas"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-white/10 flex items-center justify-between text-xs text-white">
                <span className="font-medium text-[#DFC278]">Royal Velvet Case Included</span>
                <span className="text-[11px] text-white/70">Pan-India COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
