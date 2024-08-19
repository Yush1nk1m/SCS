// src/api/bookApi.ts

import {
  Api,
  BooksResponseDto,
  BookResponseDto,
  LikeResponseDto,
  BaseResponseDto,
} from "./swaggerApi";
import {
  getAccessToken,
  isTokenExpired,
  removeTokens,
} from "../utils/tokenUtils";
import { refreshTokens } from "./authApi";
import { BookSortOption } from "../types/book";

const api = new Api({
  baseUrl: "http://localhost:4000",
  securityWorker: (securityData) => {
    return securityData
      ? { headers: { Authorization: `Bearer ${securityData}` } }
      : {};
  },
});

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

const authRequest = async <T, P>(
  apiCall: (params: P) => Promise<{ data: T }>,
  params: P
): Promise<T> => {
  let accessToken = getAccessToken();

  const refreshTokensIfNeeded = async () => {
    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        throw {
          status: 401,
        };
      }
      accessToken = getAccessToken();
    }
  };

  try {
    await refreshTokensIfNeeded();
    api.setSecurityData(accessToken);
    const response = await apiCall(params);
    return response.data;
  } catch (error: any) {
    if (error.status === 401) {
      removeTokens();
      throw {
        status: 401,
      };
    }

    throw {
      status: error.status || 500,
    };
  }
};
