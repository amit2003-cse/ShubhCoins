"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, CheckCircle2, Clock, HelpCircle } from "lucide-react";

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-3.5 h-3.5 text-[#9A7D3E]" />
            <span>Buyer Protection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Cancellation, Return & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6661]">
            7-Day Hassle-Free Replacement & Full Refund Guarantee
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm space-y-8 text-xs sm:text-sm leading-relaxed text-[#4A4540]">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>1. 7-Day Easy Return & Replacement Guarantee</span>
            </h2>
            <p>
              Your peace of mind is our highest commitment. If your <strong>ShubhCoins</strong> keepsake coin or royal presentation velvet case arrives damaged, defective, or not as described, you are eligible for a <strong>100% free replacement or a full refund within 7 days</strong> of delivery.
            </p>
          </section>

          {/* Section 2: Eligibility */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>2. Eligibility Criteria for Returns</span>
            </h2>
            <p>
              To qualify for a hassle-free return or replacement:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>The item must be reported within <strong>7 days</strong> of physical delivery.</li>
              <li>The coin must be intact in its original protective acrylic capsule and royal velvet presentation box.</li>
              <li>Photos or a short video showing any damage incurred in transit or manufacturing defect should be shared with our support team.</li>
            </ul>
          </section>

          {/* Section 3: Order Cancellation */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>3. Order Cancellation Policy</span>
            </h2>
            <div className="space-y-2 text-xs">
              <p>
                • <strong>Before Dispatch:</strong> You may cancel your order free of charge at any time prior to shipment handover to the courier. Prepaid amounts will be refunded immediately (100% full refund).
              </p>
              <p>
                • <strong>After Dispatch:</strong> If the shipment is already in transit, you can decline delivery at your doorstep, and the refund will be initiated once the package returns to our facility.
              </p>
            </div>
          </section>

          {/* Section 4: Refund Timelines & Method */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>4. Refund Timelines & Process</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <strong className="block text-[#1A1817] font-semibold text-xs">
                  Online Payments (Razorpay / UPI / Cards)
                </strong>
                <p className="text-xs text-[#6B6661]">
                  Refunds are credited directly to the source payment method within <strong>3 to 5 business days</strong> through Razorpay.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] space-y-1">
                <strong className="block text-[#1A1817] font-semibold text-xs">
                  Cash on Delivery (COD) Orders
                </strong>
                <p className="text-xs text-[#6B6661]">
                  Refunds are processed via instant <strong>UPI transfer</strong> or direct NEFT/IMPS bank transfer within 24 hours of verification.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: How to Initiate Return */}
          <section className="space-y-3 pt-4 border-t border-[#EAE4D9]">
            <h2 className="font-serif text-lg font-bold text-[#1A1817] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A0D17]" />
              <span>5. How to Initiate a Return or Replacement</span>
            </h2>
            <p>
              Simply reach out to our dedicated support team with your <strong>Order ID</strong>:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE4D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p><strong>WhatsApp Support:</strong> +91 74885 74616</p>
                <p><strong>Email:</strong> support@shubhcoins.in</p>
                <p className="text-[#6B6661] text-[11px] mt-0.5">Average response time: Under 2 hours</p>
              </div>
              <a
                href="https://wa.me/917488574616?text=Hi%20ShubhCoins%2C%20I%20would%20like%20to%20request%20a%20return%20or%20exchange%20for%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#1eb355] transition-colors shrink-0"
              >
                Request via WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
