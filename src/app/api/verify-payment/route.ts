import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json(
        { error: "Razorpay key secret not configured on server" },
        { status: 500 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required verification parameters (order_id, payment_id, signature)",
        },
        { status: 400 }
      );
    }

    // Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(payload)
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.warn("Signature verification failed for order:", razorpay_order_id);
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Invalid payment signature. Payment verification failed.",
        },
        { status: 400 }
      );
    }

    // Update order status in MongoDB
    try {
      await connectToDatabase();
      const updatedOrder = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true }
      );

      // Send confirmation email asynchronously via Brevo
      if (updatedOrder && updatedOrder.customer?.email) {
        sendOrderConfirmationEmail({
          orderId: updatedOrder.orderId || razorpay_order_id,
          customerName: updatedOrder.customer.name || "Valued Patron",
          customerEmail: updatedOrder.customer.email,
          customerPhone: updatedOrder.customer.phone,
          shippingAddress: updatedOrder.customer.fullAddress || "",
          giftMessage: updatedOrder.customer.giftMessage,
          paymentMethod: "Razorpay (Online Paid)",
          amount: updatedOrder.amount,
          items: updatedOrder.items || [],
          orderDate: updatedOrder.createdAt
            ? new Date(updatedOrder.createdAt).toISOString()
            : new Date().toISOString(),
        }).catch((emailErr) => {
          console.warn("Async email sending error after payment:", emailErr);
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB order update error (non-fatal):", dbErr);
    }

    // Success response
    return NextResponse.json({
      success: true,
      verified: true,
      message: "Payment signature verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error during verification",
      },
      { status: 500 }
    );
  }
}
