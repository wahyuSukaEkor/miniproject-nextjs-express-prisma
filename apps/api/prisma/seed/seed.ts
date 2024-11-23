import { PrismaClient } from '@prisma/client';
import { locations } from './locations';
import { categories } from './categories';

const prisma = new PrismaClient();

async function seed() {
  //seeding for locations
  for (const location of locations) {
    await prisma.location.create({ data: location });
  }

  //seeding for categories
  for (const category of categories) {
    await prisma.eventCategory.create({ data: category });
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seeding Success");
  });
