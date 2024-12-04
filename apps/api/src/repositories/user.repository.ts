import prisma from '@/prisma';
import { RegisterRequest } from '@/types/auth.type';
import { UniqueUserField } from '@/types/user.type';
import { AdminEventQuery } from '@/types/admin.type';

export class UserRepository {
  static async findUserByUnique(identifier: UniqueUserField) {
    const { email, id, referral_code, username } = identifier;

    let whereCondition: any = {};
    if (!email && !id && !referral_code && !username) {
      throw new Error('At least on identifier have one property!');
    } else {
      whereCondition = { ...identifier };
    }

    return await prisma.user.findUnique({
      where: whereCondition,
      include: { point: true },
    });
  }

  static async createUser(request: RegisterRequest) {
    return await prisma.user.create({ data: request });
  }

  static async getAdminEvents(id: number, query: AdminEventQuery) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        Event: {
          include: { category: true, location: true },
          where: { event_name: { contains: query.name } },
          orderBy: { [query.sort_by!]: query.order_by },
        },
      },
    });
  }

  static async countAdminEvents(id: number, query: AdminEventQuery) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        _count: {
          select: { Event: { where: { event_name: { contains: query.name } } } },
        },
      },
    });
  }

  static async getUserProfile(id: number) {
    return await prisma.user.findUnique({
      where: { id: id },
      include: {
        Voucher: true,
        point: true,
      },
    });
  }

  static async findUserByIdIncludePoint(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: { point: true },
    });
  }
}
