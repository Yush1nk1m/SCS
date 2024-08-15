import { Api } from "../api/swaggerApi";

const api = new Api({
  baseUrl: "http://localhost:4000",
});

export const createAction = async (
  questionId: number,
  title: string,
  content: string
) => {
  try {
    const response = await api.v1.actionControllerCreateAction({
      questionId,
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("액션 생성 실패:", error);
    throw error;
  }
};
