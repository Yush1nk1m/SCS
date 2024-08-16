import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { CommentDto } from "./comment.dto";

export class CommentResponseDto extends BaseResponseDto {
    @ApiProperty({ type: CommentDto })
    comment: CommentDto;
}
