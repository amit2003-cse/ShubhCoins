# ✨ ShubhCoins (शुभ कॉइन्स) — Gift Prosperity

<div align="center">

![ShubhCoins Hero Banner](./public/images/hero-coins.jpg)

### **Premium Indian Festive E-Commerce Homepage**
*Crafted for elegance, festive celebrations, and memorable gifting across India.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-F56565?style=for-the-badge)](https://lucide.dev/)

---

[Explore Features](#-key-features) • [Tech Stack](#-tech-stack) • [Product Catalog](#-product-catalog) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure)

---

</div>

## 🌟 Brand Philosophy & Overview

**ShubhCoins** is an Indian festive e-commerce brand specializing in exquisite **decorative keepsake coins** with gold-colour and silver-colour electroplated finishes. 

Rooted in Indian traditions where gifting coins during Diwali and Dhanteras symbolizes wishes of abundance, health, and bright beginnings:
* **Clean Secular Aesthetics:** Every coin features a minimalist, mirror-polished finish with **zero deity illustrations or religious engravings**, making them universally welcoming tokens for families, friends, and corporate gifting.
* **100% Material Transparency:** Clear honest disclosures — heavyweight zinc-brass alloy core with electroplated luster (decorative mementos, not solid bullion).
* **Festive Unboxing Experience:** Enclosed inside handcrafted royal velvet presentation cases (Crimson for Gold, Midnight Blue for Silver).

---

## 🪙 Product Catalog

| Product | Finish | Price | Regular Price | Packaging Included | Face Design |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Gold Plated Coin** | 24K Gold-Tone Mirror Electroplate | **₹499** | ~~₹999~~ (50% Off) | Royal Crimson Velvet Gift Box | Clean Mirror Face, Reeded Rim |
| **Silver Plated Coin** | Sterling Silver-Tone Chrome Luster | **₹349** | ~~₹699~~ (50% Off) | Royal Midnight Blue Velvet Box | Clean Mirror Face, Reeded Rim |

---

## 🎨 Design System & Aesthetics

* **Color Palette:**
  * **Deep Burgundy** (`#4A0D17` / `#2D060D`): Royal heritage backdrops, festive warmth, and high-contrast buttons.
  * **Muted / Imperial Gold** (`#DFC278` / `#C6922B`): Borders, badges, glowing ambient accents, and CTA buttons.
  * **Warm Ivory** (`#FDFBF7` / `#FAF7F2`): Clean, airy canvas offering high readability and generous whitespace.
* **Typography:**
  * **Headings:** `Cinzel` (Google Fonts) — Regal, classical Indian luxury serif.
  * **Body:** `Plus Jakarta Sans` — Clean, modern, highly legible sans-serif.

---

## 🚀 Key Sections & Features

1. **Top Announcement Bar:**
   * Highlights free luxury velvet gift boxes, Pan-India 3-5 day delivery, Cash on Delivery (COD), and festive promo codes (`SHUBH2024`).
2. **Sticky Header & Brand Identity:**
   * Golden Lotus emblem, navigation menu (`Home`, `Shop`, `About`, `Help`), live search toggle, account trigger, and interactive cart badge counter.
3. **Festive Hero Section:**
   * High-impact headline: *"This Diwali Gift Happiness Gift Prosperity"*.
   * Dual CTAs, trust pills, and commercial photography showcasing both coins in royal velvet lining.
4. **Trust Strip:**
   * 4 reassurance micro-cards: *Premium Finish*, *Perfect for Gifting*, *7-Day Return*, and *Secure Payments (Razorpay | COD)*.
5. **Featured Collection (Our Collection):**
   * Two side-by-side product cards with quick *View Details* and one-click *Add to Cart*.
6. **Festive Celebration Banner:**
   * *"Make this Diwali More Special with a Timeless Gift"* with warm family celebration photography.
7. **Brand Heritage Story:**
   * 4 brand pillars detailing universal appeal, secular design, and accessible gifting.
8. **Gifting Occasions Grid:**
   * Curated gifting categories: *Diwali & Dhanteras*, *Corporate Gifting*, *Weddings & Anniversaries*, and *Griha Pravesh*.
9. **Material Quality & Transparency Table:**
   * Comprehensive consumer clarity table detailing core alloy, plating durability, dimensions (32mm x 2.5mm), and non-bullion disclosures.
10. **Interactive Slide-Over Cart Drawer:**
    * Real-time item additions, quantity increment/decrement, subtotal and shipping calculations, and checkout button.
11. **Quick-View Product Modal:**
    * Full modal view with image previews, stock status, material bullet points, and tabbed specifications.
12. **Live Search Modal:**
    * Instant filtering for products and finishes.
13. **Checkout & Order Flow Simulation:**
    * Two-step checkout preview (Address verification, Razorpay vs COD selection) culminating in order confirmation (`#SC123456`).
14. **Comprehensive Footer:**
    * Interactive 5-item FAQ accordion, policies, Hyderabad store contact, and payment security badges.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Fonts:** `next/font/google` (`Cinzel`, `Plus Jakarta Sans`)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/amit2003-cse/ShubhCoins.git
cd ShubhCoins
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production
```bash
npm run build
```

---

## 📂 Project Structure

```
coin/
├── public/
│   └── images/
│       ├── hero-coins.jpg          # Hero velvet box with gold & silver coins
│       ├── gold-coin.jpg           # Gold-finish product photography
│       ├── silver-coin.jpg         # Silver-finish product photography
│       └── festive-banner.jpg      # Festive celebration banner image
├── src/
│   ├── app/
│   │   ├── globals.css             # Theme variables & luxury styling tokens
│   │   ├── layout.tsx              # Google fonts and root layout
│   │   └── page.tsx                # Homepage assembling all sections
│   ├── components/
│   │   ├── AnnouncementBar.tsx     # Top promotional strip
│   │   ├── Header.tsx              # Navigation & branding
│   │   ├── HeroSection.tsx         # Diwali hero banner
│   │   ├── TrustStrip.tsx          # 4 trust pillars
│   │   ├── FeaturedCollection.tsx  # Product cards (₹499 & ₹349)
│   │   ├── FestiveBanner.tsx       # Bottom celebration banner
│   │   ├── BrandStory.tsx          # Heritage & values
│   │   ├── GiftingOccasions.tsx    # Occasions grid
│   │   ├── MaterialTransparency.tsx# Honest material disclosures
│   │   ├── CartDrawer.tsx          # Slide-over cart drawer
│   │   ├── ProductDetailModal.tsx  # Quick-view modal
│   │   ├── SearchModal.tsx         # Real-time search popup
│   │   ├── CheckoutModal.tsx       # Checkout simulation modal
│   │   └── Footer.tsx              # FAQ accordion & footer links
│   ├── data/
│   │   └── products.ts             # Verified product dataset
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

---

## 👤 Author

* **Amit Kumar** ([@amit2003-cse](https://github.com/amit2003-cse))
* **Email:** [amit4321sg@gmail.com](mailto:amit4321sg@gmail.com)
* **GitHub Repository:** [ShubhCoins](https://github.com/amit2003-cse/ShubhCoins.git)

---

<div align="center">
  <sub>Built with ❤️ for Indian Festive Celebrations. © 2026 ShubhCoins. All rights reserved.</sub>
</div>
