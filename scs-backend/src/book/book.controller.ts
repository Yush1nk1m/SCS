import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { BaseResponseDto } from "../common/dto/base-response.dto";
import { BookService } from "./book.service";
import { BookResponseDto, BooksResponseDto } from "./dto/response.dto";
import { SetResponseDto } from "../common/decorator/set-response-dto.decorator";
import { Public } from "../common/decorator/public.decorator";
import { GetBooksQueryDto } from "./dto/get-books-query.dto";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateBookDto } from "./dto/create-book.dto";
import {
    UpdateBookDescriptionDto,
    UpdateBookTitleDto,
} from "./dto/update-book.dto";

@ApiTags("Book")
@ApiInternalServerErrorResponse({
    description: "예기치 못한 서버 에러 발생",
    type: BaseResponseDto,
})
@Controller("v1/books")
export class BookController {
    private logger = new Logger("BookController");

    constructor(private readonly bookService: BookService) {}

    // [B-01] Controller logic
    @ApiOperation({ summary: "모든 문제집 조회" })
    @ApiOkResponse({
        description: "문제집 조회 성공",
        type: BooksResponseDto,
    })
    @SetResponseDto(BooksResponseDto)
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getBooks(
        @Query() query: GetBooksQueryDto,
    ): Promise<BooksResponseDto> {
        const { page, limit, sort, order, search } = query;
        const [books, total] = await this.bookService.getBooks(
            page,
            limit,
            sort,
            order,
            search,
        );

        return {
            message: "Books have been found.",
            books,
            total,
        };
    }

    // [B-02] Controller logic
    @ApiOperation({ summary: "특정 문제집 조회" })
    @ApiOkResponse({
        description: "문제집 조회 성공",
        type: BookResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이 존재하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BookResponseDto)
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getBook(
        @Param("id", ParseIntPipe) bookId: number,
    ): Promise<BookResponseDto> {
        const book = await this.bookService.getBook(bookId);

        return {
            message: "Book has been found.",
            book,
        };
    }

    // [B-03] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "새 문제집 생성" })
    @ApiCreatedResponse({
        description: "문제집 생성 성공",
        type: BookResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BookResponseDto)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createBook(
        @GetCurrentUserId() userId: number,
        @Body() createBookDto: CreateBookDto,
    ): Promise<BookResponseDto> {
        const { title, description } = createBookDto;
        const book = await this.bookService.createBook(
            userId,
            title,
            description,
        );

        return {
            message: "New book has been created.",
            book,
        };
    }

    // [B-04] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "문제집 제목 수정" })
    @ApiOkResponse({
        description: "문제집 제목 수정 성공",
        type: BookResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @ApiForbiddenResponse({
        description: "사용자 접근 권한이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이 존재하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BookResponseDto)
    @Patch(":id/title")
    @HttpCode(HttpStatus.OK)
    async updateBookTitle(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) bookId: number,
        @Body() updateBookTitleDto: UpdateBookTitleDto,
    ): Promise<BookResponseDto> {
        const { title } = updateBookTitleDto;
        const book = await this.bookService.updateBookTitle(
            userId,
            bookId,
            title,
        );

        return {
            message: "Book title has been updated.",
            book,
        };
    }

    // [B-05] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "문제집 설명 수정" })
    @ApiOkResponse({
        description: "문제집 설명 수정 성공",
        type: BookResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @ApiForbiddenResponse({
        description: "사용자 접근 권한이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이 존재하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BookResponseDto)
    @Patch(":id/description")
    @HttpCode(HttpStatus.OK)
    async updateBookDescription(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) bookId: number,
        @Body() updateBookDescriptionDto: UpdateBookDescriptionDto,
    ): Promise<BookResponseDto> {
        const { description } = updateBookDescriptionDto;
        const book = await this.bookService.updateBookDescription(
            userId,
            bookId,
            description,
        );

        return {
            message: "Book description has been updated.",
            book,
        };
    }

    // [B-06] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "문제집 삭제" })
    @ApiOkResponse({
        description: "문제집 삭제 성공",
        type: BaseResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @ApiForbiddenResponse({
        description: "사용자 접근 권한이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이 존재하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteBook(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) bookId: number,
    ): Promise<BaseResponseDto> {
        await this.bookService.deleteBook(userId, bookId);

        return {
            message: "Book has been deleted.",
        };
    }

    // [B-07] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "문제집에 질문 추가 (스크랩)" })
    @ApiOkResponse({
        description: "스크랩 성공",
        type: BaseResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @ApiForbiddenResponse({
        description: "사용자 접근 권한이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이나 질문이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiConflictResponse({
        description: "질문이 이미 문제집에 저장됨",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Post(":bookId/questions/:questionId")
    @HttpCode(HttpStatus.OK)
    async saveQuestionToBook(
        @GetCurrentUserId() userId: number,
        @Param("bookId", ParseIntPipe) bookId: number,
        @Param("questionId", ParseIntPipe) questionId: number,
    ): Promise<BaseResponseDto> {
        await this.bookService.saveQuestion(userId, bookId, questionId);

        return {
            message: "Question has been saved to the book.",
        };
    }

    // [B-08] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "문제집에서 질문 삭제" })
    @ApiOkResponse({
        description: "질문 삭제 성공",
        type: BaseResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: "사용자 인증이 유효하지 않음",
        type: BaseResponseDto,
    })
    @ApiForbiddenResponse({
        description: "사용자 접근 권한이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiNotFoundResponse({
        description: "문제집이나 질문이 존재하지 않음",
        type: BaseResponseDto,
    })
    @ApiConflictResponse({
        description: "질문이 문제집에 존재하지 않음",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Delete(":bookId/questions/:questionId")
    @HttpCode(HttpStatus.OK)
    async deleteQuestionFromBook(
        @GetCurrentUserId() userId: number,
        @Param("bookId", ParseIntPipe) bookId: number,
        @Param("questionId", ParseIntPipe) questionId: number,
    ): Promise<BaseResponseDto> {
        await this.bookService.deleteQuestion(userId, bookId, questionId);

        return {
            message: "Question has been deleted from the book.",
        };
    }
}
