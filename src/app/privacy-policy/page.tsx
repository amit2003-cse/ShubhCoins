"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, HelpCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Lock className="w-3.5 h-3.5 text-[#9A7D3E]" />
            <span>Data Privacy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6661]">
            How we protect and respect your personal information at ShubhCoins.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-[#4A4540]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When you visit <strong>ShubhCoins</strong> or place an order for festive keepsake coins, we collect minimal personal information essential for order fulfillment:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Contact Details:</strong> Your full name, mobile number, and email address.</li>
              <li><strong>Delivery Coordinates:</strong> Complete shipping address, pincode, landmark, and optional festive gift greetings.</li>
              <li><strong>Account Information:</strong> Google Profile basic details if you sign in via Google Authentication.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>2. How We Use Your Data</span>
            </h2>
            <div className="space-y-2 text-xs">
              <p>• To process, handcraft, pack, and ship your keepsake coin order.</p>
              <p>• To send automated SMS and WhatsApp delivery tracking milestones via BlueDart / Delhivery.</p>
              <p>• To facilitate customer support and handle returns or replacements.</p>
              <p className="font-semibold text-[#4A0D17]">
                • We NEVER sell, lease, or monetize your personal details with third-party advertising brokers.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>3. Payment Security via Razorpay</span>
            </h2>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#4A0D17] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#9A7D3E]" />
                <span>PCI-DSS Level 1 Encrypted Payments</span>
              </div>
              <p className="text-[#6B6661]">
                All online payments on ShubhCoins are processed directly through <strong>Razorpay</strong> over 256-bit bank-grade SSL encryption. ShubhCoins does not have access to, nor do we store, your debit/credit card numbers, CVVs, or UPI PINs.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>4. Data Retention & Your Rights</span>
            </h2>
            <p>
              You retain the right to request deletion of your account or past delivery records. To request data erasure or to opt out of promotional communications, email us at <strong>privacy@shubhcoins.in</strong>.
            </p>
          </section>

          {/* Section 5: Grievance Officer */}
          <section className="space-y-2 pt-4 border-t border-[#EAE4D9] text-xs">
            <h3 className="font-serif text-sm font-bold text-[#1A1817]">
              Grievance & Privacy Officer
            </h3>
            <p className="text-[#6B6661]">
              ShubhCoins Fulfillment Center, 123 Main Street, Hyderabad, Telangana - 500001
            </p>
            <p className="text-[#6B6661]">
              Phone: +91 74885 74616 • Email: privacy@shubhcoins.in
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
