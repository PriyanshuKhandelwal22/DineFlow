// auth.ts
// Using JWT strategy — NO database adapter needed for session management.
// PrismaAdapter is for database sessions only and conflicts with JWT strategy.
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// ── Type augmentation: add role and id to NextAuth session and JWT ──
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Spread edge-safe config (session strategy, pages, callbacks)
  ...authConfig,

  // ── Credentials Provider ──
  // Validates email + password against the User table in Neon PostgreSQL.
  // bcrypt.compare checks the hashed password stored during seeding.
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase();

        // Look up user by email in database
        const user = await db.user.findUnique({
          where: { email },
        });

        // Return null if user not found or has no password
        if (!user || !user.password) {
          return null;
        }

        // Compare submitted password against bcrypt hash
        const passwordMatch = await bcrypt.compare(
          String(credentials.password),
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        // Return the user object — role gets picked up by JWT callback in auth.config.ts
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
