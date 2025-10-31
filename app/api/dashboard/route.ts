import { NextResponse } from "next/server";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(async (_req, user) => {
  return NextResponse.json({
    message: `Welcome ${user.userId}!`,
    role: user.role,
  });
});
