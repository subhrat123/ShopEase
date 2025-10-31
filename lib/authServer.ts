
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in env");

export type JwtPayload = {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
};

export function getTokenFromHeader(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}

export function requireAuth(req: Request): JwtPayload {
  const token = getTokenFromHeader(req);
  if (!token) throw NextResponse.json({ error: "Missing token" }, { status: 401 });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload;
  } catch (err) {
    throw NextResponse.json({ error: "Invalid or expired" }, { status: 403 });
  }
}

export function requireAdmin(req: Request) {
  const payload = requireAuth(req);
  if (payload.role !== "admin") throw NextResponse.json({ error: "Forbidden - admin only" }, { status: 403 });
  return payload;
}
