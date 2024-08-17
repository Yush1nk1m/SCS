import axios from "axios";
import {
  Api,
  LoginDto,
  SignupDto,
  SignupResponseDto,
  TokensResponseDto,
} from "./swaggerApi";
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

export const login = async (data: LoginDto): Promise<void> => {
  try {
    const response = await api.v1.authControllerLogin(data);
    setTokens(response.data.accessToken, response.data.refreshToken);
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

const authRequest = async <T, P>(
  apiCall: (params: P) => Promise<{ data: T }>,
  params: P
): Promise<T> => {
  let accessToken = getAccessToken();

  // Refresh tokens
  const refreshTokensIfNeeded = async () => {
    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        throw {
          status: 401,
        };
      }
      accessToken = getAccessToken();
    }
  };

  try {
    await refreshTokensIfNeeded();
    api.setSecurityData(accessToken);
    const response = await apiCall(params);
    return response.data;
  } catch (error: any) {
    if (error.status === 401) {
      removeTokens();
      throw {
        status: 401,
      };
    }

    throw {
      status: error.status || 500,
    };
  }
};
