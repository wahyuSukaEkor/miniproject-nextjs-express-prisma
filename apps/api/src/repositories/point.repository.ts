import prisma from '@/prisma';
import { CreatePoint } from '@/types/point.type';

export class PointRepository {
  static async createPoint(user_id: number, data: CreatePoint) {
    return await prisma.point.create({
      data: {
        total_point: data.balance,
        expired_date: data.expiryDate,
        user: { connect: { id: user_id } },
      },
    });
  }
}
