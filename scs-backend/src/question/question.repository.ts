import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Question } from "./question.entity";
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
    ): Promise<{ questions: Question[]; total: number }> {
        const [questions, total] = await this.findAndCount({
            where: { section: { id: sectionId } },
            relations: ["writer"],
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
}
