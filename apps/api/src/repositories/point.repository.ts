import prisma from '@/prisma';
import { CreatePoint } from '@/types/point.type';

export class PointRepository {
  static async createPoint(user_id: number, data: CreatePoint) {
    return await prisma.point.create({
      data: {
        total_point: data.total_point,
        expired_date: data.expired_date,
        user: { connect: { id: user_id } },
      },
    });
  }
}
