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
    async createNewQuestion(
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
}
