"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { Product, CartItem } from "@/types";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { FestiveBanner } from "@/components/FestiveBanner";
import { BrandStory } from "@/components/BrandStory";
import { GiftingOccasions } from "@/components/GiftingOccasions";
import { MaterialTransparency } from "@/components/MaterialTransparency";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { SearchModal } from "@/components/SearchModal";
import { CheckoutModal } from "@/components/CheckoutModal";

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 item preloaded (or empty) to match the screenshots feel
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>(null);

  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NEWSHUBH" || clean === "SHUBH2024") {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      return {
        success: true,
        message: "Code NEWSHUBH applied! 10% festive discount activated.",
      };
    }
    return {
      success: false,
      message: "Invalid code. Use code NEWSHUBH to get 10% off!",
    };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discountPercent / 100))
    : 0;
  const shipping = subtotal > 0 ? 50 : 0;
  const totalAmount = subtotal > 0 ? Math.max(0, subtotal - discountAmount + shipping) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header with Navigation & Icons */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Section with Festive Atmosphere */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById("collection");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 4. Trust Strip (4 Core Badges) */}
        <TrustStrip />

        {/* 5. Featured Collection (Gold & Silver Product Cards) */}
        <FeaturedCollection
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* 6. Festive Celebration Banner */}
        <FestiveBanner />

        {/* 7. Brand Story & Heritage */}
        <BrandStory />

        {/* 8. Gifting Occasions Grid */}
        <GiftingOccasions />

        {/* 9. Product Quality & Material Transparency */}
        <MaterialTransparency />

        {/* 10. Verified Customer Reviews & Testimonials */}
        <CustomerReviews />
      </main>

      {/* 11. Comprehensive Footer */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Detail / Quick View Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => handleAddToCart(product, quantity)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        totalAmount={totalAmount}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon?.code}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
