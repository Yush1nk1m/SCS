import { ApiProperty, PickType } from "@nestjs/swagger";
import { Action } from "../action.entity";
import { WriterDto } from "../../user/dto/writer.dto";

export class ActionDto extends PickType(Action, [
    "id",
    "title",
    "content",
    "likeCount",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: WriterDto })
    writer: WriterDto;
}
