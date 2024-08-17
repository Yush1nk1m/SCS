import {
  getAccessToken,
  isTokenExpired,
  removeTokens,
} from "../utils/tokenUtils";
import { refreshTokens } from "./authApi";
import { Api } from "./swaggerApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
});

export const fetchSections = async (sortOption: {
  sort?: "subject" | "id";
  order?: "ASC" | "DESC";
}) => {
  try {
    const response = await api.v1.sectionControllerGetAllSections(sortOption);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching sections:", error);
    throw {
      status: error.status,
    };
  }
};

export const fetchQuestions = async (
  sectionId: number,
  page: number,
  sortOption: { sort?: "createdAt" | "saved"; order?: "ASC" | "DESC" },
  search: string
) => {
  try {
    const response = await api.v1.sectionControllerGetQuestionsBySection(
      sectionId,
      {
        page,
        limit: 10,
        ...sortOption,
        search,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    throw {
      status: error.status,
    };
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
