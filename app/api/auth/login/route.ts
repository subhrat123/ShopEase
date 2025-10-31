import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/Users";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    
    const token = generateToken(user._id.toString(), user.role);
    return NextResponse.json({ message: "Login successful", token, user });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
