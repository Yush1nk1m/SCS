import {
  Api,
  BaseResponseDto,
  CommentResponseDto,
  UpdateCommentDto,
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

export const createComment = async (
  actionId: number,
  content: string
): Promise<CommentResponseDto> => {
  return authRequest<CommentResponseDto, { actionId: number; content: string }>(
    (params) => api.v1.commentControllerCreateComment(params),
    { actionId, content }
  );
};

export const updateComment = async (
  commentId: number,
  content: string
): Promise<CommentResponseDto> => {
  const updateCommentDto: UpdateCommentDto = { content };

  return authRequest<
    CommentResponseDto,
    { id: number; body: UpdateCommentDto }
  >((params) => api.v1.commentControllerUpdateComment(params.id, params.body), {
    id: commentId,
    body: updateCommentDto,
  });
};

export const deleteComment = async (
  commentId: number
): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, number>(
    (params) => api.v1.commentControllerDeleteComment(params),
    commentId
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
