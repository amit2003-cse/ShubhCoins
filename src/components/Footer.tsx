"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

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
    <footer id="faq" className="bg-[#2D060D] text-[#E7DFD3] pt-16 pb-12 border-t border-[#DFC278]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold text-[#DFC278] tracking-widest uppercase">
              Got Questions?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#E7DFD3]/80">
              Clear answers about our materials, gifting boxes, shipping, and returns.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-[#DFC278] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#DFC278] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#E7DFD3]/90 leading-relaxed border-t border-white/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand & Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-10 border-t border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFC278] to-[#996515] p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-[#4A0D17] flex items-center justify-center text-[#DFC278]">
                  <svg
                    className="w-5 h-5 fill-current text-[#DFC278]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C12 2 13.5 6.5 15.5 8C17.5 9.5 21 9.5 21 9.5C21 9.5 18 12.5 17 15C16 17.5 16 21 16 21C16 21 13.5 18.5 12 18.5C10.5 18.5 8 21 8 21C8 21 8 17.5 7 15C6 12.5 3 9.5 3 9.5C3 9.5 6.5 9.5 8.5 8C10.5 6.5 12 2 12 2Z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  ShubhCoins
                </span>
                <span className="text-[10px] tracking-widest text-[#DFC278] uppercase">
                  Gift Prosperity
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E7DFD3]/80 leading-relaxed max-w-sm">
              ShubhCoins is India’s dedicated destination for premium decorative metal coins. 
              Celebrating festive traditions with pure craftsmanship, transparent materials, and elegant velvet gift packaging.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#DFC278]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Gifting Experience</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#E7DFD3]/80">
              <li>
                <a href="#collection" className="hover:text-[#DFC278] transition-colors">
                  Shop Collection
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#DFC278] transition-colors">
                  Gold Plated Coin (₹499)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#DFC278] transition-colors">
                  Silver Plated Coin (₹349)
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#DFC278] transition-colors">
                  About Our Brand
                </a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-[#DFC278] transition-colors">
                  Material Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Policies & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#E7DFD3]/80">
              <li>
                <a href="#faq" className="hover:text-[#DFC278] transition-colors">
                  7-Day Return Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#DFC278] transition-colors">
                  Shipping & Pan-India Delivery
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#DFC278] transition-colors">
                  Cash on Delivery (COD)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#DFC278] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#DFC278] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Placeholders matching screenshot address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#E7DFD3]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFC278] shrink-0 mt-0.5" />
                <span>123, Main Street, Hyderabad, Telangana - 500001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DFC278] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFC278] shrink-0" />
                <span>support@shubhcoins.in</span>
              </div>
              <div className="pt-2 text-[11px] text-white/60">
                Mon - Sat: 10:00 AM – 7:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Copyright Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7DFD3]/60 text-center sm:text-left">
          <p>© 2026 ShubhCoins. All rights reserved. Built with pride for festive India.</p>

          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] text-[#DFC278]">
              Razorpay Secured
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] text-white">
              UPI • Cards • NetBanking
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded text-[11px] text-white">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
