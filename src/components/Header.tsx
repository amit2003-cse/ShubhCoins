"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export function Header({ cartCount, onOpenCart, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EDE7DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Lotus Motif matching screenshot */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#DFC278] via-[#C6922B] to-[#996515] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#4A0D17] flex items-center justify-center text-[#DFC278]">
                {/* Custom SVG Lotus Icon */}
                <svg
                  className="w-6 h-6 fill-current text-[#E8C97E]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C12 2 13.5 6.5 15.5 8C17.5 9.5 21 9.5 21 9.5C21 9.5 18 12.5 17 15C16 17.5 16 21 16 21C16 21 13.5 18.5 12 18.5C10.5 18.5 8 21 8 21C8 21 8 17.5 7 15C6 12.5 3 9.5 3 9.5C3 9.5 6.5 9.5 8.5 8C10.5 6.5 12 2 12 2Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#4A0D17] leading-none">
                ShubhCoins
              </span>
              <span className="text-[11px] font-medium tracking-widest text-[#C6922B] uppercase mt-0.5">
                Gift Prosperity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#1C1917]/80">
            <Link
              href="/"
              className="text-[#4A0D17] font-semibold border-b-2 border-[#C6922B] pb-1 transition-colors"
            >
              Home
            </Link>
            <a
              href="#collection"
              className="hover:text-[#4A0D17] transition-colors pb-1"
            >
              Shop
            </a>
            <a
              href="#story"
              className="hover:text-[#4A0D17] transition-colors pb-1"
            >
              About
            </a>
            <a
              href="#faq"
              className="hover:text-[#4A0D17] transition-colors pb-1"
            >
              Help
            </a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4A0D17] hover:text-[#C6922B] hover:bg-[#F5F0E6] rounded-full transition-all"
              aria-label="Search coins"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile / Account Icon */}
            <a
              href="#account"
              className="p-2 text-[#4A0D17] hover:text-[#C6922B] hover:bg-[#F5F0E6] rounded-full transition-all"
              aria-label="My Account"
              title="Account"
            >
              <User className="w-5 h-5" />
            </a>

            {/* Cart Icon with Counter Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#4A0D17] hover:text-[#C6922B] hover:bg-[#F5F0E6] rounded-full transition-all"
              aria-label={`Cart with ${cartCount} items`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-[#881B2E] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A0D17] hover:bg-[#F5F0E6] rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EDE7DC] space-y-2 bg-[#FDFBF7]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 font-medium text-[#4A0D17] bg-[#F5F0E6] rounded-lg"
            >
              Home
            </Link>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 font-medium text-[#1C1917]/80 hover:text-[#4A0D17] hover:bg-[#F5F0E6] rounded-lg"
            >
              Shop Collection
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 font-medium text-[#1C1917]/80 hover:text-[#4A0D17] hover:bg-[#F5F0E6] rounded-lg"
            >
              Our Story
            </a>
            <a
              href="#transparency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 font-medium text-[#1C1917]/80 hover:text-[#4A0D17] hover:bg-[#F5F0E6] rounded-lg"
            >
              Material Transparency
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 font-medium text-[#1C1917]/80 hover:text-[#4A0D17] hover:bg-[#F5F0E6] rounded-lg"
            >
              Help & FAQ
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
