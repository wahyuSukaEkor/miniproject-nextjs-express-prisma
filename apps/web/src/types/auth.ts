export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  referral_code?: string;
};

export type LoginRequest = {
  identity: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  isAdmin: boolean;
  token: string;
};
