const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/perfummerce";

// Define schemas directly in the seed file
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["CUSTOMER", "ADMIN"], default: "CUSTOMER" }
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    images: [{ type: String }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    gender: { type: String, enum: ["MEN", "WOMEN", "UNISEX"], default: "UNISEX" },
    notes: [{ type: String }],
    inStock: { type: Boolean, default: true },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);
const Brand = mongoose.model("Brand", BrandSchema);
const Product = mongoose.model("Product", ProductSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      email: "admin@perfume.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN"
    });

    // Create categories
    const categories = await Category.create([
      { name: "Eau de Parfum", slug: "eau-de-parfum" },
      { name: "Eau de Toilette", slug: "eau-de-toilette" },
      { name: "Cologne", slug: "cologne" },
      { name: "Attar", slug: "attar" }
    ]);

    // Create brands
    const brands = await Brand.create([
      { name: "Chanel", slug: "chanel" },
      { name: "Dior", slug: "dior" },
      { name: "Tom Ford", slug: "tom-ford" },
      { name: "Creed", slug: "creed" },
      { name: "Maison Margiela", slug: "maison-margiela" }
    ]);

    // Create sample products
    const products = [
      {
        name: "Chanel No. 5",
        slug: "chanel-no-5",
        description:
          "The legendary fragrance that epitomizes timeless elegance. A floral aldehyde composition with notes of ylang-ylang, rose, and sandalwood.",
        price: 150.0,
        comparePrice: 180.0,
        images: [
          "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg",
          "https://images.pexels.com/photos/1034653/pexels-photo-1034653.jpeg"
        ],
        stock: 25,
        gender: "WOMEN",
        featured: true,
        categoryId: categories[0]._id,
        brandId: brands[0]._id,
        notes: ["Ylang-ylang", "Rose", "Sandalwood", "Aldehydes"]
      },
      {
        name: "Dior Sauvage",
        slug: "dior-sauvage",
        description:
          "A radical freshness with a raw, noble character. Calabrian bergamot, Sichuan pepper, and ambroxan create an intensely masculine fragrance.",
        price: 120.0,
        comparePrice: 140.0,
        images: [
          "https://images.pexels.com/photos/1070970/pexels-photo-1070970.jpeg",
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
        ],
        stock: 30,
        gender: "MEN",
        featured: true,
        categoryId: categories[1]._id,
        brandId: brands[1]._id,
        notes: ["Bergamot", "Sichuan Pepper", "Ambroxan"]
      },
      {
        name: "Tom Ford Black Orchid",
        slug: "tom-ford-black-orchid",
        description:
          "A luxurious and sensual fragrance with black orchid, dark chocolate, and patchouli. Perfect for evening wear.",
        price: 200.0,
        images: ["https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg"],
        stock: 15,
        gender: "UNISEX",
        featured: true,
        categoryId: categories[0]._id,
        brandId: brands[2]._id,
        notes: ["Black Orchid", "Dark Chocolate", "Patchouli"]
      },
      {
        name: "Creed Aventus",
        slug: "creed-aventus",
        description:
          "The bestselling men's fragrance. A sophisticated blend of pineapple, blackcurrant, and oakmoss.",
        price: 350.0,
        images: ["https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg"],
        stock: 20,
        gender: "MEN",
        featured: false,
        categoryId: categories[0]._id,
        brandId: brands[3]._id,
        notes: ["Pineapple", "Blackcurrant", "Oakmoss"]
      },
      {
        name: "Maison Margiela REPLICA Beach Walk",
        slug: "maison-margiela-replica-beach-walk",
        description:
          "Captures the memory of a beach walk. Fresh coconut milk, bergamot, and cedar create a breezy summer scent.",
        price: 130.0,
        images: ["https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg"],
        stock: 18,
        gender: "UNISEX",
        featured: false,
        categoryId: categories[1]._id,
        brandId: brands[4]._id,
        notes: ["Coconut Milk", "Bergamot", "Cedar"]
      },
      {
        name: "Chanel Coco Mademoiselle",
        slug: "chanel-coco-mademoiselle",
        description:
          "A modern interpretation of the legendary Coco. Fresh orange, elegant rose, and patchouli create an irresistible fragrance.",
        price: 140.0,
        images: ["https://images.pexels.com/photos/1391499/pexels-photo-1391499.jpeg"],
        stock: 22,
        gender: "WOMEN",
        featured: false,
        categoryId: categories[0]._id,
        brandId: brands[0]._id,
        notes: ["Orange", "Rose", "Patchouli"]
      }
    ];

    await Product.create(products);

    console.log("Database seeded successfully!");
    console.log("Admin credentials:");
    console.log("Email: admin@perfume.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
