import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Question } from "./question.entity";

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
    ): Promise<Question[]> {
        return this.find({
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
            order: { createdAt: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
}
