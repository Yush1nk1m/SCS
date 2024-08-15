import { Api, QuestionResponseDto } from "../api/swaggerApi";
import { authRequest } from "./authApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
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
