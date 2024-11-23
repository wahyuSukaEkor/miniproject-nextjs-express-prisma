import { nanoid, customAlphabet } from 'nanoid';

const generateReferralCode = (username: string) => `${username}${nanoid(3).toUpperCase()}`;
const generateVoucherCode = (prefix: string) => `${prefix}-${nanoid(3).toUpperCase()}`;
const generateTicketCode = (prefix: string) => `${prefix}-${customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)().toUpperCase()}`;

export { generateReferralCode, generateVoucherCode, generateTicketCode };
