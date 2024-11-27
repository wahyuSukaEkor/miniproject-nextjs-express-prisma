import { EventQuery, EventRequest } from '@/types/event.type';
import prisma from '@/prisma';
import { AdminEventQueryValidated } from '@/types/admin.type';
export class EventRepository {
  static async getEvents(query: EventQuery) {
    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      location_id: query.location_id ? Number(query.location_id) : undefined,
      category_id: query.category_id ? Number(query.category_id) : undefined,
      event_name: query.event_name ? String(query.event_name) : undefined,
      start_date: query.start_date
        ? new Date(query.start_date).toISOString()
        : undefined,
      end_date: query.end_date
        ? new Date(query.end_date).toISOString()
        : undefined,
    };

    return await prisma.event.findMany({
      where: {
        event_name: { contains: query.event_name },
        category_id: filter.category_id,
        location_id: filter.location_id,
        start_date:
          filter.start_date || filter.end_date
            ? {
                ...(filter.start_date && { gte: filter.start_date }),
                ...(filter.end_date && { lte: filter.end_date }),
              }
            : undefined,
      },
      include: { category: true, location: true },
      orderBy: { created_at: 'desc' },
      skip: (Number(query.page) - 1) * Number(query.limit),
      take: Number(query.limit),
    });
  }

  static async getTotalEvents(query: EventQuery) {
    const filter: any = {
      price: query.price ? Number(query.price) : undefined,
      location_id: query.location_id ? Number(query.location_id) : undefined,
      category_id: query.category_id ? Number(query.category_id) : undefined,
      start_date: query.start_date
        ? new Date(query.start_date).toISOString()
        : undefined,
      end_date: query.end_date
        ? new Date(query.end_date).toISOString()
        : undefined,
    };

    return await prisma.event.count({
      where: {
        event_name: filter.event_name ? { contains: filter.event_name } : undefined,
        category_id: filter.category_id,
        location_id: filter.location_id,
        ...(filter.start_date || filter.end_date
          ? {
              start_date: {
                ...(filter.start_date && { gte: filter.start_date }),
                ...(filter.end_date && { lte: filter.end_date }),
              },
            }
          : {}),
      },
    });
  }

  static async getEventsBySearch(query: EventQuery) {
    const filter: any = {
      event_name: query.event_name ? String(query.event_name) : undefined,
      location_id: query.location_id ? Number(query.location_id) : undefined,
      category_id: query.category_id ? Number(query.category_id) : undefined,
    };

    return await prisma.event.findMany({
      where: {
        event_name: { contains: query.event_name },
        category_id: filter.category_id,
        location_id: filter.location_id,
      },
      include: {
        category: { select: { category_name: true } },
        location: true,
      },
      skip: (Number(query.page) - 1) * Number(query.limit), // Lewati data sejumlah offset
      take: Number(query.limit), // Ambil sejumlah data sesuai limit
    });
  }

  static async getTotalEventsBySearch(query: EventQuery) {
    const filter: any = {
      event_name: query.event_name ? String(query.event_name) : undefined,
      location_id: query.location_id ? Number(query.location_id) : undefined,
      category_id: query.category_id ? Number(query.category_id) : undefined,
    };

    return await prisma.event.count({
      where: {
        event_name: { contains: filter.event_name },
        location_id: filter.location_id,
        category_id: filter.category_id,
      },
    });
  }

  static async getEventByIdWithInclude(query: EventQuery) {
    const eventId = Number(query.id);

    return await prisma.event.findMany({
      where: { id: eventId },
      include: { category: true, location: true, user: true },
    });
  }

  static async getEventById(id: number) {
    return await prisma.event.findUnique({ where: { id } });
  }

  static async getEventByIdWithTransaction(eventId: number, user_id: number) {
    return await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        Transaction: { where: { user_id }, select: { quantity: true } },
      },
    });
  }

  static async createEvent(
    id: number,
    request: EventRequest,
    file: Express.Multer.File,
  ) {
    return await prisma.event.create({
      data: {
        event_name: request.event_name,
        price: request.price,
        description: request.description,
        thumbnails_path: `/assets/events/${file.filename}`,
        buy_limit: request.buy_limit,
        max_capacity: request.max_capacity,
        available_seats: request.max_capacity,
        start_date: new Date(request.start_date),
        end_date: new Date(request.end_date),
        user: { connect: { id } },
        location: { connect: { id: request.location_id } },
        category: { connect: { id: request.category_id } },
      },
    });
  }

  static async getEventByUser(id: number) {
    return await prisma.event.findMany({
      where: { user_id: id },
    });
  }

  static async getEventIncludeTransactionWithPagination(
    id: number,
    query: AdminEventQueryValidated,
  ) {
    const { limit, order_by, page, sort_by } = query;

    return await prisma.event.findUnique({
      where: { id, Transaction: { some: { payment_status: 'success' } } },
      include: {
        Transaction: {
          include: { user: true },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { [sort_by]: order_by },
        },
      },
    });
  }

  static async countEventTransactions(eventId: number) {
    return await prisma.event.findUnique({
      where: { id: eventId },
      select: { _count: { select: { Transaction: true } } },
    });
  }

  static async getEventIncludeCategoryLocation(id: number) {
    return await prisma.event.findUnique({
      where: { id },
      include: { category: true, location: true },
    });
  }

  static async updateEvent(
    id: number,
    eventId: number,
    request: EventRequest,
    file?: Express.Multer.File,
  ) {
    const data: any = {};

    if (request.event_name) data['event_name'] = request.event_name;
    if (request.price) data['price'] = request.price;
    if (request.description) data['description'] = request.description;
    if (request.buy_limit) data['buy_limit'] = request.buy_limit;
    if (request.max_capacity) data['max_capacity'] = request.max_capacity;
    if (request.start_date) data['start_date'] = new Date(request.start_date);
    if (request.end_date) data['end_date'] = new Date(request.end_date);
    if (request.location_id) data['location_id'] = request.location_id;
    if (request.category_id) data['category_id'] = request.category_id;
    if (file) data['thumbnails_path'] = `/assets/events/${file.filename}`;

    return await prisma.event.update({
      where: { id: eventId },
      data: data,
    });
  }

  static async deleteEvent(id: number) {
    return await prisma.event.delete({ where: { id } });
  }
}
