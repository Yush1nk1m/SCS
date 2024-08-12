import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import {
  LoginData,
  LoginResponse,
  SignupData,
  SignupResponse,
} from "../../types/auth";
import {
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  removeTokens,
  setTokens,
} from "../../utils/tokenUtils";

const API_BASE_URL = "http://localhost:4000/v1/auth";

export const sendVerificationCode = (email: string) =>
  axios.post(`${API_BASE_URL}/email/verification-code`, { email });

export const verifyCode = (email: string, verificationCode: string) =>
  axios.post(`${API_BASE_URL}/email/verify-code`, {
    email,
    verificationCode,
  });

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await axios.post<SignupResponse>(
    `${API_BASE_URL}/signup`,
    data
  );

  return response.data;
};

export const login = async (data: LoginData): Promise<void> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/jwt/login`,
    data
  );
  setTokens(response.data.accessToken, response.data.refreshToken);
};

export const logout = async (): Promise<void> => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      await axios.post(`${API_BASE_URL}/jwt/logout`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/jwt/refresh`,
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

export const authRequest = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  let accessToken = getAccessToken();

  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshed = await refreshTokens();
    if (!refreshed) {
      throw new Error("Authentication required");
    }
    accessToken = getAccessToken();
  }

  const headers: RawAxiosRequestHeaders = {
    ...(config.headers as RawAxiosRequestHeaders),
    Authorization: `Bearer ${accessToken}`,
  };

  const authConfig: AxiosRequestConfig = {
    ...config,
    headers,
  };

  try {
    return await axios(authConfig);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeTokens();
      throw new Error("Authentication failed");
    }
    throw error;
  }
};
