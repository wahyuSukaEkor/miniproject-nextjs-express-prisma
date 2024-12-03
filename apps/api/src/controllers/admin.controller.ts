import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  FilterDate,
} from '@/types/admin.type';
import { TransactionStatus } from '@/types/transaction.type';
import { ErrorResponse } from '@/utils/error';
import { decrementDate, incrementDate } from '@/utils/generatedate';
import {
  responseDataWithPagination,
  responseWithData,
  responseWithoutData,
} from '@/utils/response';
import { AdminValidation } from '@/validations/admin.validaton';
import { EventValidation } from '@/validations/event.validation';
import { TransactionValidation } from '@/validations/transaction.validation';
import { Validation } from '@/validations/validation';

export class AdminService {
  static async getAdminEvents(id: number, query: AdminEventQuery) {
    const adminEventQuery = Validation.validate(
      AdminValidation.EVENT_QUERY,
      query,
    );

    if (!adminEventQuery.page) adminEventQuery.page = 1;
    if (!adminEventQuery.limit) adminEventQuery.limit = 10;
    if (!adminEventQuery.sort_by) adminEventQuery.sort_by = 'created_at';
    if (!adminEventQuery.order_by) adminEventQuery.order_by = 'desc';

    const user = await UserRepository.getAdminEvents(id, adminEventQuery);

    const allEvents = await UserRepository.countAdminEvents(
      id,
      adminEventQuery,
    );

    const events = user?.Event.map(
      ({ user_id, category_id, location_id, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get admin events successfully',
      events!,
      Number(adminEventQuery.page),
      Number(adminEventQuery.limit),
      allEvents?._count.Event || 0,
    );
  }

  static async getAdminEventTransactions(
    id: number,
    query: AdminEventTransactionQuery,
  ) {
    const eventQuery = Validation.validate(
      AdminValidation.EVENT_TRANSACTION_QUERY,
      query,
    );

    if (!eventQuery.page) eventQuery.page = 1;
    if (!eventQuery.limit) eventQuery.limit = 10;
    if (!eventQuery.sort_by) eventQuery.sort_by = 'created_at';
    if (!eventQuery.order_by) eventQuery.order_by = 'desc';

    const eventTransactions = await TransactionRepository.getEventTransactions(
      id,
      eventQuery,
    );

    const allTransactions =
      await TransactionRepository.countEventTransactions(id);

    const transactions = eventTransactions?.map(
      ({ user_id, eventId, voucer_id, ...rest }) => rest,
    );

    return responseDataWithPagination(
      200,
      'Get admin event transactions successfully',
      transactions,
      Number(eventQuery.page),
      Number(eventQuery.limit),
      allTransactions._count,
    );
  }

  static async getAdminTotalSales(id: number, query: FilterDate) {
    const { start_date: startDate, end_date: endDate } = Validation.validate(
      AdminValidation.FILTER_QUERY,
      query,
    );

    // handle date
    const currentDate = new Date();
    let lte = incrementDate(currentDate, 1);
    if (endDate) lte = incrementDate(new Date(endDate), 1);

    // 7 days ago
    const past7Days = decrementDate(currentDate, 7);

    const transactions =
      await TransactionRepository.getTotalSalesGroupByUpdatedAt(id, {
        gte: startDate ?? past7Days,
        lte,
      });

    return responseWithData(
      200,
      true,
      'Get admin total sales successfully',
      transactions,
    );
  }

  static async getAdminTransactionStatus(id: number, query: FilterDate) {
    const { start_date: startDate, end_date: endDate } = Validation.validate(
      AdminValidation.FILTER_QUERY,
      query,
    );

    // handle date
    const currentDate = new Date();
    let lte = incrementDate(currentDate, 1);
    if (endDate) lte = incrementDate(new Date(endDate), 1);

    // 7 days ago
    const past7Days = decrementDate(currentDate, 7);

    const statuses =
      await TransactionRepository.getTransactionStatusByUpdatedAt(id, {
        gte: startDate ?? past7Days,
        lte,
      });

    return responseWithData(
      200,
      true,
      'Get admin transaction status',
      statuses,
    );
  }

  static async updateAdminTransactionStatus(
    id: number,
    transaction_id: string,
    request: TransactionStatus,
  ) {
    const newTransactionId = Validation.validate(
      TransactionValidation.TRANSACTION_ID,
      transaction_id,
    );
    const { status } = Validation.validate(
      AdminValidation.UPDATE_TRANSACTION_STATUS,
      request,
    );

    const transaction = await TransactionRepository.getTransactionHasUser(
      Number(newTransactionId),
    );

    if (!transaction) throw new ErrorResponse(404, 'Transaction not found!');

    if (transaction.event.user.id !== id) {
      throw new ErrorResponse(401, 'This event is not yours!');
    }

    await TransactionRepository.updateTransactionStatus(
      Number(newTransactionId),
      status,
    );

    return responseWithoutData(
      200,
      true,
      'Update transaction status successfully',
    );
  }

  static async getAdminEventParticipations(
    id: number,
    eventId: string,
    query: AdminEventQuery,
  ) {
    const newEventId = Validation.validate(EventValidation.EVENT_ID, eventId);
    const adminEventQuery = Validation.validate(
      AdminValidation.EVENT_QUERY,
      query,
    );

    if (!adminEventQuery.page) adminEventQuery.page = 1;
    if (!adminEventQuery.limit) adminEventQuery.limit = 10;
    if (!adminEventQuery.sort_by) adminEventQuery.sort_by = 'created_at';
    if (!adminEventQuery.order_by) adminEventQuery.order_by = 'desc';

    const event =
      await EventRepository.getEventIncludeTransactionWithPagination(
        Number(newEventId),
        {
          limit: Number(adminEventQuery.limit),
          page: Number(adminEventQuery.page),
          sort_by: adminEventQuery.sort_by,
          order_by: adminEventQuery.order_by,
        },
      );

    if (!event) {
      return responseWithData(200, true, "Event don't have participations", []);
    }

    if (event.user_id !== id) {
      throw new ErrorResponse(401, 'This event is not yours!');
    }

    const transactions = event.Transaction.map((transaction) => {
      return {
        transaction_id: transaction.id,
        username: transaction.user.username,
        email: transaction.user.email,
        quantity: transaction.quantity,
        payment_status: transaction.payment_status,
        created_at: transaction.created_at,
      };
    });

    const allEventTransactions = await EventRepository.countEventTransactions(
      Number(eventId),
    );

    return responseDataWithPagination(
      200,
      'Get admin event participations successfully',
      transactions,
      Number(adminEventQuery.page),
      Number(adminEventQuery.limit),
      allEventTransactions?._count.Transaction || 0,
    );
  }

  static async getTransaction(id: number, transaction_id: string) {
    const newTransactionId = Validation.validate(
      TransactionValidation.TRANSACTION_ID,
      transaction_id,
    );

    const transaction = await TransactionRepository.getTransactionHasUser(
      Number(newTransactionId),
    );

    if (!transaction) throw new ErrorResponse(404, 'Transaction not found!');

    if (transaction.event.user.id !== id) {
      throw new ErrorResponse(401, 'This transaction is not yours!');
    }

    const { event, ...newTransaction } = transaction;
    return responseWithData(
      200,
      true,
      'Success get transaction',
      newTransaction,
    );
  }

  static async getTransactionDetails(id: number, transaction_id: string) {
    const newTransactionId = Validation.validate(
      TransactionValidation.TRANSACTION_ID,
      transaction_id,
    );

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(newTransactionId) },
      include: { TransactionDetail: true, event: { include: { user: true } } },
    });

