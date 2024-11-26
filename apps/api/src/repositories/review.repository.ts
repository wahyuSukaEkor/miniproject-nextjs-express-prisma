import prisma from '@/prisma';
import { CreateFeedback } from '@/types/review.type';

export class ReviewRepository {
  static async createReviews(id: number, data: CreateFeedback) {
    return await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        event: { connect: { id: data.eventId } },
        user: { connect: { id } },
      },
    });
  }
}
