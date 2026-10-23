import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "ShubhCoins | Gift Prosperity - Premium Decorative Coins",
  description:
    "Exquisite Gold-Finish & Silver-Finish decorative keepsake coins in luxury gift packaging. Ideal for Diwali, weddings, and memorable gifting across India.",
  keywords: [
    "ShubhCoins",
    "Diwali coins",
    "decorative gold plated coin",
    "silver plated coin",
    "festive gifts",
    "Indian gifting",
    "luxury keepsakes",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1A1817] font-sans antialiased selection:bg-[#C5A869]/20 selection:text-[#4A0D17]">
        <AuthProvider>
          {children}
          <AuthModal />
          <WhatsAppButton />
        </AuthProvider>

        {/* Razorpay Checkout SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Google Identity Services SDK */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
