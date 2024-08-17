import { Api, QuestionResponseDto } from "./swaggerApi";
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

export const fetchQuestion = async (questionId: string) => {
  try {
    const response = await api.v1.questionControllerGetSpecificQuestion(
      parseInt(questionId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export const fetchActions = async (
  questionId: string,
  options: {
    sort?: "updatedAt" | "likeCount";
    order?: "ASC" | "DESC";
    search?: string;
    page?: number;
    limit?: number;
  }
) => {
  try {
    const { sort, order, search, page = 1, limit = 10 } = options;
    const response = await api.v1.questionControllerGetActionsByQuestion(
      parseInt(questionId),
      {
        page,
        limit,
        sort,
        order,
        search,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching actions:", error);
    throw error;
  }
};

export const createQuestion = async (content: string, sectionId: number) => {
  return authRequest<
    QuestionResponseDto,
    { content: string; sectionId: number }
  >((params) => api.v1.questionControllerCreateQuestion(params), {
    content,
    sectionId,
  });
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
