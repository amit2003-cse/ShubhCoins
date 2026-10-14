import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-sans antialiased selection:bg-[#C6922B]/20 selection:text-[#4A0D17]">
        {children}
      </body>
    </html>
  );
}
