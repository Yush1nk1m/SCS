import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Public } from "../common/decorator/public.decorator";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { RolesGuard } from "../common/guard/roles.guard";
import { Roles } from "../common/decorator/roles.decorator";
import { UpdateQuestionContentDto } from "./dto/update-question-content.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import {
    ActionsByQuestionResponseDto,
    QuestionResponseDto,
} from "./dto/response.dto";
import { BaseResponseDto } from "../common/dto/base-response.dto";
import { GetActionsQueryDto } from "./dto/get-actions-query.dto";

@ApiTags("Question")
@Controller("v1/questions")
export class QuestionController {
    private logger = new Logger("QuestionController");

    constructor(private readonly questionService: QuestionService) {}

    // [Q-01] Controller logic
    @ApiOperation({ summary: "특정 질문 조회" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "질문 조회 성공",
        type: QuestionResponseDto,
    })
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificQuestion(
        @Param("id", ParseIntPipe) questionId: number,
    ): Promise<QuestionResponseDto> {
        const question =
            await this.questionService.getSpecificQuestion(questionId);

        return {
            message: `Question with id ${questionId} has been found.`,
            question,
        };
    }

    // [Q-02] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "새 질문 생성" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "질문 생성 성공",
        type: QuestionResponseDto,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createQuestion(
        @GetCurrentUserId() userId: number,
        @Body() createQuestionDto: CreateQuestionDto,
    ): Promise<QuestionResponseDto> {
        const question = await this.questionService.createQuestion(
            userId,
            createQuestionDto,
        );

        return {
            message: "A new question has been created.",
            question,
        };
    }

    // [Q-03] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "질문 내용 수정" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "질문 내용제 수정 성공",
        type: QuestionResponseDto,
    })
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updateQuestionContent(
        @Param("id", ParseIntPipe) questionId: number,
        @Body() updateQuestionContentDto: UpdateQuestionContentDto,
    ): Promise<QuestionResponseDto> {
        const question = await this.questionService.updateQuestionContent(
            questionId,
            updateQuestionContentDto,
        );

        return {
            message: "Question content has been updated.",
            question,
        };
    }

    // [Q-04] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "질문 삭제" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "질문 삭제 성공",
        type: BaseResponseDto,
    })
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteQuestion(
        @Param("id", ParseIntPipe) questionId: number,
    ): Promise<BaseResponseDto> {
        await this.questionService.deleteQuestion(questionId);

        return {
            message: `Question with id ${questionId} has been deleted.`,
        };
    }

    // [Q-05] Controller logic
    @ApiOperation({ summary: "특정 질문의 답변들 조회" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "답변 조회 성공",
        type: ActionsByQuestionResponseDto,
    })
    @Public()
    @Get(":id/actions")
    @HttpCode(HttpStatus.OK)
    async getActionsByQuestion(
        @Param("id", ParseIntPipe) questionId: number,
        @Query() query: GetActionsQueryDto,
    ): Promise<ActionsByQuestionResponseDto> {
        const { page, limit, sort, order, search } = query;
        const [actions, total] =
            await this.questionService.getActionsByQuestion(
                questionId,
                page,
                limit,
                sort,
                order,
                search,
            );

        this.logger.verbose(actions);

        return {
            message: "Actions of question have been found.",
            actions,
            total,
        };
    }
}
