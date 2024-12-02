import { PrismaClient } from '@prisma/client';
import { locations } from './locations';
import { categories } from './categories';
import { events } from './events';
import { users } from './users';
import { SALT } from '@/config';
import bcrypt from 'bcrypt';

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

  // //seeding for users
  // const hashPassword = (password: string) => {
  //   const salt = bcrypt.genSaltSync(Number(SALT));
  //   return bcrypt.hashSync(password, salt);
  // };
  // for (const user of users) {
  //   await prisma.user.create({
  //     data: {
  //       username: user.username,
  //       email: user.email,
  //       password: hashPassword(user.password),
  //       isAdmin: user.isAdmin,
  //       referral_code: user.referralCode,
  //     },
  //   });
  // }

  // //seeding for events
  // for (const event of events) {
  //   await prisma.event.create({
  //     data: {
  //       event_name: event.name,
  //       price: event.price,
  //       description: event.description,
  //       thumbnails_path: event.imageURL,
  //       available_seats: event.availableSeats,
  //       max_capacity: event.maxCapacity,
  //       buy_limit: event.limitCheckout,
  //       start_date: new Date(event.startDate),
  //       end_date: new Date(event.endDate),
  //       user: { connect: { id: event.userId } },
  //       location: { connect: { id: event.locationId } },
  //       category: { connect: { id: event.categoryId } },
  //     },
  //   });
  // }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seeding Success');
  });
