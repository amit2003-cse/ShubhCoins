import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  finish?: "gold" | "silver";
  price: number;
  quantity: number;
  image?: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress?: string;
  giftMessage?: string;
}

export interface IOrder extends Document {
  orderId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  paymentMethod: "razorpay" | "cod";
  status: "pending" | "paid" | "failed" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  courierName?: string;
  trackingNumber?: string;
  notes?: string;
  items: IOrderItem[];
  customer: ICustomer;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    finish: { type: String, enum: ["gold", "silver"] },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    fullAddress: { type: String },
    giftMessage: { type: String },
  },
  { _id: false }
);

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    razorpayOrderId: {
      type: String,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      default: "razorpay",
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "confirmed", "packed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    courierName: {
      type: String,
      default: "BlueDart Express",
    },
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
    items: {
      type: [OrderItemSchema],
      default: [],
    },
    customer: {
      type: CustomerSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
