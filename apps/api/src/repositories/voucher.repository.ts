import prisma from '@/prisma';
import { CreateVoucher } from '@/types/voucher.type';

export class VoucherRepository {
  static async createVoucher(id: number, data: CreateVoucher) {
    return await prisma.voucher.create({
      data: {
        discount: data.discount,
        max_usage: data.max_usage,
        name: data.name,
        event: { connect: { event_id: data.event_id } },
        user: { connect: { user_id : id } },
      },
    });
  }

  static async findVoucherById(id: number) {
    return await prisma.voucher.findUnique({
      where: { voucer_id : id },
    });
  }

  static async getVoucherById(id: number, event_id: number) {
    return await prisma.voucher.findMany({
      where: { user_id : id, event_id },
    });
  }

  static async getVoucherByCreator (event_id: number){
    return await prisma.voucher.findMany({
      where: {event_id: event_id}
    })
    
  }
}
