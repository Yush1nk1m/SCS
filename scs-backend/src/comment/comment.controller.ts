import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { CommentResponseDto } from "./dto/response.dto";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { SetResponseDto } from "../common/decorator/set-response-dto.decorator";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@ApiTags("Comment")
@Controller("v1/comments")
export class CommentController {
    private logger = new Logger("CommentController");

    constructor(private readonly commentService: CommentService) {}

    // [CM-01] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "새 댓글 작성" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "댓글 작성 성공",
        type: CommentResponseDto,
    })
    @SetResponseDto(CommentResponseDto)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createComment(
        @GetCurrentUserId() userId: number,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<CommentResponseDto> {
        const { actionId, content } = createCommentDto;
        const comment = await this.commentService.createComment(
            userId,
            actionId,
            content,
        );

        return {
            message: "New comment has been created.",
            comment,
        };
    }

    // [CM-02] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "댓글 수정" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "댓글 수정 성공",
        type: CommentResponseDto,
    })
    @SetResponseDto(CommentResponseDto)
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updateComment(
        @GetCurrentUserId() userId: number,
        @Param("id") commentId: number,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<CommentResponseDto> {
        const { content } = updateCommentDto;
        const comment = await this.commentService.updateComment(
            userId,
            commentId,
            content,
        );

        return {
            message: "Comment has been updated.",
            comment,
        };
    }
}
