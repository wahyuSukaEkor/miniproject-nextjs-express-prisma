import { VoucherService } from '@/services/voucher.service';
import { CreateVoucher } from '@/types/voucher.type';
import { NextFunction, Request, Response } from 'express';

export class VoucherController {
  public async createVoucher(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const body = req.body as CreateVoucher;

      const response = await VoucherService.createVoucher(id, body);
      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
  public async getVoucherById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;

      const eventId = req.params.eventId;
      const response = await VoucherService.getVoucherById(id, eventId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  public async getVoucherByCreator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const eventId = req.params.eventId

      const response = await VoucherService.getVoucherByCreator(eventId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
