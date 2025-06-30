import { NextRequest, NextResponse } from "next/server";

// Dummy data
const categories = [
  { id: "cat1", name: "Floral", slug: "floral" },
  { id: "cat2", name: "Woody", slug: "woody" },
  { id: "cat3", name: "Citrus", slug: "citrus" }
];
const brands = [
  { id: "brand1", name: "Chanel", slug: "chanel" },
  { id: "brand2", name: "Dior", slug: "dior" },
  { id: "brand3", name: "Gucci", slug: "gucci" }
];
const products = [
  {
    id: "prod1",
    name: "Chanel No. 5",
    slug: "chanel-no-5",
    description: "Classic floral fragrance.",
    price: 120,
    images: ["https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"],
    category: categories[0],
    brand: brands[0],
    gender: "WOMEN",
    inStock: true,
    stock: 10,
    featured: true,
    createdAt: new Date()
  },
  {
    id: "prod2",
    name: "Dior Sauvage",
    slug: "dior-sauvage",
    description: "Woody aromatic fragrance.",
    price: 110,
    images: ["https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg"],
    category: categories[1],
    brand: brands[1],
    gender: "MEN",
    inStock: true,
    stock: 8,
    featured: true,
    createdAt: new Date()
  },
  {
    id: "prod3",
    name: "Gucci Bloom",
    slug: "gucci-bloom",
    description: "Rich white floral fragrance.",
    price: 105,
    images: ["https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"],
    category: categories[0],
    brand: brands[2],
    gender: "WOMEN",
    inStock: true,
    stock: 5,
    featured: false,
    createdAt: new Date()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const gender = searchParams.get("gender");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "name";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    let filtered = products.slice();
    if (category) filtered = filtered.filter((p) => p.category.slug === category);
    if (brand) filtered = filtered.filter((p) => p.brand.slug === brand);
    if (gender && gender !== "ALL") filtered = filtered.filter((p) => p.gender === gender);
    if (search)
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    if (minPrice) filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    if (featured === "true") filtered = filtered.filter((p) => p.featured);

    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      products: paginated,
      totalCount,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
