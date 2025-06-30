import { NextRequest, NextResponse } from "next/server";

const categories = [
  { id: "cat1", name: "Floral", slug: "floral" },
  { id: "cat2", name: "Woody", slug: "woody" },
  { id: "cat3", name: "Citrus", slug: "citrus" }
];

export async function GET() {
  return NextResponse.json(categories);
}
