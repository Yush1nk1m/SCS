import { ApiProperty, PickType } from "@nestjs/swagger";
import { Section } from "../section.entity";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { User } from "../../user/user.entity";
import { Question } from "../../question/question.entity";

class CreatorDto extends PickType(User, ["id", "nickname"]) {}

class SectionDto extends PickType(Section, [
    "id",
    "subject",
    "description",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: CreatorDto })
    creator: CreatorDto;
}

export class SectionsResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [SectionDto] })
    sections: SectionDto[];
}

export class SectionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: SectionDto })
    section: SectionDto;
}

class WriterDto extends PickType(User, ["id", "nickname"]) {}

class QuestionDto extends PickType(Question, [
    "id",
    "content",
    "saved",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: WriterDto })
    writer: WriterDto;
}

export class QuestionsBySectionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [QuestionDto] })
    questions: QuestionDto[];

    @ApiProperty({ example: 5, description: "검색된 질문의 총 개수" })
    total: number;
}
