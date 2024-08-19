import axios from "axios";
import {
  getAccessToken,
  isTokenExpired,
  removeTokens,
  setTokens,
} from "../utils/tokenUtils";
import { refreshTokens } from "./authApi";
import { Api } from "./swaggerApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
  securityWorker: (securityData) => {
    return securityData
      ? { headers: { Authorization: `Bearer ${securityData}` } }
      : {};
  },
});

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const synchronizedRefreshTokens = async (): Promise<boolean> => {
  if (isRefreshing) {
    return refreshPromise!;
  }

  isRefreshing = true;
  refreshPromise = new Promise(async (resolve) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return resolve(false);
      }

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
        return resolve(true);
      }

      return resolve(false);
    } catch (error) {
      return resolve(false);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  return refreshPromise;
};

export const authRequest = async <T, P>(
  apiCall: (params: P) => Promise<{ data: T }>,
  params: P
): Promise<T> => {
  const executeRequest = async (): Promise<T> => {
    let accessToken = getAccessToken();

    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshPromise) {
        refreshPromise = synchronizedRefreshTokens().finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;
      accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("인증 실패");
      }
    }

    api.setSecurityData(accessToken);
    try {
      const response = await apiCall(params);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // 401 에러가 발생하면 토큰을 갱신하고 다시 시도
        await synchronizedRefreshTokens();
        accessToken = getAccessToken();
        if (!accessToken) {
          throw new Error("인증 실패");
        }
        api.setSecurityData(accessToken);
        const retryResponse = await apiCall(params);
        return retryResponse.data;
      }
      throw error;
    }
  };

  return executeRequest();
};

export default api;
