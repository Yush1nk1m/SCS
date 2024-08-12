import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Public } from "../common/decorator/public.decorator";
import { QuestionResponse } from "./types/response.type";

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
}
