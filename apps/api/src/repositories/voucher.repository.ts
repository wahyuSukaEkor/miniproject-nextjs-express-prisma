import prisma from '@/prisma';
import { CreateVoucher } from '@/types/voucher.type';

export class VoucherRepository {
  static async createVoucher(id: number, data: CreateVoucher) {
    return await prisma.voucher.create({
      data: {
        discount: data.discount,
        max_usage: data.max_usage,
        name: data.name,
        event: { connect: { id: data.eventId } },
        user: { connect: { id } },
      },
    });
  }

  static async findVoucherById(id: number) {
    return await prisma.voucher.findUnique({
      where: { id },
    });
  }

  static async getVoucherById(id: number, eventId: number) {
    return await prisma.voucher.findMany({
      where: { user_id : id, eventId },
    });
  }

  static async getVoucherByCreator (eventId: number){
    return await prisma.voucher.findMany({
      where: {eventId: eventId}
    })
    
  }
}
