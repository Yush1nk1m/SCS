import { Api, CommentResponseDto } from "./swaggerApi";
import {
  getAccessToken,
  isTokenExpired,
  removeTokens,
} from "../utils/tokenUtils";
import { refreshTokens } from "./authApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
  securityWorker: (securityData) => {
    return securityData
      ? { headers: { Authorization: `Bearer ${securityData}` } }
      : {};
  },
});

export const createComment = async (
  actionId: number,
  content: string
): Promise<CommentResponseDto> => {
  return authRequest<CommentResponseDto, { actionId: number; content: string }>(
    (params) => api.v1.commentControllerCreateComment(params),
    { actionId, content }
  );
};

const authRequest = async <T, P>(
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
