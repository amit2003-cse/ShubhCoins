import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay credentials are not configured on server" },
        { status: 401 }
      );
    }

    const body = await req.json();
    let amountInPaise = body.amount;
    const amountInRupees = body.isRupees ?? true ? Number(body.amount) : Number(body.amount) / 100;

    if (body.isRupees ?? true) {
      amountInPaise = Math.round(Number(body.amount) * 100);
    } else {
      amountInPaise = Math.round(Number(body.amount));
    }

    if (!amountInPaise || amountInPaise < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1.00)" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const receipt = body.receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const options = {
      amount: amountInPaise,
      currency: body.currency || "INR",
      receipt,
      notes: body.notes || {
        store: "ShubhCoins",
        brand: "ShubhCoins - Gift Prosperity",
      },
    };

    const order = await razorpay.orders.create(options);

    // Persist pending order to MongoDB
    try {
      await connectToDatabase();
      await Order.create({
        orderId: receipt,
        razorpayOrderId: order.id,
        amount: amountInRupees,
        currency: order.currency,
        paymentMethod: "razorpay",
        status: "pending",
        customer: body.customer || {
          name: "Amit Kumar",
          email: "amit4321sg@gmail.com",
          phone: "9876543210",
          address: "123, Main Street, Hyderabad, Telangana - 500001",
        },
      });
    } catch (dbErr) {
      console.warn("MongoDB order logging error (non-fatal):", dbErr);
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: key_id,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to create Razorpay order",
        details: error?.error || null,
      },
      { status: 500 }
    );
  }
}
