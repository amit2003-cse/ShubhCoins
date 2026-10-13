"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#3D0A12] via-[#4A0D17] to-[#2D060D] text-white py-12 lg:py-20 border-b border-[#C6922B]/20">
      {/* Decorative festive ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6922B]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#881B2E]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle traditional Indian geometric motif overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#DFC278_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFC278]/15 border border-[#DFC278]/40 text-[#DFC278] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auspicious Festive Edition 2026</span>
            </div>

            {/* Main Headline replicating screenshot */}
            <div className="space-y-2">
              <span className="block font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#DFC278] font-normal tracking-wide">
                This Diwali
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
                Gift Happiness <br />
                <span className="gold-gradient-text drop-shadow-sm">
                  Gift Prosperity
                </span>
              </h1>
            </div>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-[#E7DFD3]/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Beautiful Gold & Silver-Plated decorative coins for your loved ones. 
              Minimalist mirror finish with zero deity engravings — universally cherished keepsakes for festive celebrations.
            </p>

            {/* Key Value Points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#DFC278]/90 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DFC278]" />
                <span>Decorative Metal Alloy</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DFC278]" />
                <span>Starts at ₹349</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DFC278]" />
                <span>Royal Velvet Box Included</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFC278] via-[#C6922B] to-[#B37F1D] text-[#2D060D] font-bold text-base shadow-lg shadow-[#000000]/30 hover:brightness-110 active:scale-95 transition-all group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#transparency"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#DFC278]/40 hover:border-[#DFC278] text-[#FDFBF7] font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all"
              >
                <span>View Quality & Specs</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Decorative frame background glow */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl p-2 bg-gradient-to-tr from-[#DFC278]/40 via-[#881B2E]/40 to-[#DFC278]/20 shadow-2xl">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner group">
                <Image
                  src="/images/hero-coins.jpg"
                  alt="ShubhCoins Gold & Silver Plated Coins in festive red velvet presentation gift box with glowing diyas"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle soft gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge on the image */}
                <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 bg-black/75 backdrop-blur-md rounded-lg py-2 px-3 border border-[#DFC278]/30 flex items-center justify-between text-xs text-white">
                  <span className="font-serif text-[#DFC278] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFC278]" />
                    Festive Presentation Box
                  </span>
                  <span className="text-[11px] text-[#FAF7F2]/80">
                    Pure Secular Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
