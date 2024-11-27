import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { ReviewRepository } from '@/repositories/review.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import {
  TransactionCheckout,
  TransactionRequest,
} from '@/types/transaction.type';
import { ErrorResponse } from '@/utils/error';
import { generateTicketCode } from '@/utils/randomGenerator';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { TransactionValidation } from '@/validations/transaction.validation';
import { Validation } from '@/validations/validation';
import { PaymentStatus } from '@prisma/client';
import multer from 'multer';

export class TransactionService {
  static async createTransaction(id: number, request: TransactionRequest) {
    const { eventId, seatRequests, point_used, voucer_id } =
      Validation.validate(TransactionValidation.CREATE, request);

    // check event availability
    const event = await EventRepository.getEventByIdWithTransaction(
      eventId,
      id,
    );
    if (!event) throw new ErrorResponse(404, 'Event not found!');

    if (seatRequests > event.buy_limit) {
      throw new ErrorResponse(400, 'Seat requests exceeds limit checkout!');
    }

    if (event.available_seats < seatRequests) {
      throw new ErrorResponse(400, 'Not enough seats available!');
    }

    if (new Date(event.end_date).getTime() < new Date().getTime()) {
      throw new ErrorResponse(400, 'Event has ended!');
    }

    if (event.Transaction.length) {
      const userTransactions = event.Transaction.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);

      if (userTransactions >= event.buy_limit) {
        throw new ErrorResponse(400, 'You have reached limit checkout!');
      }

      if (userTransactions + seatRequests > event.buy_limit) {
        throw new ErrorResponse(400, 'Seat requests exceeds limit checkout!');
      }
    }

    // check voucher owned by user and event
    let voucher: any = null;
    if (voucer_id) {
      voucher = await VoucherRepository.findVoucherById(voucer_id);
      if (!voucher) throw new ErrorResponse(404, 'Voucher not found!');

      if (voucher.userId !== id && voucher.eventId !== eventId) {
        throw new ErrorResponse(400, 'Voucher cannot be used!');
      }

      if (
        !voucher.eventId &&
        new Date(voucher.expired_date!).getTime() < new Date().getTime()
      ) {
        throw new ErrorResponse(400, 'Voucher has expired!');
      }

      if (voucher.usage >= voucher.maxUsage) {
        throw new ErrorResponse(400, 'Voucher has reached its limit!');
      }
    }

    // check redeemable points
    const user = await UserRepository.findUserByIdIncludePoint(id);
    if (point_used) {
      if (!user?.point) throw new ErrorResponse(400, 'User has no points!');

      if (point_used > user.point.total_point) {
        throw new ErrorResponse(400, 'Redeemed points exceeds balance!');
      }

      if (new Date(user.point.expired_date).getTime() < new Date().getTime()) {
        throw new ErrorResponse(400, 'Point has expired!');
      }
    }

    if (!event.price && (point_used || voucer_id)) {
      throw new ErrorResponse(400, 'Event is free!');
    }

    // transaction for event is free
    if (!event.price) {
      await prisma.$transaction(async (tx) => {
        await tx.event.update({
          data: {
            available_seats: event.available_seats - seatRequests,
          },
          where: { id: event.id },
        });

        const transaction = await tx.transaction.create({
          data: {
            base_price: event.price,
            quantity: seatRequests,
            total_price: 0,
            payment_status: 'success',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });

        const prefixTicketCode = event.event_name.slice(0, 3).toUpperCase();
        for (let index = 0; index < seatRequests; index++) {
          await tx.transactionDetail.create({
            data: {
              ticket_code: generateTicketCode(prefixTicketCode),
              transaction: { connect: { id: transaction.id } },
            },
          });
        }
      });

      return responseWithoutData(201, true, 'Transaction created!');
    }

    // transaction for event is not free
    await prisma.$transaction(async (tx) => {
      await tx.event.update({
        data: {
          available_seats: event.available_seats - seatRequests,
        },
        where: { id: event.id },
      });

      let transaction: any = null;
      if (voucer_id && point_used) {
        const total_price = event.price * seatRequests;
        const totalDiscount = (total_price * voucher.discount) / 100;
        const amountAfterDiscount = total_price - totalDiscount;

        await tx.voucher.update({
          where: { id: voucer_id },
          data: { usage: { increment: 1 } },
        });

        if (amountAfterDiscount <= point_used) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { total_point: { decrement: amountAfterDiscount } },
          });

          transaction = await tx.transaction.create({
            data: {
              base_price: event.price,
              quantity: seatRequests,
              total_price,
              discounted_price: 0,
              payment_status: 'success',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              voucer: { connect: { id: voucer_id } },
              point_used: amountAfterDiscount,
            },
          });
        } else {
          const totalAmount = amountAfterDiscount - point_used;
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { total_point: { decrement: point_used } },
          });

