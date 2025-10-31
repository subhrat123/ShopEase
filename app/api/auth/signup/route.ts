import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/Users";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
