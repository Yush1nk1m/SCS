import { Injectable, Logger } from "@nestjs/common";
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
        page: number,
        limit: number,
    ): Promise<Question[]> {
        return this.questionRepository.findQuestionsBySectionId(
            sectionId,
            page,
            limit,
        );
    }
}
