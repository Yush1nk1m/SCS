import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { Action } from "./action.entity";

@Injectable()
export class ActionRepository extends Repository<Action> {
    private logger = new Logger("ActionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Action, dataSource.createEntityManager());
    }

    async findActionsByQuestionId(
        questionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "likeCount" = "createdAt",
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
