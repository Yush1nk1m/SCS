import { QuestionResponseDto } from "./swaggerApi";
import { authRequest } from "./apiClient";
import api from "./apiClient";

export const fetchQuestion = async (questionId: string) => {
  try {
    const response = await api.v1.questionControllerGetSpecificQuestion(
      parseInt(questionId)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching question:", error);
    throw {
      status: error.status,
    };
  }
};

export const fetchActions = async (
  questionId: string,
  options: {
    sort: "updatedAt" | "likeCount";
    order: "ASC" | "DESC";
    page: number;
    limit: number;
    search: string;
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
  } catch (error: any) {
    console.error("Error fetching actions:", error);
    throw {
      status: error.status,
    };
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
