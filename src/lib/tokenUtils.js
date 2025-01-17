import { getToken } from "next-auth/jwt";

export async function getUserIdFromToken(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  if (!token) {
    throw new Error("Не сте влезли в системата");
  }
console.log(token?.email);

  //return token?.accessToken;
  return token?.email;
}
