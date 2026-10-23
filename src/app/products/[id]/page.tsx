import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { ProductClientView } from "./ProductClientView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | ShubhCoins",
    };
  }

  return {
    title: `${product.name} (₹${product.price}) | ShubhCoins - Gift Prosperity`,
    description: `${product.tagline} ${product.description} Includes handcrafted royal velvet presentation gift box and express Pan-India shipping.`,
    openGraph: {
      title: `${product.name} — Festive Decorative Keepsake Coin | ShubhCoins`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductClientView product={product} allProducts={PRODUCTS} />;
}
