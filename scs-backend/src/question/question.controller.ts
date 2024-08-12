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
    UseGuards,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Public } from "../common/decorator/public.decorator";
import { QuestionResponse } from "./types/response.type";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { RolesGuard } from "../common/guard/roles.guard";
import { Roles } from "../common/decorator/roles.decorator";
import { UpdateQuestionContentDto } from "./dto/update-question-content.dto";
import { BaseResponse } from "../common/types/response.type";

@Controller("v1/questions")
export class QuestionController {
    private logger = new Logger("QuestionController");

    constructor(private readonly questionService: QuestionService) {}

    // [Q-01] Controller logic
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificQuestion(
        @Param("id", ParseIntPipe) questionId: number,
    ): Promise<QuestionResponse> {
        const question =
            await this.questionService.getSpecificQuestion(questionId);

        return {
            message: `Question with id ${questionId} has been found.`,
            question,
        };
    }

    // [Q-02] Controller logic
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createNewQuestion(
        @GetCurrentUserId() userId: number,
        @Body() createQuestionDto: CreateQuestionDto,
    ): Promise<QuestionResponse> {
        const question = await this.questionService.createNewQuestion(
            userId,
            createQuestionDto,
        );

        return {
            message: "A new question has been created.",
            question,
        };
    }

    // [Q-03] Controller logic
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updateQuestionContent(
        @Param("id", ParseIntPipe) questionId: number,
        @Body() updateQuestionContentDto: UpdateQuestionContentDto,
    ): Promise<QuestionResponse> {
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
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteQuestion(
        @Param("id", ParseIntPipe) questionId: number,
    ): Promise<BaseResponse> {
        await this.questionService.deleteQuestion(questionId);

        return {
            message: `Question with id ${questionId} has been deleted.`,
        };
    }
}
