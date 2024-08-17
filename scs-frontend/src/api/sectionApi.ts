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
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
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
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
