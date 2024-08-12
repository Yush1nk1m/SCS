import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { SectionRepository } from "../section/section.repository";
import { Question } from "./question.entity";

@Injectable()
export class QuestionService {
    private logger = new Logger("QuestionService");

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly sectionRepository: SectionRepository,
    ) {}

    // [S-07] Service logic
    async getQuestionsBySection(
        sectionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "saved" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
    ): Promise<{ questions: Question[]; total: number }> {
        return this.questionRepository.findQuestionsBySectionId(
            sectionId,
            page,
            limit,
            sort,
            order,
        );
    }

    // [Q-01] Service logic
    async getSpecificQuestion(questionId: number): Promise<Question> {
        const question =
            await this.questionRepository.findQuestionById(questionId);

        if (!question) {
            throw new NotFoundException(
                `Question with id ${questionId} has not been found.`,
            );
        }

        return question;
    }
}
