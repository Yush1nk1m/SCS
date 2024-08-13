import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { SectionRepository } from "../section/section.repository";
import { Question } from "./question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UserRepository } from "../user/user.repository";
import { UpdateQuestionContentDto } from "./dto/update-question-content.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";

@Injectable()
export class QuestionService {
    private logger = new Logger("QuestionService");

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly sectionRepository: SectionRepository,
    ) {}

    // [S-07] Service logic
    async getQuestionsBySection(
        sectionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "saved" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string,
    ): Promise<{ questions: Question[]; total: number }> {
        // find a section with the specified id from DB
        const section = await this.sectionRepository.findSectionById(sectionId);

        // if the section does not exist, it is an error
        if (!section) {
            throw new NotFoundException(
                `Section with id ${sectionId} has not been found.`,
            );
        }

        return this.questionRepository.findQuestionsBySectionId(
            sectionId,
            page,
            limit,
            sort,
            order,
            search,
        );
    }

    // [Q-01] Service logic
    async getSpecificQuestion(questionId: number): Promise<Question> {
        // find a question with specified id from DB
        const question =
            await this.questionRepository.findQuestionDetailById(questionId);

        // if the question does not exist, it is an error
        if (!question) {
            throw new NotFoundException(
                `Question with id ${questionId} has not been found.`,
            );
        }

        // return found question
        return question;
    }

    // [Q-02] Service logic
    async createQuestion(
        userId: number,
        createQuestionDto: CreateQuestionDto,
    ): Promise<Question> {
        // extract content from DTO
        const { content, sectionId } = createQuestionDto;

        // find user from DB
        const user = await this.userRepository.findUserById(userId);

        // if user does not exist, it is an error
        if (!user) {
            throw new UnauthorizedException("User does not exist.");
        }

        // find section from DB
        const section = await this.sectionRepository.findSectionById(sectionId);

        // if section does not exist, it is an error
        if (!section) {
            throw new NotFoundException("Section does not exist.");
        }

        // create new question
        return this.questionRepository.createQuestion(user, section, content);
    }

    // [Q-03] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateQuestionContent(
        questionId: number,
        updateQuestionContentDto: UpdateQuestionContentDto,
    ): Promise<Question> {
        // extract content from DTO
        const { content } = updateQuestionContentDto;

        // find question and update content
        return this.questionRepository.findAndUpdateQuestionContent(
            questionId,
            content,
        );
    }

    // [Q-04] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async deleteQuestion(questionId: number): Promise<void> {
        return this.questionRepository.deleteQuestionById(questionId);
    }
}
