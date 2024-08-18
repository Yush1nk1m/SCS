import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { BookDto } from "./book.dto";
import { Expose, Type } from "class-transformer";

export class BooksResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [BookDto] })
    @Type(() => BookDto)
    @Expose()
    books: BookDto[];

    @ApiProperty({ example: 5, description: "검색된 문제집의 총 개수" })
    @Expose()
    total: number;
}

export class BookResponseDto extends BaseResponseDto {
    @ApiProperty({ type: BookDto })
    @Type(() => BookDto)
    @Expose()
    book: BookDto;
}
