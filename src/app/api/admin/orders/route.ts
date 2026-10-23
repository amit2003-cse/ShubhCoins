import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const payment = searchParams.get("payment");

    await connectToDatabase();

    const query: any = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (payment && payment !== "all") {
      query.paymentMethod = payment;
    }

    if (search) {
      const clean = search.trim();
      query.$or = [
        { orderId: { $regex: clean, $options: "i" } },
        { "customer.name": { $regex: clean, $options: "i" } },
        { "customer.phone": { $regex: clean, $options: "i" } },
        { "customer.city": { $regex: clean, $options: "i" } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(100);

    // Compute basic analytics
    const allOrders = await Order.find({});
    const totalRevenue = allOrders
      .filter((o) => o.status !== "cancelled" && o.status !== "failed")
      .reduce((sum, o) => sum + (o.amount || 0), 0);

    const pendingCount = allOrders.filter(
      (o) => o.status === "pending" || o.status === "confirmed"
    ).length;

    const codCount = allOrders.filter((o) => o.paymentMethod === "cod").length;
    const prepaidCount = allOrders.filter((o) => o.paymentMethod === "razorpay").length;

    return NextResponse.json({
      success: true,
      orders,
      stats: {
        totalOrders: allOrders.length,
        totalRevenue,
        pendingCount,
        codCount,
        prepaidCount,
      },
    });
  } catch (error: any) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch orders from database",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status, courierName, trackingNumber, notes } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (courierName) updateFields.courierName = courierName;
    if (trackingNumber !== undefined) updateFields.trackingNumber = trackingNumber;
    if (notes !== undefined) updateFields.notes = notes;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order #${orderId} updated successfully to status: ${status}`,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error("Admin order update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update order",
      },
      { status: 500 }
    );
  }
}
