import { ApiProperty, PickType } from "@nestjs/swagger";
import { Comment } from "../comment.entity";
import { WriterDto } from "../../user/dto/writer.dto";

export class CommentDto extends PickType(Comment, [
    "id",
    "content",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: WriterDto })
    writer: WriterDto;
}
