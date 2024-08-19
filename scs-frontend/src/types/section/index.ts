export interface SectionSortOption {
  sort: "subject" | "id";
  order: "ASC" | "DESC";
}

export interface Section {
  id: number;
  subject: string;
  description: string;
  createdAt: Date;
  creator: {
    id: number;
    nickname: string;
  };
}
