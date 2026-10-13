import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "gold-plated-coin",
    name: "Gold Plated Coin",
    finish: "gold",
    price: 499,
    originalPrice: 999,
    tagline: "Elegant, Auspicious, Timeless.",
    description:
      "A brilliantly polished decorative metal coin featuring an opulent 24K gold-tone electroplated mirror finish. Features a clean, minimalist design with no deity engravings, presented in an exquisite royal crimson velvet gift box.",
    image: "/images/gold-coin.jpg",
    badge: "Bestseller",
    specifications: {
      diameter: "32 mm",
      thickness: "2.5 mm",
      finishType: "24K Gold-Tone Mirror Electroplate",
      coreMaterial: "Solid Heavyweight Zinc-Brass Alloy (Non-Solid Gold)",
      engraving: "Clean Plain Mirror Finish (Zero Deity Engravings)",
      packaging: "Custom Handcrafted Royal Crimson Velvet Gift Box",
    },
  },
  {
    id: "silver-plated-coin",
    name: "Silver Plated Coin",
    finish: "silver",
    price: 349,
    originalPrice: 699,
    tagline: "Pure Look, Perfect Gift.",
    description:
      "An impeccably lustrous decorative metal coin with an ultra-reflective sterling silver-tone electroplated sheen. Minimalist plain face with reeded rim edges, housed inside an elegant royal midnight-blue velvet gift box.",
    image: "/images/silver-coin.jpg",
    badge: "Festive Favorite",
    specifications: {
      diameter: "32 mm",
      thickness: "2.5 mm",
      finishType: "Pure Sterling Silver-Tone Chrome Electroplate",
      coreMaterial: "Solid Heavyweight Zinc-Brass Alloy (Non-Solid Silver)",
      engraving: "Clean Plain Mirror Finish (Zero Deity Engravings)",
      packaging: "Custom Handcrafted Royal Navy Velvet Gift Box",
    },
  },
];
