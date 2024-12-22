//src/auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHibProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import connectToDatabase from "./lib/mongoDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      try {
        await connectToDatabase();

        if (account?.provider === "google") {
          const { email, name, sub } = profile;

          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              email,
              name,
              authProvideId: sub,
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session, token }) {
      console.log("Session Callback Token:", token);
      if (token) {
        session.user.id = token.id || token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        if (token.authProvideId) {
          session.user.authProvideId = token.authProvideId;
        }
      }
      return session;
    },
  },
  async jwt({ token, user }) {
    if (user) {
      console.log("JWT Callback User:", user);
      token.id = user.id || user.sub;
      token.email = user.email;
      token.name = user.name;
      if (user.authProvideId) {
        token.authProvideId = user.authProvideId;
      }
    }
    return token;
  },
});
