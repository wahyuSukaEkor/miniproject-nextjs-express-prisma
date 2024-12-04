import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '@/repositories/user.repository';
import { responseWithData } from '@/utils/response';

export class UserService {
  static async getDataProfile(id: number) {
    const response = await UserRepository.getUserProfile(id);
    return responseWithData(
      200,
      true,
      'Get user profile successfully',
      response!,
    );
  }
}


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
