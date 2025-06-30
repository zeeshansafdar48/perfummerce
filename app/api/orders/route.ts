import { NextRequest, NextResponse } from "next/server";
// import connectDB from '@/lib/mongodb' // Commented out for dummy data
import Order from "@/models/Order";
import Product from "@/models/Product";
import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  shippingAddress: z.string().min(10),
  shippingCity: z.string().min(2),
  shippingState: z.string().min(2),
  shippingZip: z.string().min(5),
  paymentMethod: z.enum(["COD", "JAZZCASH"]),
  total: z.number().positive(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
      price: z.number().positive()
    })
  )
});

export async function POST(request: NextRequest) {
  try {
    // await connectDB() // Commented out for dummy data

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Create order
    const order = new Order({
      orderNumber,
      ...validatedData
    });

    await order.save();

    // Update product stock
    for (const item of validatedData.items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    // Populate the order with product details
    const populatedOrder = await Order.findById(order._id)
      .populate({
        path: "items.productId",
        populate: {
          path: "brandId",
          select: "name"
        }
      })
      .lean();

    return NextResponse.json(populatedOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid order data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // await connectDB() // Commented out for dummy data

    const orders = await Order.find({})
      .populate({
        path: "items.productId",
        populate: {
          path: "brandId",
          select: "name"
        }
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
