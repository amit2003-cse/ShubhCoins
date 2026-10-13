import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-sans antialiased selection:bg-[#C6922B]/20 selection:text-[#4A0D17]">
        {children}
      </body>
    </html>
  );
}
