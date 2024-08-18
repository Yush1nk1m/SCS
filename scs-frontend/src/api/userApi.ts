import {
  getAccessToken,
  isTokenExpired,
  removeTokens,
} from "../utils/tokenUtils";
import { refreshTokens } from "./authApi";
import { Api, UserDto, UserResponseDto } from "./swaggerApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
  securityWorker: (securityData) => {
    return securityData
      ? { headers: { Authorization: `Bearer ${securityData}` } }
      : {};
  },
});

export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await authRequest<{ user: UserDto }, {}>(
    () => api.v1.userControllerGetCurrentUser(),
    {}
  );
  return response.user;
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
