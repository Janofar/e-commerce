import mongoose, { Schema, Document, Model } from 'mongoose';

// Product Interface
interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  categories: {
    _id: string;
    name: string;
  }[];
  attributes: {
    size: string[];
    color: string[];
  };
  variations: {
    sku: string;
    size?: string;
    color?: string;
    stock: number;
    price: number;
  }[];
  images: {
    url: string;
    is_primary?: boolean;
  }[];
  tags?: string[];
  status: "active" | "inactive" | "archived";
  created_at: Date;
  updated_at: Date;
}

// Product Schema
const ProductSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URLs
    description: { type: String },
    price: { type: Number, required: true },
    categories: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    attributes: {
      size: [String], // E.g., ['S', 'M', 'L', 'XL']
      color: [String], // E.g., ['Red', 'Blue']
    },
    variations: [
      {
        sku: { type: String, required: true },
        size: { type: String },
        color: { type: String },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        is_primary: { type: Boolean, default: false },
      },
    ],
    tags: [String], // E.g., ['summer', 'casual']
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: false, // Since created_at and updated_at are manually defined
  }
);

// Product Model
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export { Product, IProduct };
