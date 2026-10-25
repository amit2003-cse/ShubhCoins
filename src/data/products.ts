import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "gold-plated-coin",
    name: "Goddess Lakshmi Gold Plated Coin",
    finish: "gold",
    price: 499,
    originalPrice: 999,
    tagline: "Auspicious Blessings, Prosperity & Divine Grace.",
    description:
      "A brilliantly polished commemorative decorative coin featuring an opulent 24K gold-tone mirror finish with a high-relief embossed engraving of Goddess Lakshmi seated on a lotus, showering blessings and prosperity. Presented in an exquisite royal crimson velvet gift box.",
    image: "/images/gold-coin.jpg",
    badge: "Bestseller",
    specifications: {
      diameter: "32 mm",
      thickness: "2.5 mm",
      finishType: "24K Gold-Tone Mirror Electroplate",
      coreMaterial: "Solid Heavyweight Zinc-Brass Alloy (Non-Solid Gold)",
      engraving: "Embossed Divine Goddess Lakshmi on Lotus with Ornate Mandala Border",
      packaging: "Custom Handcrafted Royal Crimson Velvet Gift Box",
    },
  },
  {
    id: "silver-plated-coin",
    name: "Goddess Lakshmi Silver Plated Coin",
    finish: "silver",
    price: 349,
    originalPrice: 699,
    tagline: "Pure Look, Divine Blessings & Timeless Prosperity.",
    description:
      "An impeccably lustrous commemorative decorative coin with an ultra-reflective sterling silver-tone electroplated sheen, featuring an intricate high-relief engraving of Goddess Lakshmi on a blooming lotus flower. Housed inside an elegant royal midnight-navy velvet gift box.",
    image: "/images/silver-coin.jpg",
    badge: "Festive Favorite",
    specifications: {
      diameter: "32 mm",
      thickness: "2.5 mm",
      finishType: "Pure Sterling Silver-Tone Chrome Electroplate",
      coreMaterial: "Solid Heavyweight Zinc-Brass Alloy (Non-Solid Silver)",
      engraving: "Embossed Divine Goddess Lakshmi on Lotus with Milled Rim Edge",
      packaging: "Custom Handcrafted Royal Navy Velvet Gift Box",
    },
  },
];
