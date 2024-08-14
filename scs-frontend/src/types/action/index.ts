export interface Action {
  id: number;
  title: string;
  content?: string;
  rawContent?: string;
  imageUrls?: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ActionSortOption {
  sort: "updatedAt" | "likeCount";
  order: "ASC" | "DESC";
}
