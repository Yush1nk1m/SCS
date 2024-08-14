import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { Question } from "../question.entity";

export class CreateQuestionDto extends PickType(Question, ["content"]) {
    @ApiProperty({ example: 1, description: "섹션 고유 ID" })
    @IsInt()
    @IsNotEmpty()
    sectionId: number;
}
