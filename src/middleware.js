// src/middleware.js

import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/purchases",
  runtime: "nodejs",
};
