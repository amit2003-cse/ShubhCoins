"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export function Header({ cartCount, onOpenCart, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE4D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo with Lotus Motif */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#C5A869] to-[#E8D9B5] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#4A0D17] flex items-center justify-center text-[#DFC278]">
                <svg
                  className="w-5 h-5 fill-current text-[#DFC278]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C12 2 13.5 6.5 15.5 8C17.5 9.5 21 9.5 21 9.5C21 9.5 18 12.5 17 15C16 17.5 16 21 16 21C16 21 13.5 18.5 12 18.5C10.5 18.5 8 21 8 21C8 21 8 17.5 7 15C6 12.5 3 9.5 3 9.5C3 9.5 6.5 9.5 8.5 8C10.5 6.5 12 2 12 2Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#4A0D17] leading-none">
                ShubhCoins
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#9A7D3E] uppercase mt-0.5">
                Gift Prosperity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#4A4540]">
            <Link
              href="/"
              className="text-[#4A0D17] font-semibold hover:text-[#4A0D17] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4A0D17]"
            >
              Home
            </Link>
            <a
              href="#collection"
              className="hover:text-[#4A0D17] transition-colors relative py-1"
            >
              Collection
            </a>
            <a
              href="#story"
              className="hover:text-[#4A0D17] transition-colors relative py-1"
            >
              Our Story
            </a>
            <a
              href="#transparency"
              className="hover:text-[#4A0D17] transition-colors relative py-1"
            >
              Quality & Specs
            </a>
            <a
              href="#faq"
              className="hover:text-[#4A0D17] transition-colors relative py-1"
            >
              Help & FAQ
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 text-[#4A0D17] hover:bg-[#F0EBE2] rounded-full transition-colors"
              aria-label="Search coins"
              title="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Profile / Account with Google avatar */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 text-[#4A0D17] hover:bg-[#F0EBE2] rounded-full transition-colors"
              aria-label="Account"
              title={user ? `Signed in as ${user.name}` : "Sign In with Google"}
            >
              {user?.picture ? (
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#C5A869]">
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : user ? (
                <div className="w-7 h-7 rounded-full bg-[#4A0D17] text-[#DFC278] flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
              {user && (
                <span className="hidden lg:inline text-xs font-semibold text-[#1A1817]">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </button>

            {/* Cart Trigger with Pill badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 text-[#4A0D17] hover:bg-[#F0EBE2] rounded-full transition-colors"
              aria-label={`Cart with ${cartCount} items`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-[#4A0D17] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A0D17] hover:bg-[#F0EBE2] rounded-lg ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Minimalist Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EAE4D9] bg-[#FAF8F5] space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 font-semibold text-sm text-[#4A0D17] bg-[#F0EBE2] rounded-xl"
            >
              <span>Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 font-medium text-sm text-[#4A4540] hover:bg-[#F0EBE2] rounded-xl"
            >
              <span>Our Collection</span>
              <span className="text-xs text-[#9A7D3E]">₹349 & ₹499</span>
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 font-medium text-sm text-[#4A4540] hover:bg-[#F0EBE2] rounded-xl"
            >
              Brand Heritage
            </a>
            <a
              href="#transparency"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 font-medium text-sm text-[#4A4540] hover:bg-[#F0EBE2] rounded-xl"
            >
              Material Transparency
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 font-medium text-sm text-[#4A4540] hover:bg-[#F0EBE2] rounded-xl"
            >
              Help & FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 font-medium text-sm text-[#4A0D17] hover:bg-[#F0EBE2] rounded-xl text-left"
            >
              <span>{user ? `Account: ${user.name}` : "Sign In with Google"}</span>
              <span className="text-xs text-[#9A7D3E]">{user ? "Profile" : "Sign In"}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
