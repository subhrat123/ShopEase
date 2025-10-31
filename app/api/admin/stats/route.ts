import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/withAuth";

export const GET = withAdmin(async (_req, user) => {
  return NextResponse.json({
    message: `Admin Access Granted`,
    adminId: user.userId,
  });
});
