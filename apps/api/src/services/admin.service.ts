import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { UserRepository } from '@/repositories/user.repository';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  FilterDate,
} from '@/types/admin.type';
import { ErrorMessage } from '@/utils/errmessage';
import { decrementDate, incrementDate } from '@/utils/generatedate';
import { responseWithData } from '@/utils/response';
import { AdminValidation } from '@/validations/admin.validaton';
import { Validation } from '@/validations/validation';

export class AdminService {
  static async getAdminEventsStats(
    id: number,
    query: AdminEventQuery
  ): Promise<object> {
    const {
      sort_by = 'created_at',
      order_by = 'desc',
    } = Validation.validate(AdminValidation.EVENT_QUERY, query);

    const user = await UserRepository.getAdminEvents(id, { sort_by, order_by });

    if (!user) throw new ErrorMessage(404, 'No events found for this admin.');

    const eventsSummary = user.Event.map(({ event_id, event_name, category_id, location_id, created_at, updated_at }) => ({
      event_id,
      event_name,
      category_id,
      location_id,
      created_at,
      updated_at,
    }));

    return responseWithData(
      200,
      true,
      'Admin event statistics fetched successfully.',
      eventsSummary
    );
  }

  static async getAdminSalesStats(
    id: number,
    query: FilterDate
  ): Promise<object> {
    const { start_date: startDate, end_date: endDate } = Validation.validate(AdminValidation.FILTER_QUERY, query);

    const { gte, lte } = AdminService.getDateRange(startDate, endDate);

    const transactions = await TransactionRepository.getTotalSalesGroupByUpdatedAt(id, { gte, lte });

    return responseWithData(
      200,
      true,
      'Admin sales statistics fetched successfully.',
      transactions
    );
  }

  static async getAdminTransactionStatusStats(
    id: number,
    query: FilterDate
  ): Promise<object> {
    const { start_date: startDate, end_date: endDate } = Validation.validate(AdminValidation.FILTER_QUERY, query);

    const { gte, lte } = AdminService.getDateRange(startDate, endDate);

    const statuses = await TransactionRepository.getTransactionStatusByUpdatedAt(id, { gte, lte });

    return responseWithData(
      200,
      true,
      'Admin transaction status statistics fetched successfully.',
      statuses
    );
  }

  static async getAdminEventSummary(
    id: number,
    eventId: string
  ): Promise<object> {
    const newEventId = Validation.validate(EventValidation.EVENT_ID, eventId);

    const event = await EventRepository.getEventIncludeCategoryLocation(Number(newEventId));

    if (!event) throw new ErrorMessage(404, 'Event not found.');
    if (event.user_id !== id) throw new ErrorMessage(401, 'Unauthorized access to this event.');

    const eventSummary = {
      event_id: event.event_id,
      event_name: event.event_name,
      category_id: event.category_id,
      location_id: event.location_id,
      created_at: event.created_at,
      updated_at: event.updated_at,
    };

    return responseWithData(200, true, 'Event summary fetched successfully.', eventSummary);
  }


  private static getDateRange(
    startDate?: string | Date,
    endDate?: string | Date
  ): { gte: Date; lte: Date } {
    const currentDate = new Date();
    const past7Days = decrementDate(currentDate, 7);

    const gte = startDate ? new Date(startDate) : past7Days;
    const lte = endDate ? incrementDate(new Date(endDate), 1) : incrementDate(currentDate, 1);

    return { gte, lte };
  }
}
