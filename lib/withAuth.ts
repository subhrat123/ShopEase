import { NextResponse } from "next/server";
import { requireAuth, requireAdmin, JwtPayload } from "./authServer";

/** Wrapper for routes that need user authentication */
export function withAuth(
  handler: (req: Request, user: JwtPayload) => Promise<NextResponse> | NextResponse
) {
  return async (req: Request) => {
    try {
      const user = requireAuth(req);
      return await handler(req, user);
    } catch (err) {
      return err as NextResponse;
    }
  };
}

/** Wrapper for routes that need admin authentication */
export function withAdmin(
  handler: (req: Request, user: JwtPayload) => Promise<NextResponse> | NextResponse
) {
  return async (req: Request) => {
    try {
      const user = requireAdmin(req);
      return await handler(req, user);
    } catch (err) {
      return err as NextResponse;
    }
  };
}