          transaction = await tx.transaction.create({
            data: {
              base_price: event.price,
              quantity: seatRequests,
              total_price,
              discounted_price: totalAmount,
              payment_status: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              voucer: { connect: { id: voucer_id } },
              point_used,
            },
          });
        }
      } else if (voucer_id) {
        const total_price = event.price * seatRequests;
        const totalDiscount = (total_price * voucher.discount) / 100;
        const amountAfterDiscount = total_price - totalDiscount;

        await tx.voucher.update({
          where: { id: voucer_id },
          data: { usage: { increment: 1 } },
        });

        transaction = await tx.transaction.create({
          data: {
            base_price: event.price,
            quantity: seatRequests,
            total_price,
            discounted_price: amountAfterDiscount,
            payment_status: amountAfterDiscount === 0 ? 'success' : 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
            voucer: { connect: { id: voucer_id } },
          },
        });
      } else if (point_used) {
        const total_price = event.price * seatRequests;

        if (total_price <= point_used) {
          await tx.point.update({
            where: { id: user?.point?.id },
            data: { total_point: { decrement: total_price } },
          });

          transaction = await tx.transaction.create({
            data: {
              base_price: event.price,
              quantity: seatRequests,
              total_price,
              discounted_price: 0,
              payment_status: 'success',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              point_used: total_price,
            },
          });
        } else {
          const totalAmount = total_price - point_used;

          await tx.point.update({
            where: { id: user?.point?.id },
            data: { total_point: { decrement: point_used } },
          });

          transaction = await tx.transaction.create({
            data: {
              base_price: event.price,
              quantity: seatRequests,
              total_price,
              discounted_price: totalAmount,
              payment_status: 'waiting',
              user: { connect: { id } },
              event: { connect: { id: eventId } },
              point_used,
            },
          });
        }
      } else {
        transaction = await tx.transaction.create({
          data: {
            base_price: event.price,
            quantity: seatRequests,
            total_price: event.price * seatRequests,
            payment_status: 'waiting',
            user: { connect: { id } },
            event: { connect: { id: eventId } },
          },
        });
      }

      const prefixTicketCode = event.event_name.slice(0, 3).toUpperCase();
      for (let index = 0; index < seatRequests; index++) {
        await tx.transactionDetail.create({
          data: {
            ticket_code: generateTicketCode(prefixTicketCode),
            transaction: { connect: { id: transaction.id } },
          },
        });
      }
    });

    return responseWithoutData(201, true, 'Transaction created!');
  }

  static async getPaymentStatusWaiting(id: number) {
    const transactions = await TransactionRepository.getEventWaiting(id);

    const response = transactions.map((transaction) => {
      return { transactionId: transaction.id, total_price:transaction.total_price, discounted_price:transaction.discounted_price, ...transaction.event };
    });

    return responseWithData(
      200,
      true,
      'success get event status waiting',
      response,
    );
  }

  static async getPaymentStatusSuccess(id: number) {
    const transactions = await TransactionRepository.getEventSuccess(id);

    const response = transactions.map((transaction) => {
      return { ...transaction.event, total_price:transaction.total_price, discounted_price:transaction.discounted_price};
    });

    return responseWithData(
      200,
      true,
      'success get event status success',
      response,
    );
  }

  static async getPaymentStatusSuccessByDate(id: number) {
    const transactions = await TransactionRepository.getEventSuccessByDate(id);

    const response = transactions.map((transaction) => {
      return { ...transaction.event, total_price:transaction.total_price, discounted_price:transaction.discounted_price };
    });

    return responseWithData(
      200,
      true,
      'success get event status  By Date',
      response,
    );
  }

  static async checkoutUser(
    id: number,
    transactionId: string,
    file: Express.Multer.File,
  ) {
    const newTransactionId = Validation.validate(
      TransactionValidation.TRANSACTION_ID,
      transactionId,
    );
    const validateFile = TransactionValidation.fileValidation(file);

    const userTransactions = await TransactionRepository.getDataCheckout(
      Number(newTransactionId),
    );
    console.log('TEST', userTransactions);
    if (!userTransactions) {
      throw new ErrorResponse(404, 'Transaction not found!');
    }

    if (userTransactions.user_id !== id) {
      throw new ErrorResponse(401, 'Transaction is not yours');
    }

    if (userTransactions.payment_status !== PaymentStatus.waiting) {
      throw new ErrorResponse(
        401,
        'Transaction has been paid or the transaction status is complete',
      );
    }

    const today = new Date().getTime();
    if (userTransactions.event.end_date.getTime() < today) {
      throw new ErrorResponse(400, 'Event time has passed');
    }

    await TransactionRepository.postPaidCheckout(
      Number(newTransactionId),
      validateFile,
    );

    return responseWithoutData(200, true, 'Payment successful');
  }
}
