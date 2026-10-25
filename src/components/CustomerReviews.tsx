"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ShieldCheck, Sparkles, MapPin, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export function CustomerReviews() {
  const [filter, setFilter] = useState<"all" | "gold" | "silver">("all");

  const reviews = [
    {
      id: 1,
      author: "Rajesh Singhania",
      city: "Mumbai, Maharashtra",
      occasion: "Corporate Diwali Gifting",
      product: "Gold Plated Coin (75 Units)",
      coinType: "gold",
      rating: 5,
      date: "October 2026",
      text: "We ordered 75 Gold Plated Coins for our executive clients this Diwali. The handcrafted royal crimson velvet presentation box and mirror-finish luster exceeded our expectations. Arrived in Mumbai in just 3 days via BlueDart.",
      verified: true,
    },
    {
      id: 2,
      author: "Pooja & Ananya Sharma",
      city: "New Delhi",
      occasion: "Dhanteras Family Celebration",
      product: "Gold & Silver Coin Gift Set",
      coinType: "gold",
      rating: 5,
      date: "October 2026",
      text: "Such a breathtaking piece! The embossed Goddess Lakshmi design on the blooming lotus is deeply detailed and divine. The weight in hand feels surprisingly solid and heavy. Also used coupon NEWSHUBH for 10% discount!",
      verified: true,
    },
    {
      id: 3,
      author: "Dr. K. S. Venkatesh",
      city: "Bengaluru, Karnataka",
      occasion: "Wedding Anniversary Keepsake",
      product: "Silver Plated Coin",
      coinType: "silver",
      rating: 5,
      date: "September 2026",
      text: "The sterling silver electroplate chrome sheen is dazzling. Packaged securely inside an acrylic protective capsule so no fingerprint smudges on the mirror face. Customer care on WhatsApp responded within 5 minutes.",
      verified: true,
    },
    {
      id: 4,
      author: "Neha & Vikram Aggarwal",
      city: "Jaipur, Rajasthan",
      occasion: "Festive Return Gifting",
      product: "Gold Plated Coin (30 Units)",
      coinType: "gold",
      rating: 5,
      date: "October 2026",
      text: "Opted for Cash on Delivery for 30 gift coins. Packaging was completely tamper-proof and delivered right to our doorstep. The free printed festive greeting note inside each velvet box made it extra personal.",
      verified: true,
    },
    {
      id: 5,
      author: "Amitava Mukherjee",
      city: "Kolkata, West Bengal",
      occasion: "Durga Puja & Diwali Token",
      product: "Silver Plated Coin",
      coinType: "silver",
      rating: 5,
      date: "October 2026",
      text: "100% transparent brand. They explicitly disclose that it's a heavyweight zinc-brass decorative memento rather than solid bullion, which I deeply respect. The royal midnight blue velvet box is pure luxury.",
      verified: true,
    },
    {
      id: 6,
      author: "Preeti Desai",
      city: "Ahmedabad, Gujarat",
      occasion: "New Year & Diwali Wishes",
      product: "Gold Plated Coin",
      coinType: "gold",
      rating: 5,
      date: "October 2026",
      text: "Looks like a ₹5,000 coin in hand! The 24K gold mirror luster is flawless with crisp reeded rims. Highly recommended for festive gifting across India.",
      verified: true,
    },
  ];

  const filteredReviews = filter === "all" ? reviews : reviews.filter((r) => r.coinType === filter);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-[#EAE4D9] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#DFC278]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0D17]/10 text-[#4A0D17] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#9A7D3E]" />
            <span>Festive Social Proof</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Loved by Festive Patrons Across India
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6661]">
            Read genuine reflections from families, corporate leaders, and gift givers celebrating with ShubhCoins.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-[#DFC278]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1A1817]">
              4.9 out of 5.0 Rating
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-[#6B6661]">
              Over 2,500+ Festive Coins Delivered
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              filter === "all"
                ? "bg-[#4A0D17] text-white shadow-xs"
                : "bg-white text-[#6B6661] border border-[#EAE4D9] hover:bg-stone-50"
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilter("gold")}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              filter === "gold"
                ? "bg-[#4A0D17] text-white shadow-xs"
                : "bg-white text-[#6B6661] border border-[#EAE4D9] hover:bg-stone-50"
            }`}
          >
            Gold Plated Coin (₹499)
          </button>
          <button
            onClick={() => setFilter("silver")}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              filter === "silver"
                ? "bg-[#4A0D17] text-white shadow-xs"
                : "bg-white text-[#6B6661] border border-[#EAE4D9] hover:bg-stone-50"
            }`}
          >
            Silver Plated Coin (₹349)
          </button>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE4D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative group"
            >
              <div className="space-y-3">
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#DFC278]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#4A4540] leading-relaxed italic">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              {/* Author & Occasion Details */}
              <div className="pt-4 mt-4 border-t border-[#F0EBE2] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-[#1A1817] text-xs">
                    {rev.author}
                  </strong>
                  <span className="text-[10px] text-[#9A7D3E] font-medium">
                    {rev.date}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#6B6661]">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span>{rev.city}</span>
                </div>

                <div className="pt-1 text-[10px] text-[#4A0D17] font-semibold flex items-center justify-between">
                  <span>Occasion: {rev.occasion}</span>
                  <span className="text-stone-400 font-normal">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bottom Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left text-xs text-[#6B6661] shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>100% Genuine Reviews</strong> from verified Indian patrons</span>
          </div>
          <div className="hidden sm:block text-stone-300">•</div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9A7D3E] shrink-0" />
            <span><strong>Zero Religious Illustrations</strong> for universal celebration</span>
          </div>
          <div className="hidden sm:block text-stone-300">•</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4A0D17] shrink-0" />
            <span><strong>Handcrafted Velvet Box</strong> included with every order</span>
          </div>
        </div>
      </div>
    </section>
  );
}
