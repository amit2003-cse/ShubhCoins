"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldAlert, Scale, HelpCircle } from "lucide-react";

export default function TermsPage() {
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
            <Scale className="w-3.5 h-3.5 text-[#9A7D3E]" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6661]">
            Please read these terms carefully before placing an order on ShubhCoins.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-[#4A4540]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>1. Introduction & Acceptance</span>
            </h2>
            <p>
              Welcome to <strong>ShubhCoins (शुभ कॉइन्स)</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By accessing our website, browsing our product catalog, or placing an order, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </section>

          {/* Section 2: Material Disclosure (Critical for Truth in Advertising) */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2 text-[#4A0D17]">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>2. Product Nature & 100% Material Transparency</span>
            </h2>
            <div className="p-4 rounded-2xl bg-[#4A0D17]/5 border border-[#4A0D17]/20 space-y-2 text-xs">
              <p className="font-semibold text-[#1A1817]">
                Clear Truth-in-Advertising Disclosure:
              </p>
              <p>
                ShubhCoins manufactures and retails <strong>decorative keepsake metal tokens</strong> intended for festive memories, ceremonial gifting, Diwali/Dhanteras blessings, and corporate appreciation.
              </p>
              <p>
                Our coins are crafted with a <strong>heavyweight zinc-brass core alloy</strong> finished in multi-layer electroplated 24K gold-tone and sterling silver-tone polish. <strong>They are decorative gift mementos and NOT solid bullion coins or financial gold/silver investment assets.</strong>
              </p>
            </div>
          </section>

          {/* Section 3: Pricing & Payments */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>3. Pricing, Payments & Razorpay Integration</span>
            </h2>
            <p>
              All prices displayed on ShubhCoins are listed in <strong>Indian Rupees (INR ₹)</strong> and are inclusive of applicable GST taxes.
            </p>
            <p className="text-xs">
              We process secure online transactions through <strong>Razorpay Payment Solutions</strong>. We do not store, process, or view your banking credentials, UPI PINs, or credit/debit card numbers.
            </p>
          </section>

          {/* Section 4: Order Acceptance & Cancellation */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>4. Orders, Fulfillment & Cancellation</span>
            </h2>
            <p>
              Receipt of an order confirmation does not constitute our final acceptance; we reserve the right to decline or cancel orders due to logistical constraints, inaccurate pincode details, or unserviceable areas, in which case a 100% full refund is immediately issued.
            </p>
          </section>

          {/* Section 5: Governing Law */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>5. Governing Law & Jurisdiction</span>
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising in connection with transactions shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </section>

          {/* Contact Support */}
          <section className="pt-4 border-t border-[#EAE4D9] text-xs text-[#6B6661]">
            <p>
              Questions regarding these Terms? Contact us at <strong>legal@shubhcoins.in</strong> or phone <strong>+91 74885 74616</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
