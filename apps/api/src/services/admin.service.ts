// import prisma from '@/prisma';
// import { EventRepository } from '@/repositories/event.repository';
// import { TransactionRepository } from '@/repositories/transaction.repository';
// import { UserRepository } from '@/repositories/user.repository';
// import {
//   AdminEventQuery,
//   AdminEventTransactionQuery,
//   FilterDate,
// } from '@/types/admin.type';
// import { ErrorMessage } from '@/utils/errmessage';
// import { decrementDate, incrementDate } from '@/utils/generateDate';
// import {
//   responseDataWithPagination,
//   responseWithData,
// } from '@/utils/response';
// import { AdminValidation } from '@/validations/admin.validaton';
// import { Validation } from '@/validations/validation';

// export class AdminService {
//   static async getAdminEventsStats(id: number, query: AdminEventQuery) {
//     const adminEventQuery = Validation.validate(
//       AdminValidation.EVENT_QUERY,
//       query,
//     );

//     if (!adminEventQuery.page) adminEventQuery.page = 1;
//     if (!adminEventQuery.limit) adminEventQuery.limit = 10;
//     if (!adminEventQuery.sort_by) adminEventQuery.sort_by = 'created_at';
//     if (!adminEventQuery.order_by) adminEventQuery.order_by = 'desc';


//     const user = await UserRepository.getAdminEvents(id, adminEventQuery);
//     const allEvents = await UserRepository.countAdminEvents(id, adminEventQuery);


//     const eventsSummary = user?.Event.map(
//       ({ event_id, event_name, category_id, location_id, created_at, updated_at }) => ({
//         event_id,
//         event_name,
//         category_id,
//         location_id,
//         created_at,
//         updated_at,
//       }),
//     );

//     return responseDataWithPagination(
//       200,
//       'Get admin event statistics successfully',
//       eventsSummary!,
//       Number(adminEventQuery.page),
//       Number(adminEventQuery.limit),
//       allEvents?._count.Event || 0,
//     );
//   }

//   static async getAdminSalesStats(id: number, query: FilterDate) {
//     const { start_date: startDate, end_date: endDate } = Validation.validate(
//       AdminValidation.FILTER_QUERY,
//       query,
//     );


//     const currentDate = new Date();
//     let lte = incrementDate(currentDate, 1);
//     if (endDate) lte = incrementDate(new Date(endDate), 1);


//     const past7Days = decrementDate(currentDate, 7);


//     const transactions =
//       await TransactionRepository.getTotalSalesGroupByUpdatedAt(id, {
//         gte: startDate ?? past7Days,
//         lte,
//       });

//     return responseWithData(
//       200,
//       true,
//       'Get admin total sales statistics successfully',
//       transactions,
//     );
//   }

//   static async getAdminTransactionStatusStats(id: number, query: FilterDate) {
//     const { start_date: startDate, end_date: endDate } = Validation.validate(
//       AdminValidation.FILTER_QUERY,
//       query,
//     );


//     const currentDate = new Date();
//     let lte = incrementDate(currentDate, 1);
//     if (endDate) lte = incrementDate(new Date(endDate), 1);


//     const past7Days = decrementDate(currentDate, 7);


//     const statuses =
//       await TransactionRepository.getTransactionStatusByUpdatedAt(id, {
//         gte: startDate ?? past7Days,
//         lte,
//       });

//     return responseWithData(
//       200,
//       true,
//       'Get admin transaction status statistics',
//       statuses,
//     );
//   }

//   static async getAdminEventSummary(id: number, eventId: string) {
//     const newEventId = Validation.validate(EventValidation.EVENT_ID, eventId);


//     const event = await EventRepository.getEventIncludeCategoryLocation(
//       Number(newEventId),
//     );

//     if (!event) throw new ErrorMessage(404, 'Event not found!');
//     if (event.user_id !== id) throw new ErrorMessage(401, 'This event is not yours!');

//     const eventSummary = {
//       event_id: event.event_id,
//       event_name: event.event_name,
//       category_id: event.category_id,
//       location_id: event.location_id,
//       created_at: event.created_at,
//       updated_at: event.updated_at,
//     };

//     return responseWithData(200, true, 'Success get event summary', eventSummary);
//   }
// }
