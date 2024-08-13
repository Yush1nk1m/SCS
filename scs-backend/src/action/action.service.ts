import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ActionRepository } from "./action.repository";
import { Action } from "./action.entity";
import { QuestionRepository } from "../question/question.repository";

@Injectable()
export class ActionService {
    private logger = new Logger("ActionService");

    constructor(
        private readonly actionRepository: ActionRepository,
        private readonly questionRepository: QuestionRepository,
    ) {}

    // extract image URLs from markdown text
    private extractImageUrls(content: string): string[] {
        const regex = /!\[.*?\]\((https:\/\/.*\.s3\.amazonaws\.com\/.*?)\)/g;
        const matches = content.matchAll(regex);
        return Array.from(matches, (m) => m[1]);
    }

    // [Q-05] Service logic
    async getActionsByQuestion(
        questionId: number,
        page: number,
        limit: number,
        sort: "createdAt" | "likeCount",
        order: "ASC" | "DESC",
        search: string,
    ): Promise<{ actions: Action[]; total: number }> {
        // find a question with the specified id from DB
        const question =
            await this.questionRepository.findQuestionById(questionId);

        // if the question does not exist, it is an error
        if (!question) {
            throw new NotFoundException(
                `Question with id ${questionId} has not been found.`,
            );
        }

        return this.actionRepository.findActionsByQuestionId(
            questionId,
            page,
            limit,
            sort,
            order,
            search,
        );
    }
}
