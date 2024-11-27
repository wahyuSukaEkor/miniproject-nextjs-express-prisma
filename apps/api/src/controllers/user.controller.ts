import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.decoded.id as number;
      const response = await UserService.getDataProfile(id);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
