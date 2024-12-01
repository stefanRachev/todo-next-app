//src/auth.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHibProvider from "next-auth/providers/github";
//import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
