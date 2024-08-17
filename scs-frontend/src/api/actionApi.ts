import { ActionResponseDto, Api, LikeResponseDto } from "./swaggerApi";
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

export const createAction = async (
  questionId: number,
  title: string,
  content: string
) => {
  return authRequest<
    ActionResponseDto,
    { questionId: number; title: string; content: string }
  >((params) => api.v1.actionControllerCreateAction(params), {
    questionId,
    title,
    content,
  });
};

export const getAction = async (id: number) => {
  const response = await api.v1.actionControllerGetSpecificAction(id);
  return response.data;
};

export const getComments = async (
  id: number,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.v1.actionControllerGetComments(id, {
    page,
    limit,
  });
  return response.data;
};

export const likeAction = async (id: number): Promise<LikeResponseDto> => {
  return authRequest<LikeResponseDto, number>(
    (actionId) => api.v1.actionControllerToggleActionLike(actionId),
    id
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
