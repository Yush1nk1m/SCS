import api from "./apiClient";

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
        limit: 12,
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
