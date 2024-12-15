//middleware.js

//export { auth as middleware } from "@/auth"

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  req.user = token; 
  return NextResponse.next();
}


export const config = {
    matcher: ["/purchases/:path*", "/api/purchases/:path*"],
};
