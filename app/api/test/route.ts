import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "✅ MongoDB connected successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "❌ MongoDB connection failed" }, { status: 500 });
  }
}
