import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Clearing all data…");

  // Delete in dependency order (children before parents)
  await prisma.rsvpEventSelection.deleteMany();
  await prisma.rsvp.deleteMany();
  await prisma.linkClick.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.category.deleteMany();
  await prisma.event.deleteMany();
  await prisma.wedding.deleteMany();

  console.log("✅ Database cleared.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
