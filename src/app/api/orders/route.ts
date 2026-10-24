import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectToDatabase();

    const orderId =
      body.orderId || `SC_COD_${Date.now().toString().slice(-6)}`;

    const customer = body.customer || {
      name: "Customer",
      email: "customer@example.com",
      phone: "9999999999",
      addressLine1: "Address",
      city: "City",
      state: "State",
      pincode: "110001",
    };

    const fullAddress = customer.fullAddress || 
      `${customer.addressLine1}${customer.addressLine2 ? ', ' + customer.addressLine2 : ''}${customer.landmark ? ', Near ' + customer.landmark : ''}, ${customer.city}, ${customer.state} - ${customer.pincode}`;

    const newOrder = await Order.create({
      orderId,
      amount: Number(body.amount) || 0,
      currency: "INR",
      paymentMethod: body.paymentMethod || "cod",
      status: body.paymentMethod === "cod" ? "pending" : "paid",
      items: body.items || [],
      customer: {
        ...customer,
        fullAddress,
      },
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    let errorMessage = error.message || "Failed to create order";
    if (
      typeof errorMessage === "string" &&
      (errorMessage.includes("bad auth") ||
        errorMessage.toLowerCase().includes("authentication failed"))
    ) {
      errorMessage =
        "MongoDB authentication failed. Please verify that your MongoDB Atlas database user and password in MONGODB_URI match your Atlas Database Access credentials.";
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const phone = searchParams.get("phone");

    await connectToDatabase();

    if (orderId) {
      const order = await Order.findOne({
        $or: [
          { orderId: orderId.trim() },
          { razorpayOrderId: orderId.trim() },
        ],
      });

      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      const orders = await Order.find({
        "customer.phone": { $regex: cleanPhone },
      })
        .sort({ createdAt: -1 })
        .limit(10);

      return NextResponse.json({ success: true, orders });
    }

    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
