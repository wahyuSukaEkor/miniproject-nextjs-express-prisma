import prisma from '@/prisma';
import { EventRepository } from '@/repositories/event.repository';
import { VoucherRepository } from '@/repositories/voucher.repository';
import { CreateVoucher } from '@/types/voucher.type';
import { ErrorResponse } from '@/utils/error';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { Validation } from '@/validations/validation';
import { VoucherValidation } from '@/validations/voucher.validation';

export class VoucherService {
  static async createVoucher(id: number, body: CreateVoucher) {
    const { discount, eventId, max_usage, name } = Validation.validate(
      VoucherValidation.CREATE,
      body,
    );

    const event = await EventRepository.getEventById(eventId);
    console.log('data userId :', event);

    // INI PAKE PENGULANGAN, IN IUNDIFINED SOALNYA
    if (!event) {
      throw new ErrorResponse(404, 'Event not found!');
    }

    if (event.user_id !== id) {
      throw new ErrorResponse(400, 'This event is not yours');
    }

    if (event.price === 0) {
      throw new ErrorResponse(
        400,
        'This event is Free, You cant create voucher for free event',
      );
    }

    if (event.max_capacity < max_usage) {
      throw new ErrorResponse(
        400,
        'Capacity event is the request for making vouchers exceeds the event capacity',
      );
    }
    await VoucherRepository.createVoucher(id, {
      discount,
      eventId,
      max_usage,
      name,
    });
    return responseWithoutData(201, true, 'Success create a promo event');
  }

  static async getVoucherById(id: number, eventId: string) {
    const newEventId = Validation.validate(VoucherValidation.EVENT_ID, eventId);

    const response = await VoucherRepository.getVoucherById(
      id,
      Number(newEventId),
    );
    return responseWithData(200, true, 'Success get Data Promo', response);
  }

  static async getVoucherByCreator(eventId: string) {
    console.log('ini log servis', eventId);

    const newEventId = Validation.validate(VoucherValidation.EVENT_ID, eventId);

    const response = await VoucherRepository.getVoucherByCreator(
      Number(eventId),
    );

    return responseWithData(200, true, 'Success get Data Promo', response);
  }
}
