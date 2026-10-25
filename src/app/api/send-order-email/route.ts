import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail, OrderEmailData } from "@/lib/email";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // If orderId is provided, we can fetch from DB if details are missing
    let emailData: OrderEmailData;

    if (body.orderId && (!body.customerEmail || !body.items)) {
      await connectToDatabase();
      const order = await Order.findOne({
        $or: [{ orderId: body.orderId }, { razorpayOrderId: body.orderId }],
      });

      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found with provided orderId" },
          { status: 404 }
        );
      }

      emailData = {
        orderId: order.orderId,
        customerName: order.customer?.name || "Valued Patron",
        customerEmail: body.customerEmail || order.customer?.email,
        customerPhone: order.customer?.phone,
        shippingAddress: order.customer?.fullAddress || "",
        giftMessage: order.customer?.giftMessage,
        paymentMethod: order.paymentMethod?.includes("cod")
          ? "Cash on Delivery (COD)"
          : "Prepaid Online (Verified)",
        amount: order.amount,
        items: order.items || [],
        orderDate: order.createdAt
          ? new Date(order.createdAt).toISOString()
          : new Date().toISOString(),
      };
    } else {
      // Direct payload provided
      emailData = {
        orderId: body.orderId || `SC_TEST_${Date.now().toString().slice(-5)}`,
        customerName: body.customerName || "ShubhCoins Patron",
        customerEmail: body.customerEmail || body.email,
        customerPhone: body.customerPhone || "7488574616",
        shippingAddress:
          body.shippingAddress ||
          "Plot 42, Jubilee Hills, Hyderabad, Telangana - 500033",
        giftMessage: body.giftMessage || "Wishing you health, wealth and endless prosperity!",
        paymentMethod: body.paymentMethod || "Prepaid Online (Verified)",
        amount: Number(body.amount) || 499,
        items: body.items || [
          {
            name: "Goddess Lakshmi Gold Plated Coin",
            finish: "gold",
            price: 499,
            quantity: 1,
          },
        ],
        orderDate: new Date().toISOString(),
      };
    }

    if (!emailData.customerEmail) {
      return NextResponse.json(
        { success: false, error: "Customer email is required" },
        { status: 400 }
      );
    }

    const result = await sendOrderConfirmationEmail(emailData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Order confirmation email sent successfully via Brevo",
        messageId: result.messageId,
        sentTo: emailData.customerEmail,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to send email via Brevo",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("send-order-email error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
