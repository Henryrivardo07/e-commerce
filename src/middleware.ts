import { NextResponse } from "next/server";

// Minimal noop middleware — hanya melanjutkan request
export function middleware() {
  return NextResponse.next();
}

// (opsional) batasi hanya path tertentu
// export const config = { matcher: ["/seller/:path*", "/(app)/(.*)"] };
