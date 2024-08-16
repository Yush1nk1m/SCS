import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Comment } from "../comment/comment.entity";

@Injectable()
export class CommentRepository extends Repository<Comment> {
    private logger = new Logger("CommentRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Comment, dataSource.createEntityManager());
    }

    async findCommentsByActionId(
        actionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
    ): Promise<[Comment[], number]> {
        return await this.findAndCount({
            where: {
                action: {
                    id: actionId,
                },
            },
            relations: ["writer"],
            select: {
                id: true,
                content: true,
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
    }
}
