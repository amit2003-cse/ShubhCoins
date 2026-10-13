"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Check, Truck, RotateCcw, Award } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc");
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container matching Screen 3 in screenshot */}
        <div className="relative transform overflow-hidden rounded-3xl bg-[#FDFBF7] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-[#EDE7DC]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-800 bg-white/80 rounded-full shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image Column */}
            <div className="relative bg-[#FAF7F2] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EDE7DC]">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-[#EDE7DC]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Gallery indicators */}
              <div className="flex gap-2 mt-4">
                <div className="w-12 h-12 rounded-lg border-2 border-[#C6922B] overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt="Thumbnail 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-12 h-12 rounded-lg border border-[#EDE7DC] overflow-hidden relative opacity-75">
                  <Image
                    src="/images/hero-coins.jpg"
                    alt="Thumbnail 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                  ● In Stock (Ready to Ship)
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#78716C] mt-1 font-medium">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-serif text-3xl font-bold text-[#881B2E]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-[#A8A29E] line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    Save 50%
                  </span>
                </div>

                {/* Bullet Highlights matching screen 3 */}
                <div className="mt-5 space-y-2.5 text-xs text-[#44403C]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C6922B]" />
                    <span>{product.finish === "gold" ? "24K Gold-Tone Mirror Plating" : "Sterling Silver-Tone Luster"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C6922B]" />
                    <span>Premium Velvet Gift Box Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C6922B]" />
                    <span>Plain Mirror Face — Zero Deity Engravings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C6922B]" />
                    <span>Secure Packaging & Tamper-Proof Seal</span>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center border border-[#EDE7DC] rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-stone-500 hover:text-stone-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-[#1C1917]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#881B2E] hover:bg-[#661220] text-white active:scale-95"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart • ₹{product.price * quantity}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs: Description vs Specifications */}
              <div className="border-t border-[#EDE7DC] pt-4">
                <div className="flex border-b border-[#EDE7DC]">
                  <button
                    onClick={() => setActiveTab("desc")}
                    className={`pb-2 text-xs font-bold transition-colors ${
                      activeTab === "desc"
                        ? "border-b-2 border-[#881B2E] text-[#881B2E]"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-2 ml-6 text-xs font-bold transition-colors ${
                      activeTab === "specs"
                        ? "border-b-2 border-[#881B2E] text-[#881B2E]"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Specifications
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#57534E] leading-relaxed">
                  {activeTab === "desc" ? (
                    <p>{product.description}</p>
                  ) : (
                    <div className="space-y-1.5">
                      <p><strong>Diameter:</strong> {product.specifications.diameter}</p>
                      <p><strong>Thickness:</strong> {product.specifications.thickness}</p>
                      <p><strong>Core Metal:</strong> {product.specifications.coreMaterial}</p>
                      <p><strong>Finish:</strong> {product.specifications.finishType}</p>
                      <p><strong>Engraving:</strong> {product.specifications.engraving}</p>
                    </div>
                  )}
                </div>

                {/* Trust mini-strip at bottom */}
                <div className="grid grid-cols-2 gap-2 pt-4 mt-2 border-t border-[#EDE7DC]/60 text-[11px] text-[#78716C]">
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#C6922B]" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C6922B]" />
                    <span>Cash on Delivery Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
