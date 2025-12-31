import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|sitemap\\.xml|robots\\.txt|favicon\\.ico).*)",
  ],
};