    if (!transaction) throw new ErrorResponse(404, 'Transaction not found!');

    if (transaction.event.user.id !== id) {
      throw new ErrorResponse(401, 'This transaction is not yours!');
    }

    const { TransactionDetail } = transaction;
    return responseWithData(
      200,
      true,
      'Success get transaction details',
      TransactionDetail,
    );
  }

  static async getEvent(id: number, eventId: string) {
    const newEventId = Validation.validate(EventValidation.EVENT_ID, eventId);

    const event = await EventRepository.getEventIncludeCategoryLocation(
      Number(newEventId),
    );

    if (!event) throw new ErrorResponse(404, 'Event not found!');

    if (event.user_id !== id) {
      throw new ErrorResponse(401, 'This event is not yours!');
    }

    return responseWithData(200, true, 'Success get event', event);
  }
}


export class AdminController {
  public async getAdminEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as AdminEventQuery;

      const response = await AdminService.getAdminEvents(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getEventTransactions(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as AdminEventTransactionQuery;

      const response = await AdminService.getAdminEventTransactions(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getTotalSales(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as FilterDate;

      const response = await AdminService.getAdminTotalSales(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const query = req.query as FilterDate;

      const response = await AdminService.getAdminTransactionStatus(id, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async updateTransactionStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const transaction_id = req.params.transaction_id;
      const request = req.body as TransactionStatus;

      const response = await AdminService.updateAdminTransactionStatus(
        id,
        transaction_id,
        request,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getEventParticipations(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const eventId = req.params.eventId;
      const query = req.query as AdminEventQuery;

      const response = await AdminService.getAdminEventParticipations(
        id,
        eventId,
        query,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const transaction_id = req.params.transaction_id;

      const response = await AdminService.getTransaction(id, transaction_id);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getTransactionDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = res.locals.decoded.id as number;
      const transaction_id = req.params.transaction_id;

      const response = await AdminService.getTransactionDetails(
        id,
        transaction_id,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const eventId = req.params.eventId;

      const response = await AdminService.getEvent(id, eventId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
