import { ApiProperty, PickType } from "@nestjs/swagger";
import { Comment } from "../comment.entity";
import { IsInt } from "class-validator";

export class CreateCommentDto extends PickType(Comment, ["content"]) {
    @ApiProperty({ example: 2, description: "댓글이 작성되는 액션의 고유 ID" })
    @IsInt()
    actionId: number;
}
