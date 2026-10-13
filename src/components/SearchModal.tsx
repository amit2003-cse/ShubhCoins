"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-6 sm:pt-20">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-[#EDE7DC] overflow-hidden text-left z-10">
          <div className="p-4 border-b border-[#EDE7DC] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#996515]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Gold Plated Coin, Silver Plated Coin, Gifting..."
              className="w-full bg-transparent border-none outline-none text-sm text-[#1C1917] placeholder:text-[#A8A29E]"
            />
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto divide-y divide-[#EDE7DC]">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#78716C]">
                No items found for &quot;{query}&quot;. Try searching for &quot;Gold&quot; or &quot;Silver&quot;.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#1C1917]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#881B2E] font-bold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
