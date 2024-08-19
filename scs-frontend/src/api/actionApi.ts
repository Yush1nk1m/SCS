import {
  ActionResponseDto,
  Api,
  BaseResponseDto,
  ContentResponseDto,
  LikeResponseDto,
  UpdateActionDto,
} from "./swaggerApi";
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
  try {
    const response = await api.v1.actionControllerGetSpecificAction(id);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const updateAction = async (
  actionId: number,
  updateActionDto: UpdateActionDto
): Promise<ActionResponseDto> => {
  return authRequest<ActionResponseDto, { id: number; body: UpdateActionDto }>(
    (params) => api.v1.actionControllerUpdateAction(params.id, params.body),
    {
      id: actionId,
      body: updateActionDto,
    }
  );
};

export const getRawContent = async (
  actionId: number
): Promise<ContentResponseDto> => {
  return authRequest<ContentResponseDto, { id: number }>(
    (params) => api.v1.actionControllerGetRawContent(params.id),
    {
      id: actionId,
    }
  );
};

export const deleteAction = async (
  actionId: number
): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, number>(
    (params) => api.v1.actionControllerDeleteAction(params),
    actionId
  );
};

export const getComments = async (
  id: number,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await api.v1.actionControllerGetComments(id, {
      page,
      limit,
    });
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const likeAction = async (id: number): Promise<LikeResponseDto> => {
  return authRequest<LikeResponseDto, number>(
    (actionId) => api.v1.actionControllerToggleActionLike(actionId),
    id
  );
};

export const getActionLike = async (id: number): Promise<LikeResponseDto> => {
  return authRequest<LikeResponseDto, number>(
    (params) => api.v1.actionControllerGetActionLike(params),
    id
  );
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
