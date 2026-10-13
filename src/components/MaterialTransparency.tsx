"use client";

import React from "react";
import { Check, ShieldCheck, Info, Sparkles } from "lucide-react";

export function MaterialTransparency() {
  const specs = [
    {
      feature: "Core Metal Composition",
      detail: "Heavyweight Zinc & Brass Alloy",
      note: "Provides a substantial, luxurious weight in the palm. NOT solid gold or solid silver bullion.",
    },
    {
      feature: "Surface Electroplating",
      detail: "Multi-Layer Gold-Tone & Silver-Tone Luster",
      note: "High-grade decorative electroplated coating engineered for brilliance and tarnish resistance.",
    },
    {
      feature: "Face & Design Motif",
      detail: "Clean Minimalist Mirror Polish",
      note: "Plain reflective surface with ridged rim. Strictly NO deity figures, religious illustrations, or facial engravings.",
    },
    {
      feature: "Coin Diameter & Thickness",
      detail: "32 mm Diameter • 2.5 mm Thickness",
      note: "Substantial standard commemorative size designed to fit perfectly in ceremonial trays and gift boxes.",
    },
    {
      feature: "Presentation Packaging",
      detail: "Custom Royal Velvet Hardcase Box",
      note: "Includes plush fitted interior slot, satin inner ribbon, and protective acrylic casing for the coin.",
    },
  ];

  return (
    <section id="transparency" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EDE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE9DB] text-[#4A0D17] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C6922B]" />
            <span>Honest & Transparent Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
            Material Transparency & Quality
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            We believe in complete openness. Our products are decorative celebration keepsakes, 
            crafted to deliver the beauty of gold and silver without misleading bullion claims.
          </p>
        </div>

        {/* Informative Table and Cards */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#EDE7DC] shadow-sm overflow-hidden">
          {/* Top Banner Notice */}
          <div className="bg-[#4A0D17] text-[#FAF7F2] p-4 sm:p-5 flex items-start sm:items-center gap-3">
            <Info className="w-5 h-5 text-[#DFC278] shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#E7DFD3] leading-relaxed">
              <strong className="text-[#DFC278]">Clear Disclosure:</strong> ShubhCoins sells decorative metal keepsake coins with gold-colour (₹499) and silver-colour (₹349) finishes. These are decorative festive mementos and are not solid bullion or investment gold/silver coins.
            </p>
          </div>

          {/* Specification Rows */}
          <div className="divide-y divide-[#EDE7DC]">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 hover:bg-[#FAF7F2]/60 transition-colors"
              >
                <div className="md:col-span-4 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-sm text-[#1C1917]">
                    {spec.feature}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="font-serif font-bold text-sm text-[#4A0D17]">
                    {spec.detail}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="text-xs text-[#57534E] leading-relaxed">
                    {spec.note}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Callout */}
          <div className="p-5 bg-[#FAF7F2] border-t border-[#EDE7DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <Sparkles className="w-4 h-4 text-[#C6922B]" />
              <span>Complies with full consumer clarity and honest e-commerce standards</span>
            </div>
            <a
              href="#collection"
              className="px-5 py-2 rounded-xl bg-[#4A0D17] hover:bg-[#360810] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Order With Confidence
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
