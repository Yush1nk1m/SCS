/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BaseResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
}

export interface EmailDto {
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
}

export interface VerificationDto {
  /**
   * 인증할 이메일 주소
   * @example "user@example.com"
   */
  email: string;
  /**
   * 인증 코드
   * @example "q1w2e3"
   */
  verificationCode: string;
}

export interface SignupDto {
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 사용자 비밀번호
   * @example "q1w2e3r4"
   */
  password: string;
  /**
   * 사용자 닉네임
   * @example "닉네임"
   */
  nickname: string;
  /**
   * 사용자 소속
   * @example "서강대학교"
   */
  affiliation: string;
  /**
   * 사용자 포지션
   * @example "백엔드"
   */
  position: string;
  /**
   * 인증 코드
   * @example "q1w2e3"
   */
  verificationCode: string;
}

export interface UserDto {
  /**
   * 사용자 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 사용자 닉네임
   * @example "닉네임"
   */
  nickname: string;
  /**
   * 사용자 소속
   * @example "서강대학교"
   */
  affiliation: string;
  /**
   * 사용자 포지션
   * @example "백엔드"
   */
  position: string;
}

export interface SignupResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /** 사용자 정보 */
  user: UserDto;
}

export interface LoginDto {
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 사용자 비밀번호
   * @example "q1w2e3r4"
   */
  password: string;
}

export interface TokensResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /**
   * 액세스 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string;
  /**
   * 리프레시 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
}

export interface UsersResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /** 사용자 정보 목록 */
  users: UserDto[];
}

export interface UserResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /** 사용자 정보 */
  user: UserDto;
}

export interface ContributionResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /** 기여 횟수 */
  total: number;
  /** 기여 횟수의 백분위수 (정수) */
  percentile: number;
}

export interface PublisherDto {
  /**
   * 사용자 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 사용자 닉네임
   * @example "닉네임"
   */
  nickname: string;
}

export interface BookDto {
  /**
   * 문제집 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 문제집 공개 범위
   * @example "public"
   */
  visibility: string;
  /**
   * 문제집 제목
   * @example "백엔드 신입 면접 대비 문제집"
   */
  title: string;
  /**
   * 문제집 설명
   * @example "백엔드 신입 취준을 위한 문제집입니다."
   */
  description: string;
  /**
   * 좋아요 수
   * @example 10
   */
  likeCount: number;
  /**
   * 답변 생성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 답변 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  publisher: PublisherDto;
}

export interface BooksResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  books: BookDto[];
  /**
   * 검색된 문제집의 총 개수
   * @example 5
   */
  total: number;
}

export interface ChangePasswordDto {
  /**
   * 사용자의 새로운 비밀번호
   * @example "newpassword123"
   */
  newPassword: string;
  /**
   * 새로운 비밀번호의 확인 비밀번호
   * @example "newpassword123"
   */
  confirmPassword: string;
}

export interface ChangeNicknameDto {
  /**
   * 사용자의 새로운 닉네임
   * @example "닉네임2"
   */
  nickname: string;
}

export interface ChangeAffiliationDto {
  /**
   * 사용자의 새로운 소속
   * @example "서강대학교"
   */
  affiliation: string;
}

export interface ChangePositionDto {
  /**
   * 사용자의 새로운 소속
   * @example "서강대학교"
   */
  position: string;
}

export interface DeleteUserDto {
  /**
   * 사용자 비밀번호 (8-32자)
   * @example "password123"
   */
  password: string;
  /**
   * 회원 탈퇴를 위한 확인 메시지
   * @example "회원 탈퇴를 희망합니다."
   */
  confirmMessage: string;
}

export interface CreatorDto {
  /**
   * 사용자 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 사용자 닉네임
   * @example "닉네임"
   */
  nickname: string;
}

export interface SectionDto {
  /**
   * 섹션 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 섹션 주제
   * @example "네트워크"
   */
  subject: string;
  /**
   * 섹션 설명
   * @example "네트워크 관련 질문들"
   */
  description?: string;
  /**
   * 섹션 생성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 섹션 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  creator: CreatorDto;
}

export interface SectionsResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  sections: SectionDto[];
}

export interface SectionResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  section: SectionDto;
}

export interface WriterDto {
  /**
   * 사용자 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 사용자 닉네임
   * @example "닉네임"
   */
  nickname: string;
}

