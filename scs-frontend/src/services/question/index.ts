import axios from "axios";
import { ActionSortOption } from "../../types/action";

const API_BASE_URL = "http://localhost:4000/v1/questions";

export const fetchQuestion = async (questionId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export const fetchActions = async (
  questionId: string,
  options: ActionSortOption & { page: number; limit: number; search?: string }
) => {
  try {
    const { sort, order, search, page = 1, limit = 10 } = options;
    const response = await axios.get(`${API_BASE_URL}/${questionId}/actions`, {
      params: { page, limit, sort, order, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching actions:", error);
    throw error;
  }
};
