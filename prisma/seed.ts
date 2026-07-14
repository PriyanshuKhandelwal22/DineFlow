import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const kitchenPassword = await bcrypt.hash("kitchen123", 10);

  console.log("Seeding system accounts...");

  // Seed Admin user
  await prisma.user.upsert({
    where: { email: "admin@menuverse.com" },
    update: {},
    create: {
      email: "admin@menuverse.com",
      name: "System Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Seed Kitchen user
  await prisma.user.upsert({
    where: { email: "kitchen@menuverse.com" },
    update: {},
    create: {
      email: "kitchen@menuverse.com",
      name: "Kitchen Chef",
      password: kitchenPassword,
      role: "KITCHEN",
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });