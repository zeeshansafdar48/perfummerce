import { NextRequest, NextResponse } from "next/server";
// import connectDB from '@/lib/mongodb' // Commented out for dummy data
import Product from "@/models/Product";
import Review from "@/models/Review";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    // await connectDB() // Commented out for dummy data

    const product = await Product.findOne({ slug: params.slug })
      .populate("categoryId", "name slug")
      .populate("brandId", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get reviews for this product
    const reviews = await Review.find({ productId: product._id }).sort({ createdAt: -1 }).lean();

    // Transform the data to match the expected format
    const transformedProduct = {
      ...product,
      id: product._id.toString(),
      category: {
        id: product.categoryId._id.toString(),
        name: product.categoryId.name,
        slug: product.categoryId.slug
      },
      brand: {
        id: product.brandId._id.toString(),
        name: product.brandId.name,
        slug: product.brandId.slug
      },
      reviews: reviews.map((review) => ({
        ...review,
        id: review._id.toString(),
        user: { name: review.author }
      }))
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
