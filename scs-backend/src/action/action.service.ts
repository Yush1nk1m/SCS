import {
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { ActionRepository } from "./action.repository";
import { Action } from "./action.entity";
import { QuestionRepository } from "../question/question.repository";
import { marked } from "marked";
import * as sanitizeHtml from "sanitize-html";
import { sanitizeOptions } from "../config/sanitize-config";
import { CreateActionDto } from "./dto/create-action.dto";
import { UserRepository } from "../user/user.repository";
import { UpdateActionDto } from "./dto/update-action.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";

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
        this.logger.verbose(`rawHtml: ${rawHtml}`);

        // HTML sanitize (to prevent XSS attack)
        try {
            const sanitizedHtml = sanitizeHtml(rawHtml, sanitizeOptions);
            this.logger.verbose(`sanitizedHtml: ${sanitizedHtml}`);

            return sanitizedHtml;
        } catch (error) {
            this.logger.error(`Sanitize error: ${error}`);
            this.logger.error(`Error stack: ${error.stack}`);
            throw error;
        }
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
        sort: "updatedAt" | "likeCount" = "updatedAt",
        order: "ASC" | "DESC" = "DESC",
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

        // find actions with specified conditions
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
        this.logger.verbose(
            `Action creation on question ${questionId} with content: ${content}`,
        );

        // find user from DB
        const writer = await this.userRepository.findUserBrieflyById(userId);

        // if user does not exist, it is an error
        if (!writer) {
            throw new UnauthorizedException("User not exists.");
        }

        // find a question with the specified id from DB
        const question =
            await this.questionRepository.findQuestionBrieflyById(questionId);

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
        this.logger.verbose("Sanitized HTML:", sanitizedHtml);

        // create new action's title
        const title = `${writer.nickname}님께서 ${new Date().toLocaleDateString()} 작성한 액션입니다.`;

        // create action
        const action = this.actionRepository.create({
            title,
            content: sanitizedHtml,
            rawContent: content,
            imageUrls,
            question,
            writer,
        });

        return this.actionRepository.save(action);
    }

    // [AC-03] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateAction(
        userId: number,
        actionId: number,
        updateActionDto: UpdateActionDto,
    ): Promise<Action> {
        // extract data from DTO
        const { content } = updateActionDto;

        // find user from DB
        const writer = await this.userRepository.findUserBrieflyById(userId);

        // if user does not exist, it is an error
        if (!writer) {
            throw new UnauthorizedException("User not exists.");
        }

        // find an action which is written by user
        const action = await this.actionRepository.findActionByWriterAndId(
            writer,
            actionId,
        );

        // if the action does not exist, it is an error
        if (!action) {
            throw new UnauthorizedException(
                "User cannot access to the action.",
            );
        }

        // extract image URLs from markdown content
        const imageUrls = this.extractImageUrls(content);
        this.logger.verbose("Updated extracted image URLs:", imageUrls);

        // parse and sanitize markdown content
        const sanitizedHtml = await this.parseAndSanitizeMarkdown(content);
        this.logger.verbose("Updated sanitized HTML:", sanitizedHtml);

        // update action's title
        action.title = `${writer.nickname}님께서 ${new Date().toLocaleDateString()} 수정한 액션입니다.`;

        // update action information and save
        action.content = sanitizedHtml;
        action.rawContent = content;

        return this.actionRepository.save(action);
    }

    // [AC-04] Controller logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async deleteAction(userId: number, actionId: number): Promise<void> {
        // find action from DB
        const action =
            await this.actionRepository.findActionDetailById(actionId);

        // if action does not exist, it is an error
        if (!action) {
            throw new NotFoundException(
                `Action with id ${actionId} does not exist.`,
            );
        }

        // if writer is not equal, request is forbidden
        if (action.writer.id !== userId) {
            throw new ForbiddenException("Access is not allowed.");
        }

        // delete action
        await this.actionRepository.delete({ id: action.id });
    }
}
