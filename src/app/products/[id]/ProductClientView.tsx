"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, CartItem } from "@/types";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { SearchModal } from "@/components/SearchModal";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  CheckCircle2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Gift,
  Star,
  Info,
} from "lucide-react";

interface ProductClientViewProps {
  product: Product;
  allProducts: Product[];
}

export function ProductClientView({
  product,
  allProducts,
}: ProductClientViewProps) {
  const { user, requireAuth } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: product, quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>({ code: "NEWSHUBH", discountPercent: 10 });

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

  const handleAddToCart = (prod: Product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === prod.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: prod, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!user) {
      requireAuth(() => {
        setCartItems([{ product, quantity }]);
        setIsCheckoutOpen(true);
      }, "Please sign in with Google to complete your purchase.");
    } else {
      setCartItems([{ product, quantity }]);
      setIsCheckoutOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = appliedCoupon
    ? Math.round(subtotal * (appliedCoupon.discountPercent / 100))
    : 0;
  const shipping = subtotal > 0 ? (subtotal >= 650 ? 0 : 50) : 0;
  const totalAmount = subtotal > 0 ? Math.max(0, subtotal - discountAmount + shipping) : 0;

  const otherProduct = allProducts.find((p) => p.id !== product.id);

  const shareText = encodeURIComponent(
    `Check out the ${product.name} on ShubhCoins! Beautiful decorative keepsake coin with velvet gift box: https://shubhcoins.in/products/${product.id}`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1817]">
      <AnnouncementBar />

      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B6661]">
            <Link href="/" className="hover:text-[#4A0D17]">
              Home
            </Link>
            <span>/</span>
            <Link href="/#collection" className="hover:text-[#4A0D17]">
              Collection
            </Link>
            <span>/</span>
            <span className="text-[#1A1817] font-semibold">{product.name}</span>
          </nav>

          {/* Main 2-Column Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left Column: Visual Showcase */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#EAE4D9] shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4A0D17] text-[#DFC278] shadow-md">
                    {product.badge || "Festive Favorite"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                    50% Festive Discount
                  </span>
                </div>
              </div>

              {/* Velvet Box Included Highlight */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE4D9] flex items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A0D17]/10 text-[#4A0D17] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-[#9A7D3E]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1817]">
                      Royal Velvet Gift Box Included
                    </h4>
                    <p className="text-[11px] text-[#6B6661]">
                      {product.finish === "gold"
                        ? "Handcrafted Royal Crimson Red Velvet Presentation Case with satin pull ribbon."
                        : "Handcrafted Royal Midnight Blue Velvet Case with protective acrylic capsule."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share On WhatsApp Action */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[#25D366] hover:underline"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share this coin with friends on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Information & Buying Actions */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#DFC278]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1A1817]">
                    4.9 / 5
                  </span>
                  <span className="text-xs text-[#6B6661]">• 340+ Festive Patrons</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
                  {product.name}
                </h1>
                <p className="text-xs font-semibold text-[#9A7D3E] uppercase tracking-wider">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Savings */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE4D9] space-y-2 shadow-xs">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#4A0D17]">
                    ₹{product.price}
                  </span>
                  <span className="text-base text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    50% Off Diwali Special
                  </span>
                </div>

                <div className="pt-2 border-t border-[#F0EBE2] flex items-center justify-between text-xs text-[#6B6661]">
                  <span>GST Included • Free Handcrafted Gift Packaging</span>
                  <span className="font-bold text-emerald-700">In Stock (Pan-India Ready)</span>
                </div>
              </div>

              {/* Promo Code Notification */}
              <div className="p-3 bg-[#4A0D17]/5 rounded-xl border border-[#4A0D17]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9A7D3E]" />
                  <span>
                    Use code <strong className="font-mono text-[#4A0D17]">NEWSHUBH</strong> at checkout for extra 10% discount!
                  </span>
                </div>
                <strong className="text-[#4A0D17]">Save ₹{Math.round(product.price * 0.10)}</strong>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#1A1817]">Quantity:</span>
                  <div className="flex items-center border border-[#EAE4D9] rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-500 hover:text-stone-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-xs font-bold text-[#1A1817]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-stone-500 hover:text-stone-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleAddToCart(product, quantity)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white border-2 border-[#4A0D17] text-[#4A0D17] hover:bg-[#4A0D17]/5 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#4A0D17] hover:bg-[#32080F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EAE4D9] text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] space-y-1">
                  <Truck className="w-4 h-4 text-[#9A7D3E]" />
                  <strong className="block text-[11px] text-[#1A1817]">Pan-India Delivery</strong>
                  <p className="text-[10px] text-[#6B6661]">3-5 Days via BlueDart</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] space-y-1">
                  <ShieldCheck className="w-4 h-4 text-[#9A7D3E]" />
                  <strong className="block text-[11px] text-[#1A1817]">Cash on Delivery</strong>
                  <p className="text-[10px] text-[#6B6661]">Pay at Doorstep</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EAE4D9] space-y-1">
                  <RotateCcw className="w-4 h-4 text-[#9A7D3E]" />
                  <strong className="block text-[11px] text-[#1A1817]">7-Day Returns</strong>
                  <p className="text-[10px] text-[#6B6661]">Hassle-Free Replacement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Technical Specifications Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#9A7D3E] uppercase tracking-wider">
                Full Transparency
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                Coin Specifications & Material Report
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Diameter</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.diameter}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Thickness</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.thickness}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Luster Finish</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.finishType}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Core Metal Core</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.coreMaterial}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Face Design</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.engraving}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <span className="text-[#6B6661] text-[11px]">Gift Presentation Box</span>
                <p className="font-bold text-[#1A1817] text-sm">{product.specifications.packaging}</p>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="p-4 rounded-2xl bg-[#4A0D17]/5 border border-[#4A0D17]/20 flex items-start gap-3 text-xs text-[#4A4540]">
              <Info className="w-4 h-4 text-[#9A7D3E] shrink-0 mt-0.5" />
              <p>
                <strong>Disclosure for Gifting Integrity:</strong> ShubhCoins specializes in decorative keepsake tokens. These coins are crafted from a solid heavyweight metal alloy core with multi-layer electroplated finishes. They are intended for festive celebrations, memories, and corporate tokens, not bullion investment.
              </p>
            </div>
          </div>

          {/* Related / Other Coin Suggestion */}
          {otherProduct && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4A0D17] to-[#2D060D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-[#DFC278] uppercase tracking-wider">
                  Complete Your Festive Set
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold">
                  Pair with {otherProduct.name} (₹{otherProduct.price})
                </h4>
                <p className="text-xs text-white/80 max-w-md">
                  Many patrons gift a dual pair of Gold & Silver coins enclosed in their respective crimson and navy velvet cases.
                </p>
              </div>

              <Link
                href={`/products/${otherProduct.id}`}
                className="px-6 py-3 rounded-xl bg-[#DFC278] hover:bg-[#c9a756] text-[#4A0D17] font-bold text-xs shrink-0 shadow-md transition-colors"
              >
                View {otherProduct.name} →
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Cart Drawer */}
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
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty || 1)}
        onCheckout={() => {
          if (!user) {
            requireAuth(() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }, "Please sign in with Google to proceed with checkout.");
          } else {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={allProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
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
