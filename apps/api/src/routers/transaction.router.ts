import { TransactionController } from '@/controllers/transaction.controller';
import {
  adminGuard,
  userGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';
import { uploader } from '@/middlewares/uploader.middleware';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/waiting',
      verifyToken,
      userGuard,
      this.transactionController.getEventTransactionWaiting,
    );

    this.router.get(
      '/success',
      verifyToken,
      userGuard,
      this.transactionController.getEventTransactionSuccess,
    );

    this.router.get(
      '/finish',
      verifyToken,
      userGuard,
      this.transactionController.getEventTransactionSuccessByDate,
    );

    this.router.post(
      '/',
      verifyToken,
      userGuard,
      this.transactionController.createTransaction,
    );

    this.router.patch(
      '/:transactionId',
      verifyToken,
      userGuard,
      uploader('/transactions', 'TRANS').single('image'),
      this.transactionController.checkoutUser,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
