"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Check, Truck, RotateCcw, Award, ArrowRight } from "lucide-react";

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
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-3xl bg-[#FAF8F5] text-left shadow-2xl transition-all w-full max-w-2xl border border-[#EAE4D9]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-800 bg-white/80 rounded-full shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image Column */}
            <div className="relative bg-[#F5F2EB] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EAE4D9]">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#EAE4D9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-2 mt-3">
                <div className="w-10 h-10 rounded-lg border-2 border-[#C5A869] overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt="Thumbnail 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-lg border border-[#EAE4D9] overflow-hidden relative opacity-70">
                  <Image
                    src="/images/hero-coins.jpg"
                    alt="Thumbnail 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold mb-1.5">
                  ● Ready to Ship (In Stock)
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#6B6661] mt-0.5 font-medium">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="font-serif text-2xl font-bold text-[#4A0D17]">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-[#A8A29E] line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    Save 50%
                  </span>
                </div>

                {/* Features */}
                <div className="mt-4 space-y-2 text-xs text-[#4A4540]">
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>{product.finish === "gold" ? "24K Gold-Tone Mirror Finish" : "Sterling Silver-Tone Luster"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Royal Velvet Presentation Box Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Embossed Goddess Lakshmi on Lotus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Tamper-Proof Packaging</span>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-5 flex items-center gap-2.5">
                  <div className="flex items-center border border-[#EAE4D9] rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-500 hover:text-stone-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#1A1817]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#4A0D17] hover:bg-[#32080F] text-white active:scale-95"
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

              {/* Tabs */}
              <div className="border-t border-[#EAE4D9] pt-3">
                <div className="flex border-b border-[#EAE4D9] text-xs">
                  <button
                    onClick={() => setActiveTab("desc")}
                    className={`pb-1.5 font-bold transition-colors ${
                      activeTab === "desc"
                        ? "border-b-2 border-[#4A0D17] text-[#4A0D17]"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-1.5 ml-4 font-bold transition-colors ${
                      activeTab === "specs"
                        ? "border-b-2 border-[#4A0D17] text-[#4A0D17]"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    Specifications
                  </button>
                </div>

                <div className="pt-2 text-xs text-[#6B6661] leading-relaxed">
                  {activeTab === "desc" ? (
                    <p>{product.description}</p>
                  ) : (
                    <div className="space-y-1">
                      <p><strong>Diameter:</strong> {product.specifications.diameter}</p>
                      <p><strong>Thickness:</strong> {product.specifications.thickness}</p>
                      <p><strong>Core Metal:</strong> {product.specifications.coreMaterial}</p>
                      <p><strong>Finish:</strong> {product.specifications.finishType}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#F0EBE2] text-[10px] text-[#6B6661]">
                  <div className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 text-[#9A7D3E]" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#9A7D3E]" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0EBE2]">
                  <Link
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="w-full py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EBE2] border border-[#EAE4D9] text-[#4A0D17] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Dedicated Product Page & Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
