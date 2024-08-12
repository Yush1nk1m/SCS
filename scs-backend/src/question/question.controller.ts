import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Post,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Public } from "../common/decorator/public.decorator";
import { QuestionResponse } from "./types/response.type";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateQuestionDto } from "./dto/create-question.dto";

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
}
