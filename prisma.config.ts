import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  // This tells Prisma where your migration files are
  // and how to run your seed file when you use `npx prisma db seed`.
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },

  // Prisma reads DATABASE_URL from your .env file.
  datasource: {
    url: env("DATABASE_URL"),
  },
});