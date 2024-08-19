export interface Question {
  id: number;
  content: string;
  createdAt?: Date;
  saved?: number;
  writer?: {
    id: number;
    nickname: string;
  };
}

export interface CreateQuestionData {
  sectionId: number;
  content: string;
}

export interface QuestionResponse {
  message: string;
  question: {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    saved: number;
  };
}

export interface QuestionSortOption {
  sort: "createdAt" | "saved";
  order: "ASC" | "DESC";
}
