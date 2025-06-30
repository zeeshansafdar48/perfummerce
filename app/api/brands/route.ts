import { NextRequest, NextResponse } from "next/server";

const brands = [
  { id: "brand1", name: "Chanel", slug: "chanel" },
  { id: "brand2", name: "Dior", slug: "dior" },
  { id: "brand3", name: "Gucci", slug: "gucci" }
];

export async function GET() {
  return NextResponse.json(brands);
}
