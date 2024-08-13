import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { Question } from "../question/question.entity";
import { User } from "../user/user.entity";
import { Section } from "../section/section.entity";

@Injectable()
export class QuestionRepository extends Repository<Question> {
    private logger = new Logger("QuestionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Question, dataSource.createEntityManager());
    }

    async findQuestionsBySectionId(
        sectionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "saved" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string = "",
    ): Promise<{ questions: Question[]; total: number }> {
        const [questions, total] = await this.findAndCount({
            withDeleted: true,
            where: {
                section: {
                    id: sectionId,
                },
                content: Like(`%${search}%`),
            },
            relations: ["writer", "section"],
            select: {
                id: true,
                content: true,
                createdAt: true,
                saved: true,
                writer: {
                    id: true,
                    nickname: true,
                },
            },
            order: { [sort]: order },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { questions, total };
    }

    async findQuestionById(id: number) {
        return this.findOne({ where: { id } });
    }

    async findQuestionBrieflyById(id: number) {
        return this.findOne({
            where: { id },
            select: {
                id: true,
                content: true,
            },
        });
    }

    async findQuestionDetailById(id: number) {
        return this.findOne({
            withDeleted: true,
            where: { id },
            relations: ["writer", "section"],
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                saved: true,
                section: {
                    id: true,
                    subject: true,
                    description: true,
                },
                writer: {
                    id: true,
                    nickname: true,
                },
            },
        });
    }

    async createQuestion(
        writer: User,
        section: Section,
        content: string,
    ): Promise<Question> {
        const question = this.create({
            content,
            section,
            writer,
        });

        await this.save(question);
        delete question.writer;
        delete question.section;

        return question;
    }

    async findAndUpdateQuestionContent(
        id: number,
        content: string,
    ): Promise<Question> {
        const question = await this.findOne({ where: { id } });

        if (!question) {
            throw new NotFoundException(
                `Question with id ${id} does not exist.`,
            );
        }

        question.content = content;
        await this.save(question);

        return question;
    }

    async deleteQuestionById(id: number): Promise<void> {
        await this.delete({ id });
    }
}
