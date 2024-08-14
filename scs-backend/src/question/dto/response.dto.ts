import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { QuestionDto } from "./question.dto";
import { Action } from "../../action/action.entity";
import { WriterDto } from "../../user/dto/writer.dto";

export class QuestionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: QuestionDto })
    question: QuestionDto;
}

class ActionDto extends PickType(Action, [
    "id",
    "title",
    "imageUrls",
    "likeCount",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: WriterDto })
    writer: WriterDto;
}

export class ActionsByQuestionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [ActionDto] })
    actions: [ActionDto];

    @ApiProperty({ example: 5, description: "검색된 액션의 총 개수" })
    total: number;
}
