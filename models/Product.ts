import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  categoryId: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  gender: "MEN" | "WOMEN" | "UNISEX";
  size?: string;
  concentration?: string;
  notes: string[];
  inStock: boolean;
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviews: mongoose.Types.ObjectId[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    comparePrice: {
      type: Number,
      min: 0
    },
    images: [
      {
        type: String,
        trim: true
      }
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },
    gender: {
      type: String,
      enum: ["MEN", "WOMEN", "UNISEX"],
      default: "UNISEX"
    },
    size: {
      type: String,
      trim: true
    },
    concentration: {
      type: String,
      trim: true
    },
    notes: [
      {
        type: String,
        trim: true
      }
    ],
    inStock: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create indexes for better query performance
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ brandId: 1 });
ProductSchema.index({ gender: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ inStock: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
