"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, ShoppingBag, Eye, Check } from "lucide-react";

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
    <section id="collection" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
        <span className="text-[11px] font-bold tracking-widest text-[#9A7D3E] uppercase bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#EAE4D9]">
          The Core Collection
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0D17]">
          Our Collection
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6661] leading-relaxed">
          Clean, mirror-polished decorative keepsake coins with zero deity engravings. 
          Universal gifts designed to celebrate prosperity and warmth.
        </p>
      </div>

      {/* Responsive 2-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {products.map((product) => {
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              className="minimal-card bg-white rounded-3xl overflow-hidden border border-[#EAE4D9] flex flex-col justify-between"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square sm:aspect-[4/3] bg-[#FAF8F5] overflow-hidden cursor-pointer group"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} decorative metallic coin in gift box`}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#4A0D17] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </div>
                )}

                {/* Plain coin disclosure */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-lg">
                  Decorative metal • Non-solid
                </div>

                {/* Quick view button on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white text-[#4A0D17] text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817]">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-[#9A7D3E] italic">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-[#6B6661] leading-relaxed line-clamp-2 pt-1">
                    {product.description}
                  </p>
                </div>

                {/* Price and Actions Row */}
                <div className="pt-4 border-t border-[#F0EBE2] flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0D17]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#A8A29E] line-through font-normal">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock • Save 50%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => handleAdd(product, e)}
                      className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl border border-[#EAE4D9] text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "hover:bg-[#FAF8F5] text-[#4A0D17] hover:border-[#C5A869]"
                      }`}
                      title="Add to cart"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Add</span>
                        </>
                      )}
                    </button>

                    {/* View Details Link */}
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#E8D9B5] hover:bg-[#DFC278] active:scale-95 text-[#2D060D] text-xs sm:text-sm font-bold shadow-sm transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
