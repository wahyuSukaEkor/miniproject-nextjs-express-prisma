import { ReviewController } from '@/controllers/review.controller';
import { adminGuard, userGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;

  constructor() {
    this.router = Router();
    this.reviewController = new ReviewController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      verifyToken,
      userGuard,
      this.reviewController.createFeedback,
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}
