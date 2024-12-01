import { AdminService } from '@/services/admin.service';
import {
  AdminEventQuery,
  AdminEventTransactionQuery,
  FilterDate,
} from '@/types/admin.type';
import { TransactionStatus } from '@/types/transaction.type';
import { NextFunction, Request, Response } from 'express';

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
      const event_id = req.params.event_id;
      const query = req.query as AdminEventQuery;

      const response = await AdminService.getAdminEventParticipations(
        id,
        event_id,
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
      const event_id = req.params.event_id;

      const response = await AdminService.getEvent(id, event_id);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
