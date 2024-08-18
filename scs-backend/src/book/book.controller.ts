import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Query,
} from "@nestjs/common";
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { BaseResponseDto } from "../common/dto/base-response.dto";
import { BookService } from "./book.service";
import { BookResponseDto, BooksResponseDto } from "./dto/response.dto";
import { SetResponseDto } from "../common/decorator/set-response-dto.decorator";
import { Public } from "../common/decorator/public.decorator";
import { GetBooksQueryDto } from "./dto/get-books-query.dto";

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
}
