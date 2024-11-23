import prisma from '@/prisma';
import { Decoded, LoginRequest, RegisterRequest } from '@/types/auth.type';
import { comparePassword, hashPassword } from '@/utils/hash';
import { responseWithData, responseWithoutData } from '@/utils/response';
import { AuthValidation } from '@/validations/auth.validation';
import { Validation } from '@/validations/validation';
import { generateReferralCode, generateVoucherCode } from '@/utils/codegenerator';
import { ErrorMessage } from '@/utils/errmessage';
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
    const { email, isAdmin, password, username, referralCode } =
      Validation.validate(AuthValidation.REGISTER, request);

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: email }
          ]
        },
      });


    if (existingUser) {
      throw new ErrorMessage(
        400,
        existingUser.username === username ? 'Username already exists!' : 'Email already exists!'
      );
    }

    if (!isAdmin && referralCode) {
      await this._handleReferralCodeLogic(username, referralCode);
    }

    await prisma.user.create({
      data: {
        email,
        isAdmin,
        username,
        password: await hashPassword(password),
        referralCode: isAdmin ? undefined : generateReferralCode(username.slice(0, 3)),
      },
    });

    return responseWithoutData(201, true, 'Registration was successful');
  }

  static async login(request: LoginRequest) {
    const { identity, password } = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identity }, { email: identity }],
      },
    });

    if (!user) throw new ErrorMessage(404, 'Username or Email not exists!');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new ErrorMessage(401, 'Password is wrong!');

    const token = generateJWTToken({ id: user.user_id, isAdmin: user.isAdmin }); // Use user_id here

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

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.id },
    });
    if (!user) throw new ErrorMessage(404, 'User not found!');

    return responseWithData(200, true, 'Keep login was successful', {
      username: user.username,
      isAdmin: user.isAdmin,
      token,
    });
  }

  private static async _handleReferralCodeLogic(username: string, referralCode: string) {
    const userByReferralCode = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!userByReferralCode) {
      throw new ErrorMessage(400, 'Invalid referral code!');
    }

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);

    // await prisma.$transaction(async (tx) => {
    //   if (!userByReferralCode.point) {
    //     await tx.point.create({
    //       data: {
    //         total_point: 10000,
    //         expired_date: currentDate,
    //         user: { connect: { user_id: userByReferralCode.user_id } }, // Use user_id here
    //       },
    //     });
    //   } else {
    //     await tx.point.update({
    //       data: {
    //         total_point: userByReferralCode.point.total_point + 10000,
    //         expired_date: currentDate,
    //       },
    //       where: { id: userByReferralCode.point.id },
    //     });
    //   }

    //   const newUser = await tx.user.create({
    //     data: {
    //       email: request.email,
    //       isAdmin: request.isAdmin,
    //       username,
    //       password: await hashPassword(request.password),
    //       referralCode: generateReferralCode(username.slice(0, 3)),
    //     },
    //   });

    //   await tx.voucher.create({
    //     data: {
    //       discount: 10,
    //       expired_date: currentDate,
    //       max_usage: 1,
    //       name: generateVoucherCode(referralCode),
    //       user: { connect: { user_id: newUser.user_id } },
    //     },
    //   });
    // });
  }
}
