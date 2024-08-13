import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { ActionRepository } from "./action.repository";
import { Action } from "./action.entity";
import { QuestionRepository } from "../question/question.repository";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { sanitizeOptions } from "../config/sanitize-config";
import { CreateActionDto } from "./dto/create-action.dto";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class ActionService {
    private logger = new Logger("ActionService");

    constructor(
        private readonly actionRepository: ActionRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    // extract image URLs from markdown text
    private extractImageUrls(content: string): string[] {
        const regex = /!\[.*?\]\((https:\/\/.*\.s3\.amazonaws\.com\/.*?)\)/g;
        const matches = content.matchAll(regex);
        return Array.from(matches, (m) => m[1]);
    }

    // Method for saving markdown content on DB
    private async parseAndSanitizeMarkdown(markdown: string): Promise<string> {
        // parse markdown to HTML
        const rawHtml = await marked(markdown);

        // HTML sanitize (to prevent XSS attack)
        const sanitizedHtml = sanitizeHtml(rawHtml, sanitizeOptions);

        return sanitizedHtml;
    }

    // Method for delivering markdown content to client
    private async sanitizeHtmlForClient(html: string): Promise<string> {
        // HTML sanitize again (to prevent XSS attack)
        return sanitizeHtml(html, sanitizeOptions);
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

    // [AC-01] Service logic
    async getSpecificAction(actionId: number): Promise<Action> {
        // find an action with the specified id from DB
        const action =
            await this.actionRepository.findActionDetailById(actionId);

        // if the action does not exist, it is an error
        if (!action) {
            throw new NotFoundException(
                `Action with id ${actionId} has not been found.`,
            );
        }

        // sanitize HTML data for client
        action.content = await this.sanitizeHtmlForClient(action.content);

        return action;
    }

    // [AC-02] Service logic
    async createAction(
        userId: number,
        createActionDto: CreateActionDto,
    ): Promise<Action> {
        // extract DTO data
        const { questionId, content } = createActionDto;

        // find user from DB
        const writer = await this.userRepository.findUserById(userId);

        // if user does not exist, it is an error
        if (!writer) {
            throw new UnauthorizedException("User not exists.");
        }

        // find a question with the specified id from DB
        const question =
            await this.questionRepository.findQuestionById(questionId);

        // if the question does not exist, it is an error
        if (!question) {
            throw new NotFoundException(
                `Question with id ${questionId} has not been found.`,
            );
        }

        // extract image URLs from markdown content
        const imageUrls = this.extractImageUrls(content);
        this.logger.verbose("Extracted image URLs:", imageUrls);

        // parse and sanitize markdown content
        const sanitizedHtml = await this.parseAndSanitizeMarkdown(content);
        this.logger.verbose("Sanitized HTML:", sanitizeHtml);

        // create action
        const action = this.actionRepository.create({
            content: sanitizedHtml,
            rawContent: content,
            imageUrls,
            question,
            writer,
        });

        return this.actionRepository.save(action);
    }
}