export interface QuestionDto {
  /**
   * 질문 ID
   * @example 1
   */
  id: number;
  /**
   * 질문 내용
   * @example "TCP와 UDP의 차이점은 무엇인가요?"
   */
  content: string;
  /**
   * 질문이 스크랩된 횟수
   * @example 5
   */
  saved: number;
  /**
   * 질문 생성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 질문 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  writer: WriterDto;
}

export interface QuestionsResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  questions: QuestionDto[];
  /**
   * 검색된 질문의 총 개수
   * @example 5
   */
  total: number;
}

export interface CreateSectionDto {
  /**
   * 섹션 주제
   * @example "네트워크"
   */
  subject: string;
  /**
   * 섹션 설명
   * @example "네트워크 관련 질문들"
   */
  description?: string;
}

export interface UpdateSectionSubjectDto {
  /**
   * 섹션 주제
   * @example "네트워크"
   */
  subject: string;
}

export interface UpdateSectionDescriptionDto {
  /**
   * 섹션 설명
   * @example "네트워크 관련 질문들"
   */
  description?: string;
}

export interface QuestionResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  question: QuestionDto;
}

export interface CreateQuestionDto {
  /**
   * 질문 내용
   * @example "TCP와 UDP의 차이점은 무엇인가요?"
   */
  content: string;
  /**
   * 섹션 고유 ID
   * @example 1
   */
  sectionId: number;
}

export interface UpdateQuestionContentDto {
  /**
   * 질문 내용
   * @example "TCP와 UDP의 차이점은 무엇인가요?"
   */
  content: string;
}

export interface ActionDto {
  /**
   * 답변 ID
   * @example 1
   */
  id: number;
  /**
   * 답변 제목
   * @example "관리자님이 2024. 08. 14. 작성한 답변입니다."
   */
  title: string;
  /**
   * 답변에 포함된 이미지 URL들
   * @example ["http://example.com/image1.jpg"]
   */
  imageUrls?: string[];
  /**
   * 좋아요 수
   * @example 10
   */
  likeCount: number;
  /**
   * 답변 생성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 답변 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  writer: WriterDto;
}

export interface ActionsResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  actions: ActionDto[];
  /**
   * 검색된 액션의 총 개수
   * @example 5
   */
  total: number;
}

export interface ActionDetailDto {
  /**
   * 답변 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 답변 제목
   * @example "관리자님이 2024. 08. 14. 작성한 답변입니다."
   */
  title: string;
  /**
   * 답변 내용
   * @example "TCP는 연결 지향적이고..."
   */
  content: string;
  /**
   * 좋아요 수
   * @example 10
   */
  likeCount: number;
  /**
   * 답변 생성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 답변 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  writer: WriterDto;
}

export interface ActionResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  action: ActionDetailDto;
}

export interface CreateActionDto {
  /**
   * 질문 고유 ID
   * @example 1
   */
  questionId: number;
  /**
   * 답변 제목
   * @example "관리자님이 2024. 08. 14. 작성한 답변입니다."
   */
  title: string;
  /**
   * 답변 내용
   * @example "TCP는 연결 지향적이고..."
   */
  content: string;
}

export interface UpdateActionDto {
  /**
   * 답변 제목
   * @example "관리자님이 2024. 08. 14. 작성한 답변입니다."
   */
  title: string;
  /**
   * 답변 내용
   * @example "TCP는 연결 지향적이고..."
   */
  content: string;
}

export interface ContentResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /**
   * 원본 마크다운 내용
   * @example "# TCP와 UDP
   *
   * TCP는..."
   */
  content: string;
}

export interface LikeResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /**
   * 좋아요 수
   * @example 10
   */
  likeCount: number;
  /**
   * 사용자의 좋아요 여부 (결과)
   * @example false
   */
  liked: boolean;
}

export interface CommentDto {
  /**
   * 댓글 고유 ID
   * @example 1
   */
  id: number;
  /**
   * 댓글 내용
   * @example "이 게시물은 큰 도움이 되었습니다 ..."
   */
  content: string;
  /**
   * 댓글 작성 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  createdAt: string;
  /**
   * 댓글 수정 일시
   * @format date-time
   * @example "2024-08-14T12:34:56Z"
   */
  updatedAt: string;
  writer: WriterDto;
}

