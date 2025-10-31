import { NextResponse } from "next/server";
import Product from "@/models/Products";
import { dbConnect } from "@/lib/dbConnect";
import { withAdmin } from "@/lib/withAuth";
import mongoose from "mongoose";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();
  const {id} =  await params;
   let product;

  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  } else {
    product = await Product.findOne({ slug: id });
  }

  if (!product)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(product);
};

// 🔒 Admin only: update product
export const PUT = withAdmin(async (req, { params }: any) => {
  await dbConnect();
  const data = await req.json();
  const {id} = await params;
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated)
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  return NextResponse.json(updated);
});


// ❌ Delete product
export const DELETE = withAdmin(async (req, { params }: any) => {
  await dbConnect();
  const { id } = params;

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted successfully" });
});