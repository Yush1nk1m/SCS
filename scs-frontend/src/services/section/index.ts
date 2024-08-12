import axios from "axios";
import { QuestionSortOption, SectionSortOption } from "../../types/section";
import { authRequest } from "../auth";
import { QuestionResponse } from "../../types/question";

const API_BASE_URL = "http://localhost:4000/v1/sections";

export const fetchSections = async (sortOption: SectionSortOption) => {
  return axios.get(`${API_BASE_URL}`, {
    params: sortOption,
  });
};

export const fetchQuestions = async (
  sectionId: number,
  page: number,
  sortOption: QuestionSortOption,
  search: string
) => {
  return axios.get(`${API_BASE_URL}/${sectionId}/questions`, {
    params: {
      page,
      limit: 10,
      sort: sortOption.sort,
      order: sortOption.order,
      search,
    },
  });
};

export const createQuestion = async (content: string, sectionId: number) => {
  return authRequest<QuestionResponse>({
    method: "POST",
    url: API_BASE_URL,
    data: { content, sectionId },
  });
};
