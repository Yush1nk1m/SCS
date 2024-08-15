import axios from "axios";
import {
  Api,
  LoginDto,
  SignupDto,
  SignupResponseDto,
  TokensResponseDto,
} from "../api/swaggerApi";
import {
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  removeTokens,
  setTokens,
} from "../utils/tokenUtils";

const api = new Api({
  baseUrl: "http://localhost:4000",
  securityWorker: (securityData) => {
    return securityData
      ? { headers: { Authorization: `Bearer ${securityData}` } }
      : {};
  },
});

export const sendVerificationCode = (email: string) =>
  api.v1.authControllerSendVerificationMail({ email });

export const verifyCode = (email: string, verificationCode: string) =>
  api.v1.authControllerVerifySignupCode({ email, verificationCode });

export const signup = async (data: SignupDto): Promise<SignupResponseDto> => {
  const response = await api.v1.authControllerSignup(data);
  return response.data;
};

export const login = async (data: LoginDto): Promise<void> => {
  const response = await api.v1.authControllerLogin(data);
  setTokens(response.data.accessToken, response.data.refreshToken);
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
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await axios.post<TokensResponseDto>(
      `${api.baseUrl}/v1/auth/jwt/refresh`,
      null,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    setTokens(response.data.accessToken, response.data.refreshToken);
    return true;
  } catch {
    removeTokens();
    return false;
  }
};

export const authRequest = async <T, P>(
  apiCall: (params: P) => Promise<{ data: T }>,
  params: P
): Promise<T> => {
  let accessToken = getAccessToken();

  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshed = await refreshTokens();
    if (!refreshed) {
      throw new Error("Authentication required");
    }
    accessToken = getAccessToken();
  }

  api.setSecurityData(accessToken);

  try {
    const response = await apiCall(params);
    return response.data;
  } catch (error: any) {
    if (error.status === 401) {
      removeTokens();
      throw new Error("Authentication failed");
    }
    throw error;
  }
};
