"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { ArrowRight, ShoppingBag, Eye, Check, Sparkles } from "lucide-react";

interface FeaturedCollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function FeaturedCollection({
  products,
  onSelectProduct,
  onAddToCart,
}: FeaturedCollectionProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="collection" className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EED3] text-[#996515] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Festive Editions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17] tracking-tight">
            Our Collection
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Minimalist, plain mirror-finish decorative coins in luxury gift cases. 
            Designed with zero deity engravings for versatile and auspicious Indian festive gifting.
          </p>
        </div>

        {/* Product Cards Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {products.map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EDE7DC] shadow-sm hover:shadow-xl hover:border-[#DFC278]/60 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square sm:aspect-[4/3] bg-[#FAF7F2] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} decorative metallic coin in velvet presentation box`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#881B2E] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm tracking-wide">
                      {product.badge}
                    </div>
                  )}

                  {/* Disclosure Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white/90 text-[11px] px-2.5 py-1 rounded-md">
                    Non-solid decorative finish
                  </div>

                  {/* Hover Quick Action overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-3 bg-white text-[#4A0D17] rounded-full shadow-lg hover:bg-[#DFC278] transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#4A0D17] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-[#78716C] italic">
                      {product.tagline}
                    </p>
                    <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-[#EDE7DC] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-[#881B2E] font-serif">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-[#A8A29E] line-through font-normal">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        50% Off • In Stock
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Direct Add to Cart */}
                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-[#EDE7DC] text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "hover:bg-[#FAF7F2] text-[#4A0D17] hover:border-[#DFC278]"
                        }`}
                        title="Add to cart"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                          </>
                        )}
                      </button>

                      {/* View Details Button matching Screenshot */}
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#E8C97E] hover:bg-[#DFC278] active:scale-95 text-[#30060D] text-xs sm:text-sm font-bold shadow-sm transition-all"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
