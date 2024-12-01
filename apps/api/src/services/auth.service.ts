import prisma from '@/prisma';
import { UserRepository } from '@/repositories/user.repository';
import { Decoded, LoginRequest, RegisterRequest } from '@/types/auth.type';
import { ErrorResponse } from '@/utils/error';
import { comparePassword, hashPassword } from '@/utils/hash';
import {
  generateReferralCode,
  generateVoucherCode,
} from '@/utils/randomGenerator';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';
import { JWT_SECRET } from '@/config';
import { sign, verify } from 'jsonwebtoken';

export function generateJWTToken(payload: any): string {
  return sign(payload, JWT_SECRET);
}

export function verifyJWTToken(token: string): any {
  return verify(token, JWT_SECRET);
}


export class AuthService {
  static async register(request: RegisterRequest) {
    const { email, isAdmin, password, username, referral_code } =
      Validation.validate(AuthValidation.REGISTER, request);

    const userByUsername = await UserRepository.findUserByUnique({ username });
    if (userByUsername) {
      throw new ErrorResponse(400, 'Username already exists!');
    }

    const userByEmail = await UserRepository.findUserByUnique({ email });
    if (userByEmail) throw new ErrorResponse(400, 'Email already exists!');

    if (!isAdmin && referral_code) {
      const userByReferralCode = await UserRepository.findUserByUnique({
        referral_code,
      });

      if (!userByReferralCode) {
        throw new ErrorResponse(400, 'Invalid referral code!');
      } else {
        await prisma.$transaction(async (tx: any) => {
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() + 3);

          if (!userByReferralCode.point) {
            await tx.point.create({
              data: {
                total_point: 10000,
                expired_date: currentDate,
                user: { connect: { id: userByReferralCode.id } },
              },
            });
          } else {
            await tx.point.update({
              data: {
                total_point: userByReferralCode.point.total_point + 10000,
                expired_date: currentDate,
              },
              where: { id: userByReferralCode.point.id },
            });
          }

          const newUser = await tx.user.create({
            data: {
              email,
              isAdmin,
              username,
              password: await hashPassword(password),
              referral_code: isAdmin
                ? undefined
                : generateReferralCode(username.slice(0, 3)),
            },
          });

          await tx.voucher.create({
            data: {
              discount: 10,
              expired_date: currentDate,
              max_usage: 1,
              name: generateVoucherCode(userByReferralCode.referral_code!),

              user: { connect: { id: newUser.id } },
            },
          });
        });

        return responseWithoutData(201, true, 'Registration was successful');
      }
    }

    await UserRepository.createUser({
      email,
      isAdmin,
      username,
      password: await hashPassword(password),
      referral_code: isAdmin
        ? undefined
        : generateReferralCode(username.slice(0, 3)),
    });

    return responseWithoutData(201, true, 'Registration was successful');
  }

  static async login(request: LoginRequest) {
    const { identity, password } = Validation.validate(
      AuthValidation.LOGIN,
      request,
    );

    let findUser = null;
    const userByUsername = await UserRepository.findUserByUnique({
      username: identity,
    });
    if (!userByUsername) {
      const userByEmail = await UserRepository.findUserByUnique({
        email: identity,
      });
      findUser = userByEmail;
    }

    const user = userByUsername ? userByUsername : findUser;
    if (!user) throw new ErrorResponse(404, 'Username or Email not exists!');

    const compare = await comparePassword(password, user.password);
    if (!compare) throw new ErrorResponse(401, 'Password is wrong!');

    const token = generateJWTToken({ id: user.id, isAdmin: user.isAdmin });
    return responseWithData(200, true, 'Login was successful', {
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    });
  }

  static async keepLogin(decoded: Decoded) {
    const token = generateJWTToken({
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    });

    const user = await UserRepository.findUserByUnique({ id: decoded.id });
    if (!user) throw new ErrorResponse(404, 'User not found!');

    return responseWithData(200, true, 'Keep login was successful', {
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    });
  }
}
