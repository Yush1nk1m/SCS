import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { Action } from "../action/action.entity";
import { User } from "../user/user.entity";

@Injectable()
export class ActionRepository extends Repository<Action> {
    private logger = new Logger("ActionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Action, dataSource.createEntityManager());
    }

    async findActionById(id: number): Promise<Action> {
        return this.findOne({ where: { id } });
    }

    async findActionDetailById(id: number): Promise<Action> {
        return this.findOne({
            withDeleted: true,
            where: { id },
            relations: ["writer", "question"],
            select: {
                id: true,
                title: true,
                content: true,
                likeCount: true,
                shareCount: true,
                createdAt: true,
                updatedAt: true,
                writer: {
                    id: true,
                    nickname: true,
                },
                question: {
                    id: true,
                    content: true,
                },
            },
        });
    }

    async findActionByWriterAndId(writer: User, id: number): Promise<Action> {
        return this.findOne({
            where: {
                id,
                writer,
            },
        });
    }

    async findActionsByQuestionId(
        questionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "updatedAt" | "likeCount" = "updatedAt",
        order: "ASC" | "DESC" = "DESC",
        search: string = "",
    ): Promise<{ actions: Action[]; total: number }> {
        const [actions, total] = await this.findAndCount({
            withDeleted: true,
            where: {
                question: {
                    id: questionId,
                },
                title: Like(`%${search}%`),
            },
            relations: ["writer"],
            select: {
                id: true,
                title: true,
                likeCount: true,
                shareCount: true,
                createdAt: true,
                updatedAt: true,
                writer: {
                    id: true,
                    nickname: true,
                },
            },
            order: {
                [sort]: order,
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { actions, total };
    }
}
