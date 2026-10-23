"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, ShieldCheck, MapPin, AlertCircle, HelpCircle } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] py-8 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EAE4D9] mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A0D17] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to ShubhCoins Store</span>
          </Link>
          <span className="font-serif text-lg font-bold text-[#4A0D17]">
            ShubhCoins
          </span>
        </div>

        {/* Header */}
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0D17]/10 text-[#4A0D17] text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-[#9A7D3E]" />
            <span>Customer Logistics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6661]">
            Last updated: October 2026 • Insured Pan-India Festive Delivery
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-[#4A4540]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>1. Pan-India Delivery Timelines</span>
            </h2>
            <p>
              At <strong>ShubhCoins</strong>, we understand the importance of timely delivery for festive celebrations like Diwali, Dhanteras, weddings, and corporate milestones. All confirmed orders are dispatched from our central fulfillment facility in <strong>Hyderabad, Telangana</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9]">
                <strong className="block text-[#1A1817] font-semibold mb-1">
                  Metro & Tier-1 Cities
                </strong>
                <p className="text-xs text-[#6B6661]">
                  Estimated delivery in <strong>2 to 4 business days</strong> (Delhi-NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9]">
                <strong className="block text-[#1A1817] font-semibold mb-1">
                  Rest of India
                </strong>
                <p className="text-xs text-[#6B6661]">
                  Estimated delivery in <strong>3 to 5 business days</strong> across all serviceable pin codes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>2. Courier & Logistics Partners</span>
            </h2>
            <p>
              To ensure safety and speed, we partner exclusively with India’s leading express logistics providers:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>BlueDart Express</strong> (Air Express for expedited delivery)</li>
              <li><strong>Delhivery</strong> (Pan-India surface & air connectivity)</li>
              <li><strong>DTDC Premium</strong> (Specialized regional coverage)</li>
            </ul>
            <p className="text-xs text-[#6B6661]">
              Every shipment travels in a <strong>tamper-evident, sealed security polybag</strong> to ensure that your royal velvet gift box and coin arrive in pristine condition.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>3. Shipping Charges & Cash on Delivery (COD)</span>
            </h2>
            <div className="space-y-2 text-xs">
              <p>
                • <strong>Standard Shipping:</strong> Flat nominal fee of <strong>₹50</strong> per order across India, regardless of quantity.
              </p>
              <p>
                • <strong>Free Shipping:</strong> Applicable on promotional festive codes (e.g. <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono font-bold text-[#4A0D17]">SHUBH2024</code>) or orders containing 2 or more coin boxes.
              </p>
              <p>
                • <strong>Cash on Delivery (COD):</strong> COD is available across most Indian postal PIN codes without additional convenience surcharges.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>4. Live Tracking & SMS Notifications</span>
            </h2>
            <p>
              Once your order is packed and dispatched, you will receive an automatic SMS and email containing the Courier Tracking Number (AWB) and a direct link. You can also track your order anytime on our dedicated tracking portal:
            </p>
            <div className="pt-1">
              <Link
                href="/track-order"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A0D17] hover:underline"
              >
                <span>Track Your Live Shipment on ShubhCoins →</span>
              </Link>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>5. Delivery Queries & Address Changes</span>
            </h2>
            <p>
              Need to modify your delivery address or request express festive dispatch? Contact our shipping desk immediately:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p><strong>WhatsApp Support:</strong> +91 74885 74616 (10 AM - 8 PM IST)</p>
                <p><strong>Email:</strong> support@shubhcoins.in</p>
              </div>
              <a
                href="https://wa.me/917488574616?text=Hi%20ShubhCoins%20Support%2C%20I%20have%20a%20shipping%20query."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#1eb355] transition-colors shrink-0"
              >
                Chat on WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
