import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { withAdmin } from "@/lib/withAuth";

// Directory to store uploaded files (public/uploads)
const uploadDir = path.join(process.cwd(), "public", "uploads");

// Ensure the upload folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const POST = withAdmin(async (req) => {
  const formData = await req.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  return NextResponse.json({ imageUrl });
});
