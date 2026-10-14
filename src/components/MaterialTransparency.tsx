"use client";

import React from "react";
import { Check, ShieldCheck, Info } from "lucide-react";

export function MaterialTransparency() {
  const specs = [
    {
      feature: "Core Metal Composition",
      detail: "Heavyweight Zinc & Brass Alloy",
      note: "Substantial, solid palm feel. Explicitly NOT solid gold or solid silver bullion.",
    },
    {
      feature: "Surface Electroplating",
      detail: "24K Gold-Tone & Sterling Silver-Tone Luster",
      note: "Multi-layer high-durability electroplated finish engineered for brilliance and tarnish resistance.",
    },
    {
      feature: "Face & Design Motif",
      detail: "Clean Minimalist Mirror Polish",
      note: "Plain reflective surface with reeded rim. Zero deity figures, religious illustrations, or facial engravings.",
    },
    {
      feature: "Diameter & Thickness",
      detail: "32 mm Diameter • 2.5 mm Thickness",
      note: "Substantial commemorative size designed to fit perfectly in celebratory trays and gift cases.",
    },
    {
      feature: "Packaging",
      detail: "Royal Velvet Hardcase Box Included",
      note: "Includes fitted velvet interior slot, satin inner ribbon, and protective acrylic casing for each coin.",
    },
  ];

  return (
    <section id="transparency" className="py-14 sm:py-20 border-t border-[#EAE4D9] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE4D9] text-[#4A0D17] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
            <span>Honest & Transparent Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
            Material Transparency & Quality
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6661] leading-relaxed">
            We believe in complete openness. Our products are decorative celebration keepsakes, 
            crafted to deliver the beauty of gold and silver without misleading bullion claims.
          </p>
        </div>

        {/* Clean Minimalist Disclosure Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#EAE4D9] shadow-sm overflow-hidden">
          {/* Top Notice */}
          <div className="bg-[#4A0D17] text-[#FAF8F5] p-4 sm:p-5 flex items-start sm:items-center gap-3">
            <Info className="w-5 h-5 text-[#DFC278] shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#FAF8F5]/90 leading-relaxed">
              <strong className="text-[#DFC278]">Clear Disclosure:</strong> ShubhCoins sells decorative metal keepsake coins with gold-colour (₹499) and silver-colour (₹349) finishes. These are decorative festive mementos and are not solid bullion or investment gold/silver coins.
            </p>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F0EBE2]">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-6 hover:bg-[#FAF8F5]/60 transition-colors"
              >
                <div className="md:col-span-4 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-[#1A1817]">
                    {spec.feature}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#4A0D17]">
                    {spec.detail}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="text-xs text-[#6B6661] leading-relaxed">
                    {spec.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
