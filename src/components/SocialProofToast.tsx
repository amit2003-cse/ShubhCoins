"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, X, Sparkles } from "lucide-react";

interface RecentPurchase {
  id: string;
  customerName: string;
  city: string;
  productName: string;
  timeAgo: string;
  image: string;
  units: number;
}

const RECENT_PURCHASES: RecentPurchase[] = [
  {
    id: "p1",
    customerName: "Priya Sharma",
    city: "Mumbai, MH",
    productName: "Gold Plated Decorative Coin (24K Finish)",
    timeAgo: "3 minutes ago",
    image: "/images/gold-coin.jpg",
    units: 2,
  },
  {
    id: "p2",
    customerName: "Rajesh Kulkarni",
    city: "Bengaluru, KA",
    productName: "Gold & Silver Festive Coin Pair",
    timeAgo: "6 minutes ago",
    image: "/images/hero-coins.jpg",
    units: 1,
  },
  {
    id: "p3",
    customerName: "Meenakshi Verma",
    city: "Jaipur, RJ",
    productName: "Silver Plated Keepsake Coin in Velvet Case",
    timeAgo: "9 minutes ago",
    image: "/images/silver-coin.jpg",
    units: 1,
  },
  {
    id: "p4",
    customerName: "Vikram Malhotra",
    city: "New Delhi, DL",
    productName: "Gold Plated Decorative Coin (Royal Crimson Box)",
    timeAgo: "14 minutes ago",
    image: "/images/gold-coin.jpg",
    units: 3,
  },
  {
    id: "p5",
    customerName: "Ananya Reddy",
    city: "Hyderabad, TS",
    productName: "Silver Plated Decorative Coin",
    timeAgo: "18 minutes ago",
    image: "/images/silver-coin.jpg",
    units: 2,
  },
  {
    id: "p6",
    customerName: "Saurabh Patel",
    city: "Ahmedabad, GJ",
    productName: "Gold Plated Festive Coin",
    timeAgo: "22 minutes ago",
    image: "/images/gold-coin.jpg",
    units: 1,
  },
];

export function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay of 4 seconds after page load before first popup
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible) {
      // Keep visible for 6 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);

        // Wait 10 seconds before showing the next purchase
        nextTimer = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
          setIsVisible(true);
        }, 10000);
      }, 6000);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, isDismissed, isPaused]);

  if (isDismissed) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <aside
      aria-label="Recent buyer activity"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[340px] sm:max-w-[360px] w-full transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EAE4D9] shadow-xl hover:shadow-2xl transition-all text-[#1A1817]">
        {/* Dismiss Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="absolute top-2.5 right-2.5 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3">
          {/* Product Thumbnail */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#EAE4D9] bg-stone-100 shrink-0">
            <Image
              src={current.image}
              alt={current.productName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 text-[11px] text-[#6B6661]">
              <span className="font-bold text-[#1A1817] truncate">
                {current.customerName}
              </span>
              <span>•</span>
              <span className="truncate">{current.city}</span>
            </div>

            <p className="text-xs font-semibold text-[#4A0D17] truncate mt-0.5 leading-snug">
              Purchased {current.units > 1 ? `${current.units}× ` : ""}
              {current.productName}
            </p>

            <div className="flex items-center justify-between text-[10px] text-[#6B6661] mt-1 pt-1 border-t border-stone-100">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Verified Festive Buyer</span>
              </span>
              <span className="text-stone-400 font-mono">{current.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
