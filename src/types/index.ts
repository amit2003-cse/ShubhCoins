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

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  giftMessage?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  finish: "gold" | "silver";
  price: number;
  quantity: number;
  image: string;
}
