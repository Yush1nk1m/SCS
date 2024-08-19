import axios from "axios";
import {
  LoginDto,
  SignupDto,
  SignupResponseDto,
  TokensResponseDto,
} from "./swaggerApi";
import { getAccessToken, removeTokens, setTokens } from "../utils/tokenUtils";
import api from "./apiClient";
import { authRequest } from "./apiClient";

// 인증 코드 전송
export const sendVerificationCode = async (email: string): Promise<void> => {
  try {
    await api.v1.authControllerSendVerificationMail({ email });
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

// 인증 코드 검증
export const verifyCode = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  try {
    await api.v1.authControllerVerifySignupCode({ email, verificationCode });
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const signup = async (data: SignupDto): Promise<SignupResponseDto> => {
  try {
    const response = await api.v1.authControllerSignup(data);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const login = async (data: LoginDto): Promise<TokensResponseDto> => {
  try {
    const response = await api.v1.authControllerLogin(data);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const logout = async (): Promise<void> => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      await authRequest(api.v1.authControllerLogout, {});
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    }
  }
  removeTokens();
};

export const refreshTokens = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const response = await axios.post(
      `${api.baseUrl}/v1/auth/jwt/refresh`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    if (
      response.data &&
      response.data.accessToken &&
      response.data.refreshToken
    ) {
      setTokens(response.data.accessToken, response.data.refreshToken);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
