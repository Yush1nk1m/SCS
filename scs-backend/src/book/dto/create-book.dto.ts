import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        example: "백엔드 신입 면접 대비 문제집",
        description: "문제집 제목",
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: "백엔드 신입 취준을 위한 문제집입니다.",
        description: "문제집 설명",
    })
    @IsString()
    description: string;
}
