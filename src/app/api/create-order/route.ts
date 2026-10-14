import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
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

    // If amount is passed in Rupees (e.g. 898), convert to paise (89800)
    // If passed already in paise (> 1000 for realistic item), handle properly
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

    const options = {
      amount: amountInPaise,
      currency: body.currency || "INR",
      receipt: body.receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      notes: body.notes || {
        store: "ShubhCoins",
        brand: "ShubhCoins - Gift Prosperity",
      },
    };

    const order = await razorpay.orders.create(options);

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
