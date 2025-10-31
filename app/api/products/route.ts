import { NextResponse } from "next/server";
import Product from "@/models/Products";
import { dbConnect } from "@/lib/dbConnect";
import { withAdmin } from "@/lib/withAuth";

export const GET = async () => {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
};

// 🔒 Only admin can add products
export const POST = withAdmin(async (req) => {
  await dbConnect();
  const data = await req.json();

  const product = await Product.create({
    ...data,
    lastUpdated: new Date().toISOString(),
  });

  return NextResponse.json({ "id": product._id, product }, { status: 201 });
});
