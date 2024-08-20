import {
  BooksResponseDto,
  BookResponseDto,
  LikeResponseDto,
  BaseResponseDto,
  QuestionsResponseDto,
  UpdateBookDto,
} from "./swaggerApi";
import { BookSortOption } from "../types/book";
import { authRequest } from "./apiClient";
import api from "./apiClient";

export const getBook = async (bookId: number): Promise<BookResponseDto> => {
  try {
    const response = await api.v1.bookControllerGetBook(bookId);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status,
    };
  }
};

export const getBooks = async (
  page: number | undefined,
  limit: number | undefined,
  sort: BookSortOption["sort"],
  order: BookSortOption["order"],
  search?: string
): Promise<BooksResponseDto> => {
  try {
    const response = await api.v1.bookControllerGetBooks({
      page,
      limit,
      sort,
      order,
      search,
    });
    return response.data;
  } catch (error: any) {
    throw {
      status: error.status || 500,
    };
  }
};

export const getMyBooks = async (
  page: number | undefined,
  limit: number | undefined,
  sort: BookSortOption["sort"],
  order: BookSortOption["order"],
  search?: string
): Promise<BooksResponseDto> => {
  return authRequest<
    BooksResponseDto,
    {
      page?: number | undefined;
      limit?: number | undefined;
      sort?: "createdAt" | "likeCount" | undefined;
      order?: "ASC" | "DESC" | undefined;
      search?: string | undefined;
    }
  >((params) => api.v1.userControllerGetMyBooks(params), {
    page,
    limit,
    sort,
    order,
    search,
  });
};

export const getBookLike = async (bookId: number): Promise<LikeResponseDto> => {
  return authRequest<LikeResponseDto, number>(
    (params) => api.v1.bookControllerGetLike(params),
    bookId
  );
};

export const toggleBookLike = async (
  bookId: number
): Promise<LikeResponseDto> => {
  return authRequest<LikeResponseDto, number>(
    (params) => api.v1.bookControllerToggleLike(params),
    bookId
  );
};

export const getLikedBooks = async (
  page: number | undefined,
  limit: number | undefined,
  sort: BookSortOption["sort"],
  order: BookSortOption["order"],
  search?: string
): Promise<BooksResponseDto> => {
  return authRequest<
    BooksResponseDto,
    {
      page?: number | undefined;
      limit?: number | undefined;
      sort?: "createdAt" | "likeCount" | undefined;
      order?: "ASC" | "DESC" | undefined;
      search?: string | undefined;
    }
  >((params) => api.v1.userControllerGetLikedBooks(params), {
    page,
    limit,
    sort,
    order,
    search,
  });
};

export const createBook = async (
  visibility: "public" | "private",
  title: string,
  description: string
): Promise<BookResponseDto> => {
  return authRequest<
    BookResponseDto,
    { visibility: "public" | "private"; title: string; description: string }
  >((params) => api.v1.bookControllerCreateBook(params), {
    visibility,
    title,
    description,
  });
};

export const updateBook = async (
  bookId: number,
  updateBookDto: UpdateBookDto
): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, { id: number; body: UpdateBookDto }>(
    (params) => api.v1.bookControllerUpdateBook(params.id, params.body),
    {
      id: bookId,
      body: updateBookDto,
    }
  );
};

export const deleteBook = async (bookId: number): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, number>(
    (params) => api.v1.bookControllerDeleteBook(params),
    bookId
  );
};

export const saveQuestionToBook = async (
  bookId: number,
  questionId: number
): Promise<BaseResponseDto> => {
  return authRequest<BaseResponseDto, { bookId: number; questionId: number }>(
    (params) =>
      api.v1.bookControllerSaveQuestionToBook(params.bookId, params.questionId),
    { bookId, questionId }
  );
};

export const getQuestionsOfBook = async (
  bookId: number,
  page: number | undefined,
  limit: number | undefined,
  sort: "createdAt" | "saved",
  order: "ASC" | "DESC",
  search?: string
): Promise<QuestionsResponseDto> => {
  try {
    const response = await api.v1.bookControllerGetQuestionsOfBook(
      Number(bookId),
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
    throw {
      status: error.status,
    };
  }
};
