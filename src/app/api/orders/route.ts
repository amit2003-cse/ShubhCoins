import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectToDatabase();

    const orderId =
      body.orderId || `SC_COD_${Date.now().toString().slice(-6)}`;

    const newOrder = await Order.create({
      orderId,
      amount: Number(body.amount) || 0,
      currency: "INR",
      paymentMethod: body.paymentMethod || "cod",
      status: body.paymentMethod === "cod" ? "pending" : "paid",
      customer: body.customer || {
        name: "Amit Kumar",
        email: "amit4321sg@gmail.com",
        phone: "9876543210",
        address: "123, Main Street, Hyderabad, Telangana - 500001",
      },
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