export interface CommentsResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  comments: CommentDto[];
  /**
   * 총 댓글 개수
   * @example 15
   */
  total: number;
}

export interface CreateCommentDto {
  /**
   * 댓글이 작성되는 액션의 고유 ID
   * @example 2
   */
  actionId: number;
  /**
   * 댓글 내용
   * @example "이 게시물은 큰 도움이 되었습니다 ..."
   */
  content: string;
}

export interface CommentResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  comment: CommentDto;
}

export interface UpdateCommentDto {
  /**
   * 댓글 내용
   * @example "이 게시물은 큰 도움이 되었습니다 ..."
   */
  content: string;
}

export interface BookResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  book: BookDto;
}

export interface CreateBookDto {
  /**
   * 문제집 공개 범위
   * @default "public"
   */
  visibility: "public" | "private";
  /**
   * 문제집 제목
   * @example "백엔드 신입 면접 대비 문제집"
   */
  title: string;
  /**
   * 문제집 설명
   * @example "백엔드 신입 취준을 위한 문제집입니다."
   */
  description: string;
}

export interface UpdateBookDto {
  /**
   * 문제집 제목
   * @example "백엔드 신입 면접 대비 문제집"
   */
  title: string;
  /**
   * 문제집 설명
   * @example "백엔드 신입 취준을 위한 문제집입니다."
   */
  description: string;
}

export interface UpdateBookVisibilityDto {
  /**
   * 문제집 공개 범위
   * @example "public"
   */
  visibility: "public" | "private";
}

export interface URLResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /**
   * 업로드된 이미지의 URL
   * @example "s3://aws.amazon.com/..."
   */
  url: string;
}

