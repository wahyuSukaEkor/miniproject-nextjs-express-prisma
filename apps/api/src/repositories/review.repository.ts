import prisma from '@/prisma';
import { CreateFeedback } from '@/types/review.type';

export class ReviewRepository {
  static async createReviews(id: number, data: CreateFeedback) {
    return await prisma.feedback.create({
      data: {
        rating: data.rating,
        message: data.message,
        event: { connect: { id: data.eventId } },
        user: { connect: { id } },
      },
    });
  }
}
