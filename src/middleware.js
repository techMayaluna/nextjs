import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/home:path*"]
};

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const cookiesStore = cookies();

  const accessToken = cookiesStore.get("user");

  if (!accessToken)
    return NextResponse.redirect(new URL("/login", request.url));
}
