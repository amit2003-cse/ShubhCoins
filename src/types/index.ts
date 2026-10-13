export interface Product {
  id: string;
  name: string;
  finish: "gold" | "silver";
  price: number;
  originalPrice: number;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  specifications: {
    diameter: string;
    thickness: string;
    finishType: string;
    coreMaterial: string;
    engraving: string;
    packaging: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
