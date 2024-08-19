export interface SignupData {
  email: string;
  password: string;
  nickname: string;
  affiliation: string;
  position: string;
  verificationCode: string;
}

export interface UserData {
  id: string;
  email: string;
  nickname: string;
  affiliation: string;
  position: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: UserData;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  sub: number;
  email: string;
  nickname: string;
  role: string;
  iat: number;
  exp: number;
}
