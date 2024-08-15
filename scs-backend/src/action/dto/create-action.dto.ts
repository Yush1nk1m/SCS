import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Action } from "../action.entity";

export class CreateActionDto extends PickType(Action, ["title", "content"]) {
    @ApiProperty({ example: 1, description: "질문 고유 ID" })
    @IsInt()
    questionId: number;
}