export interface PresignedURLResponseDto {
  /**
   * 응답 메시지
   * @example "Request has been processed."
   */
  message: string;
  /**
   * 업로드될 이미지의 Key
   * @example "image.png"
   */
  key: string;
  /**
   * 업로드된 이미지의 URL
   * @example "s3://aws.amazon.com/..."
   */
  url: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title SCS API
 * @version 1.0
 * @contact
 *
 * Study Computer Science 서비스의 백엔드 API 문서이다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  v1 = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSendVerificationMail
     * @summary 인증 코드 전송
     * @request POST:/v1/auth/email/verification-code
     */
    authControllerSendVerificationMail: (data: EmailDto, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/auth/email/verification-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerVerifySignupCode
     * @summary 인증 코드 검증
     * @request POST:/v1/auth/email/verify-code
     */
    authControllerVerifySignupCode: (data: VerificationDto, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/auth/email/verify-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignup
     * @summary 회원 가입
     * @request POST:/v1/auth/signup
     */
    authControllerSignup: (data: SignupDto, params: RequestParams = {}) =>
      this.request<SignupResponseDto, BaseResponseDto>({
        path: `/v1/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary 로그인
     * @request POST:/v1/auth/jwt/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<TokensResponseDto, BaseResponseDto>({
        path: `/v1/auth/jwt/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefresh
     * @summary 리프레시
     * @request POST:/v1/auth/jwt/refresh
     * @secure
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.request<TokensResponseDto, BaseResponseDto>({
        path: `/v1/auth/jwt/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary 로그아웃
     * @request POST:/v1/auth/jwt/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/auth/jwt/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAllUsers
     * @summary 모든 사용자 정보 조회
     * @request GET:/v1/users
     */
    userControllerGetAllUsers: (params: RequestParams = {}) =>
      this.request<UsersResponseDto, BaseResponseDto>({
        path: `/v1/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerDeleteCurrentUser
     * @summary 로그인한 사용자 회원 탈퇴
     * @request DELETE:/v1/users
     * @secure
     */
    userControllerDeleteCurrentUser: (data: DeleteUserDto, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/users`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetCurrentUser
     * @summary 로그인한 사용자 정보 조회
     * @request GET:/v1/users/me
     * @secure
     */
    userControllerGetCurrentUser: (params: RequestParams = {}) =>
      this.request<UserResponseDto, BaseResponseDto>({
        path: `/v1/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMyContribution
     * @summary 로그인한 사용자의 커뮤니티 기여도 조회
     * @request GET:/v1/users/contribution
     * @secure
     */
    userControllerGetMyContribution: (
      query: {
        type: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContributionResponseDto, BaseResponseDto>({
        path: `/v1/users/contribution`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMyBooks
     * @summary 로그인한 사용자가 생성한 문제집 조회
     * @request GET:/v1/users/books
     * @secure
     */
    userControllerGetMyBooks: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt" | "likeCount";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksResponseDto, BaseResponseDto>({
        path: `/v1/users/books`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetLikedBooks
     * @summary 로그인한 사용자가 좋아요한 문제집 조회
     * @request GET:/v1/users/books/liked
     * @secure
     */
    userControllerGetLikedBooks: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt" | "likeCount";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksResponseDto, BaseResponseDto>({
        path: `/v1/users/books/liked`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetSpecificUser
     * @summary 특정 사용자 정보 조회
     * @request GET:/v1/users/{id}
     */
    userControllerGetSpecificUser: (id: number, params: RequestParams = {}) =>
      this.request<UserResponseDto, BaseResponseDto>({
        path: `/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerChangeUserPassword
     * @summary 로그인한 사용자 비밀번호 변경
     * @request PATCH:/v1/users/password
     * @secure
     */
    userControllerChangeUserPassword: (data: ChangePasswordDto, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/users/password`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerChangeUserNickname
     * @summary 로그인한 사용자 닉네임 변경
     * @request PATCH:/v1/users/nickname
     * @secure
     */
    userControllerChangeUserNickname: (data: ChangeNicknameDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, BaseResponseDto>({
        path: `/v1/users/nickname`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerChangeUserAffiliation
     * @summary 로그인한 사용자 소속 변경
     * @request PATCH:/v1/users/affiliation
     * @secure
     */
    userControllerChangeUserAffiliation: (data: ChangeAffiliationDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, BaseResponseDto>({
        path: `/v1/users/affiliation`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerChangeUserPosition
     * @summary 로그인한 사용자 포지션 변경
     * @request PATCH:/v1/users/position
     * @secure
     */
    userControllerChangeUserPosition: (data: ChangePositionDto, params: RequestParams = {}) =>
      this.request<UserResponseDto, BaseResponseDto>({
        path: `/v1/users/position`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerGetAllSections
     * @summary 모든 섹션 조회
     * @request GET:/v1/sections
     */
    sectionControllerGetAllSections: (
      query?: {
        sort?: "subject" | "id";
        order?: "ASC" | "DESC";
      },
      params: RequestParams = {},
    ) =>
      this.request<SectionsResponseDto, BaseResponseDto>({
        path: `/v1/sections`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerCreateSection
     * @summary 새 섹션 생성
     * @request POST:/v1/sections
     * @secure
     */
    sectionControllerCreateSection: (data: CreateSectionDto, params: RequestParams = {}) =>
      this.request<SectionResponseDto, BaseResponseDto>({
        path: `/v1/sections`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerGetSpecificSection
     * @summary 특정 섹션 조회
     * @request GET:/v1/sections/{id}
     */
    sectionControllerGetSpecificSection: (id: number, params: RequestParams = {}) =>
      this.request<SectionResponseDto, BaseResponseDto>({
        path: `/v1/sections/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerDeleteSection
     * @summary 섹션 삭제
     * @request DELETE:/v1/sections/{id}
     * @secure
     */
    sectionControllerDeleteSection: (id: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/sections/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerGetQuestionsBySection
     * @summary 특정 섹션의 질문들 조회
     * @request GET:/v1/sections/{id}/questions
     */
    sectionControllerGetQuestionsBySection: (
      id: number,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt" | "saved";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionsResponseDto, BaseResponseDto>({
        path: `/v1/sections/${id}/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerUpdateSectionSubject
     * @summary 섹션 제목 수정
     * @request PATCH:/v1/sections/{id}/subject
     * @secure
     */
    sectionControllerUpdateSectionSubject: (id: number, data: UpdateSectionSubjectDto, params: RequestParams = {}) =>
      this.request<SectionResponseDto, BaseResponseDto>({
        path: `/v1/sections/${id}/subject`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Section
     * @name SectionControllerUpdateSectionDescription
     * @summary 섹션 설명 수정
     * @request PATCH:/v1/sections/{id}/description
     * @secure
     */
    sectionControllerUpdateSectionDescription: (
      id: number,
      data: UpdateSectionDescriptionDto,
      params: RequestParams = {},
    ) =>
      this.request<SectionResponseDto, BaseResponseDto>({
        path: `/v1/sections/${id}/description`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionControllerGetSpecificQuestion
     * @summary 특정 질문 조회
     * @request GET:/v1/questions/{id}
     */
    questionControllerGetSpecificQuestion: (id: number, params: RequestParams = {}) =>
      this.request<QuestionResponseDto, BaseResponseDto>({
        path: `/v1/questions/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionControllerUpdateQuestionContent
     * @summary 질문 내용 수정
     * @request PATCH:/v1/questions/{id}
     * @secure
     */
    questionControllerUpdateQuestionContent: (id: number, data: UpdateQuestionContentDto, params: RequestParams = {}) =>
      this.request<QuestionResponseDto, BaseResponseDto>({
        path: `/v1/questions/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionControllerDeleteQuestion
     * @summary 질문 삭제
     * @request DELETE:/v1/questions/{id}
     * @secure
     */
    questionControllerDeleteQuestion: (id: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/questions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionControllerCreateQuestion
     * @summary 새 질문 생성
     * @request POST:/v1/questions
     * @secure
     */
    questionControllerCreateQuestion: (data: CreateQuestionDto, params: RequestParams = {}) =>
      this.request<QuestionResponseDto, BaseResponseDto>({
        path: `/v1/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Question
     * @name QuestionControllerGetActionsByQuestion
     * @summary 특정 질문의 답변들 조회
     * @request GET:/v1/questions/{id}/actions
     */
    questionControllerGetActionsByQuestion: (
      id: number,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "updatedAt" */
        sort?: "updatedAt" | "likeCount";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionsResponseDto, BaseResponseDto>({
        path: `/v1/questions/${id}/actions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerGetSpecificAction
     * @summary 특정 답변 조회
     * @request GET:/v1/actions/{id}
     */
    actionControllerGetSpecificAction: (id: number, params: RequestParams = {}) =>
      this.request<ActionResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerUpdateAction
     * @summary 답변 수정
     * @request PATCH:/v1/actions/{id}
     * @secure
     */
    actionControllerUpdateAction: (id: number, data: UpdateActionDto, params: RequestParams = {}) =>
      this.request<ActionResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerDeleteAction
     * @summary 답변 삭제
     * @request DELETE:/v1/actions/{id}
     * @secure
     */
    actionControllerDeleteAction: (id: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerCreateAction
     * @summary 새 답변 생성
     * @request POST:/v1/actions
     * @secure
     */
    actionControllerCreateAction: (data: CreateActionDto, params: RequestParams = {}) =>
      this.request<ActionResponseDto, BaseResponseDto>({
        path: `/v1/actions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerGetRawContent
     * @summary 특정 답변의 Raw 마크다운 컨텐츠 조회
     * @request GET:/v1/actions/{id}/raw-content
     * @secure
     */
    actionControllerGetRawContent: (id: number, params: RequestParams = {}) =>
      this.request<ContentResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}/raw-content`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerToggleActionLike
     * @summary 좋아요 등록/취소
     * @request POST:/v1/actions/{id}/like
     * @secure
     */
    actionControllerToggleActionLike: (id: number, params: RequestParams = {}) =>
      this.request<LikeResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}/like`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerGetActionLike
     * @summary 좋아요 여부 조회
     * @request GET:/v1/actions/{id}/like
     * @secure
     */
    actionControllerGetActionLike: (id: number, params: RequestParams = {}) =>
      this.request<LikeResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}/like`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Action
     * @name ActionControllerGetComments
     * @summary 댓글 목록 조회
     * @request GET:/v1/actions/{id}/comments
     */
    actionControllerGetComments: (
      id: number,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentsResponseDto, BaseResponseDto>({
        path: `/v1/actions/${id}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment
     * @name CommentControllerCreateComment
     * @summary 새 댓글 작성
     * @request POST:/v1/comments
     * @secure
     */
    commentControllerCreateComment: (data: CreateCommentDto, params: RequestParams = {}) =>
      this.request<CommentResponseDto, BaseResponseDto>({
        path: `/v1/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment
     * @name CommentControllerUpdateComment
     * @summary 댓글 수정
     * @request PATCH:/v1/comments/{id}
     * @secure
     */
    commentControllerUpdateComment: (id: number, data: UpdateCommentDto, params: RequestParams = {}) =>
      this.request<CommentResponseDto, BaseResponseDto>({
        path: `/v1/comments/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment
     * @name CommentControllerDeleteComment
     * @summary 댓글 삭제
     * @request DELETE:/v1/comments/{id}
     * @secure
     */
    commentControllerDeleteComment: (id: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/comments/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerGetBooks
     * @summary 모든 문제집 조회
     * @request GET:/v1/books
     */
    bookControllerGetBooks: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt" | "likeCount";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksResponseDto, BaseResponseDto>({
        path: `/v1/books`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerCreateBook
     * @summary 새 문제집 생성
     * @request POST:/v1/books
     * @secure
     */
    bookControllerCreateBook: (data: CreateBookDto, params: RequestParams = {}) =>
      this.request<BookResponseDto, BaseResponseDto>({
        path: `/v1/books`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerGetLike
     * @summary 사용자의 문제집 좋아요 여부 조회
     * @request GET:/v1/books/{id}/like
     * @secure
     */
    bookControllerGetLike: (id: number, params: RequestParams = {}) =>
      this.request<LikeResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}/like`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerToggleLike
     * @summary 문제집 좋아요 등록/취소
     * @request POST:/v1/books/{id}/like
     * @secure
     */
    bookControllerToggleLike: (id: number, params: RequestParams = {}) =>
      this.request<LikeResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}/like`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerGetQuestionsOfBook
     * @summary 문제집에 저장된 질문 조회
     * @request GET:/v1/books/{id}/questions
     */
    bookControllerGetQuestionsOfBook: (
      id: number,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
        /** @default "createdAt" */
        sort?: "createdAt" | "saved";
        /** @default "DESC" */
        order?: "ASC" | "DESC";
        /** @default "" */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionsResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerGetBook
     * @summary 특정 문제집 조회
     * @request GET:/v1/books/{id}
     */
    bookControllerGetBook: (id: number, params: RequestParams = {}) =>
      this.request<BookResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerDeleteBook
     * @summary 문제집 삭제
     * @request DELETE:/v1/books/{id}
     * @secure
     */
    bookControllerDeleteBook: (id: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerUpdateBook
     * @summary 문제집 수정
     * @request PATCH:/v1/books/{id}/title
     * @secure
     */
    bookControllerUpdateBook: (id: number, data: UpdateBookDto, params: RequestParams = {}) =>
      this.request<BookResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}/title`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerSaveQuestionToBook
     * @summary 문제집에 질문 추가 (스크랩)
     * @request POST:/v1/books/{bookId}/questions/{questionId}
     * @secure
     */
    bookControllerSaveQuestionToBook: (bookId: number, questionId: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/books/${bookId}/questions/${questionId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerDeleteQuestionFromBook
     * @summary 문제집에서 질문 삭제
     * @request DELETE:/v1/books/{bookId}/questions/{questionId}
     * @secure
     */
    bookControllerDeleteQuestionFromBook: (bookId: number, questionId: number, params: RequestParams = {}) =>
      this.request<BaseResponseDto, BaseResponseDto>({
        path: `/v1/books/${bookId}/questions/${questionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerUpdateBookVisibility
     * @summary 문제집 공개 범위 수정
     * @request PATCH:/v1/books/{id}/visibility
     * @secure
     */
    bookControllerUpdateBookVisibility: (id: number, data: UpdateBookVisibilityDto, params: RequestParams = {}) =>
      this.request<BookResponseDto, BaseResponseDto>({
        path: `/v1/books/${id}/visibility`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadImage
     * @summary 이미지 업로드
     * @request POST:/v1/upload/images
     * @secure
     */
    uploadControllerUploadImage: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<URLResponseDto, BaseResponseDto>({
        path: `/v1/upload/images`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerGetPresignedUrl
     * @summary Presigned URL 생성
     * @request POST:/v1/upload/presigned-url
     * @secure
     */
    uploadControllerGetPresignedUrl: (params: RequestParams = {}) =>
      this.request<PresignedURLResponseDto, BaseResponseDto>({
        path: `/v1/upload/presigned-url`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
