import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all data from dependent tables first (order matters due to FKs)
  await prisma.linkClick.deleteMany({});
  await prisma.rsvpEventSelection.deleteMany({});
  await prisma.rsvp.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.guest.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.wedding.deleteMany({});
  await prisma.partner.deleteMany({});

  // Create fresh wedding for Sajin & Keerthana
  const wedding = await prisma.wedding.create({
    data: {
      slug: 'sajin-and-keerthana',
      bride_name: 'Sajin',
      groom_name: 'Keerthana',
      bride_family: 'Bride Family',
      groom_family: 'Groom Family',
      wedding_date: new Date('2026-05-01'),
      greeting_default: "You're warmly invited to celebrate with us",
      tier: 'CLASSIC',
      is_active: true,
      config_json: {},
      site_config: {},
    },
  });

  // Optionally, add a sample category and guest
  const category = await prisma.category.create({
    data: {
      wedding_id: wedding.id,
      name: 'Friends',
      slug: 'friends',
      created_at: new Date(),
    },
  });

  await prisma.guest.create({
    data: {
      wedding_id: wedding.id,
      category_id: category.id,
      name: 'Sample Guest',
      phone: '9876543210',
      slug: 'sample-guest',
      relation: 'Friend',
      side: 'GROOM',
      is_vip: true,
      created_at: new Date(),
    },
  });

  console.log('Database reset and seeded for Sajin & Keerthana.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
