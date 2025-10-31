import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image?: string;
  lastUpdated: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    inventory: { type: Number, default: 0 },
    image: String,
    lastUpdated: { type: String },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
