import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET; 

export async function middleware(req) {
  console.log("Middleware executed on", req.nextUrl.pathname);

 
  const token = await getToken({ req, secret });

  if (!token) {

    console.log("No session found. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Valid session found:", token);

 
  return NextResponse.next();
}


export const config = {
  matcher: ["/home","/purchases"], 
};
