"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
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

        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-[11px] font-bold text-[#9A7D3E] tracking-widest uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We Are Here For You</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817]">
            Contact ShubhCoins Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6661] max-w-lg mx-auto">
            Have questions about coin finishes, corporate bulk gifting, or existing orders? Our festive desk is delighted to assist you.
          </p>
        </div>

        {/* Top Cards: 3 Contact Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Card 1: WhatsApp */}
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs text-center space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#1A1817]">
                WhatsApp Support
              </h3>
              <p className="text-xs text-[#6B6661]">
                Instant response for urgent order queries & festive gifting guidance.
              </p>
            </div>
            <a
              href="https://wa.me/917488574616?text=Namaste%20ShubhCoins!%20I%20have%20an%20inquiry%20regarding%20coins."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#1eb355] transition-colors"
            >
              +91 74885 74616
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs text-center space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#4A0D17]/10 text-[#4A0D17] flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#1A1817]">
                Email Care
              </h3>
              <p className="text-xs text-[#6B6661]">
                For returns, invoice copies, and corporate custom bulk inquiries.
              </p>
            </div>
            <a
              href="mailto:support@shubhcoins.in"
              className="inline-block w-full py-2.5 rounded-xl bg-stone-100 text-[#1A1817] font-bold text-xs hover:bg-stone-200 transition-colors"
            >
              support@shubhcoins.in
            </a>
          </div>

          {/* Card 3: Address & Hours */}
          <div className="p-6 bg-white rounded-3xl border border-[#EAE4D9] shadow-xs text-center space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#DFC278]/20 text-[#9A7D3E] flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#1A1817]">
                Fulfillment Hub
              </h3>
              <p className="text-xs text-[#6B6661]">
                123, Main Street, Hyderabad, Telangana - 500001, India
              </p>
            </div>
            <div className="text-[11px] font-semibold text-[#9A7D3E] py-2 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9]">
              Mon - Sun: 10 AM - 8 PM IST
            </div>
          </div>
        </div>

        {/* Contact Form & Corporate Gifting */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE4D9] shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                Thank you! Message Received.
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6661] max-w-md mx-auto">
                Our support team will get back to you within 2 to 4 business hours via WhatsApp or email.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", orderId: "", message: "" });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#4A0D17] text-white text-xs font-bold hover:bg-[#32080F]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#6B6661] mt-0.5">
                  We usually respond within 2 hours during active support hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Mobile Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                    Order ID (If inquiring about an existing order)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SC_COD_123456"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1817] mb-1">
                  Your Message or Query *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help? (e.g., inquiry about velvet box packaging, corporate quantity discounts, or address update)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#EAE4D9] focus:outline-none focus:border-[#4A0D17]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#6B6661]">
                  Insured Pan-India Express Delivery & 7-Day Hassle-Free Returns.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A0D17] text-white font-bold text-xs hover:bg-[#32080F] transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
