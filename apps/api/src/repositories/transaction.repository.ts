import prisma from '@/prisma';
import { AdminEventTransactionQuery } from '@/types/admin.type';
import {
  PaymentStatus,
  StatusResponse,
  TotalSaleResponse,
} from '@/types/transaction.type';
import { Prisma } from '@prisma/client';

export class TransactionRepository {
  static async getEventWaiting(id: number) {
    return await prisma.transaction.findMany({
      where: {
        payment_status: PaymentStatus.WAITING,
        user_id: id,
      },
      include: {
        event: {
          include: {
            category: true,
            location: true,
          },
        },
      },
    });
  }

  static async getEventSuccess(id: number) {
    const today = new Date().toISOString();
    return await prisma.transaction.findMany({
      where: {
        payment_status: PaymentStatus.SUCCESS,
        user_id: id,
        event: {
          end_date: {
            gte: today,
          },
        },
      },
      include: {
        event: {
          include: {
            category: true,
            location: true,
          },
        },
      },
    });
  }

  static async getEventSuccessByDate(id: number) {
    const today = new Date().toISOString();
    return await prisma.transaction.findMany({
      where: {
        payment_status: 'success',
        user_id: id,
        event: {
          end_date: { lt: today },
        },
      },
      include: {
        event: {
          include: {
            Review: {
              where: {
                user_id: id,
              },
            },
            category: true,
            location: true,
          },
        },
      },
    });
  }

  static async getEventTransactions(
    id: number,
    query: AdminEventTransactionQuery,
  ) {
    return await prisma.transaction.findMany({
      where: { event: { user: { id: id } } },
      include: {
        user: { select: { username: true } },
        event: { select: { event_name: true } },
        voucer: { select: { name: true } },
      },
      skip: (Number(query.page) - 1) * Number(query.limit),
      take: Number(query.limit),
      orderBy: { [query.sort_by!]: query.order_by },
    });
  }

  static async countEventTransactions(id: number) {
    return await prisma.transaction.aggregate({
      _count: true,
      where: { event: { user: { id: id } } },
    });
  }

  static async getTotalSalesGroupByUpdatedAt(
    id: number,
    filter: { gte: Date | string; lte: Date | string },
  ): Promise<TotalSaleResponse[]> {
    const query = Prisma.sql`
    SELECT DATE(transactions.updated_at) as date,
      SUM(CASE WHEN transactions.discounted_price IS NULL THEN transactions.total_price ELSE transactions.discounted_price END) as revenue
    FROM transactions
    JOIN events ON events.id = transactions.eventId
    WHERE events.user_id = ${id}
      AND transactions.payment_status = 'success'
      AND transactions.updated_at BETWEEN ${filter.gte} AND ${filter.lte}
    GROUP BY date
    ORDER BY date ASC
    ;`;

    return await prisma.$queryRaw(query);
  }

  static async getTransactionStatusByUpdatedAt(
    id: number,
    filter: { gte: Date | string; lte: Date | string },
  ): Promise<StatusResponse[]> {
    const query = Prisma.sql`
    SELECT
      DATE(transactions.updated_at) as date,
      SUM(CASE WHEN transactions.payment_status = 'waiting' THEN 1 ELSE 0 END) as waiting,
      SUM(CASE WHEN transactions.payment_status = 'paid' THEN 1 ELSE 0 END) as paid,
      SUM(CASE WHEN transactions.payment_status = 'success' THEN 1 ELSE 0 END) as success,
      SUM(CASE WHEN transactions.payment_status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM transactions
    JOIN events ON events.id = transactions.eventId
    WHERE events.user_id = ${id}
      AND transactions.updated_at BETWEEN ${filter.gte} AND ${filter.lte}
    GROUP BY date
    ORDER BY date ASC
    ;`;

    return await prisma.$queryRaw(query);
  }

  static async getTransactionHasUser(transaction_id: number) {
    return await prisma.transaction.findUnique({
      where: { id: transaction_id },
      include: { event: { include: { user: true } } },
    });
  }

  static async updateTransactionStatus(
    transaction_id: number,
    status: PaymentStatus,
  ) {
    return await prisma.transaction.update({
      where: { id: transaction_id },
      data: { payment_status: status },
    });
  }

  static async checkoutUser(transaction_id: number, file: Express.Multer.File) {
    await prisma.transaction.update({
      where: { id: transaction_id },
      data: {
        payment_status: PaymentStatus.PAID,
        payment_path: `/assets/events/${file}`,
      },
    });
  }

  static async postPaidCheckout(
    transaction_id: number,
    file: Express.Multer.File,
  ) {
    await prisma.transaction.update({
      where: { id: Number(transaction_id) },
      data: {
        payment_status: PaymentStatus.PAID,
        payment_path: `/assets/transactions/${file.filename}`,
      },
    });
  }

  static async getDataCheckout(transaction_id: number) {
    return await prisma.transaction.findUnique({
      where: { id: Number(transaction_id) },
      include: { event: true },
    });
  }
}
