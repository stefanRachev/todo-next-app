//src/auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHibProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/User";
import connectToDatabase from "./lib/mongoDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHibProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("MissingCredentials");
          }

          await connectToDatabase();
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("UserNotFound");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("InvalidCredentials");
          }

          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorize Error:", error.message);
          throw new Error(error.message || "AuthenticationError");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  secret: process.env.AUTH_SECRET,
});
