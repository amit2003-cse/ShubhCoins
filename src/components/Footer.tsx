"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, ShieldCheck, Truck } from "lucide-react";

export function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are the coins solid gold or silver bullion?",
      a: "No. In complete transparency, ShubhCoins sells decorative keepsake metal coins crafted with heavyweight zinc-brass alloy cores and finished in multi-layer 24K gold-tone and sterling silver-tone electroplating. They are intended for decorative gifting and ceremonial memories, not bullion investment.",
    },
    {
      q: "Do the coins have deity images or religious engravings?",
      a: "No. Our coins feature a clean, minimalist mirror polish face with reeded edges and zero deity engravings or religious figures. This makes them universally welcoming for all friends, family, and corporate recipients.",
    },
    {
      q: "What packaging is included?",
      a: "Each coin comes enclosed in a premium handcrafted royal velvet presentation gift box (crimson red for Gold coin, midnight blue for Silver coin) with protective acrylic coin casing and satin ribbon — ready for gifting.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer an easy 7-day hassle-free return and exchange policy. If your order arrives damaged or not as expected, simply contact our support team for a full refund or free replacement.",
    },
    {
      q: "Is Cash on Delivery (COD) available?",
      a: "Yes! Cash on Delivery is available across all serviceable pincodes in India alongside secure online payments powered by Razorpay (UPI, Cards, Net Banking).",
    },
  ];

  return (
    <footer id="faq" className="bg-[#2D060D] text-[#FAF8F5] pt-14 pb-10 border-t border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[11px] font-bold text-[#DFC278] tracking-widest uppercase">
              Help Center
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/70">
              Clear answers about materials, packaging, delivery, and returns.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:text-[#DFC278] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#DFC278] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#FAF8F5]/80 leading-relaxed border-t border-white/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/10 text-xs text-[#FAF8F5]/70">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl font-bold text-white">
                ShubhCoins
              </span>
              <span className="text-[10px] tracking-widest text-[#DFC278] uppercase">
                Gift Prosperity
              </span>
            </div>
            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed max-w-xs">
              Decorative keepsake metal coins designed for festive India. Secular beauty, transparent materials, and velvet gift packaging.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#DFC278]">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Festive Store</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li><Link href="/track-order" className="text-[#DFC278] hover:underline font-semibold flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /><span>Track Live Order</span></Link></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Gold Plated Coin (₹499)</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Silver Plated Coin (₹349)</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Brand Story</a></li>
              <li><a href="#transparency" className="hover:text-white transition-colors">Quality Standards</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Customer Policies
            </h4>
            <ul className="space-y-1.5">
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">7-Day Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Pan-India Express Shipping</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Help & Contact Desk</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFC278] shrink-0 mt-0.5" />
                <span>123, Main Street, Hyderabad, Telangana - 500001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFC278] shrink-0" />
                <a href="tel:+917488574616" className="hover:text-white transition-colors">
                  +91 74885 74616
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFC278] shrink-0" />
                <span>support@shubhcoins.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#FAF8F5]/50 text-center sm:text-left">
          <p>© 2026 ShubhCoins. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Razorpay Secured</span>
            <span>•</span>
            <span>UPI & Cards</span>
            <span>•</span>
            <span>COD Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
