import { Injectable, Logger } from "@nestjs/common";
import { Brackets, DataSource, Like, Repository } from "typeorm";
import { Book } from "../book/book.entity";

@Injectable()
export class BookRepository extends Repository<Book> {
    private logger = new Logger("BookRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Book, dataSource.createEntityManager());
    }

    async findBooksWithQuery(
        page: number,
        limit: number,
        sort: "createdAt" | "likeCount",
        order: "ASC" | "DESC",
        search: string,
    ): Promise<[Book[], number]> {
        const where = {
            visibility: "public",
            title: search !== "" ? Like(`%${search}%`) : undefined,
        };

        return this.findAndCount({
            where,
            relations: ["publisher"],
            order: {
                [sort]: order,
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findBooksWithQueryByUserId(
        userId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "likeCount" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string,
    ): Promise<[Book[], number]> {
        const where = {
            title: search !== "" ? Like(`%${search}%`) : undefined,
            publisher: {
                id: userId,
            },
        };

        return this.findAndCount({
            where,
            relations: ["publisher"],
            order: {
                [sort]: order,
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findBookById(bookId: number): Promise<Book> {
        return this.findOne({
            where: { id: bookId },
            relations: ["publisher"],
        });
    }

    async findBookAndQuestionsById(bookId: number): Promise<Book> {
        return this.findOne({
            where: { id: bookId },
            relations: ["publisher", "questions"],
        });
    }

    async findBooksLikedByUser(
        userId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "likeCount" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string,
    ): Promise<[Book[], number]> {
        const query = this.createQueryBuilder("book")
            .innerJoin("book.likedBy", "user")
            .leftJoinAndSelect("book.publisher", "publisher")
            .where("user.id = :userId", { userId })
            .andWhere(
                new Brackets((innerQuery) => {
                    innerQuery
                        .where("book.visibility = :PUBLIC", {
                            PUBLIC: "public",
                        })
                        .orWhere("book.publisher.id = :userId", { userId });
                }),
            )
            .orderBy(`book.${sort}`, order)
            .skip((page - 1) * limit)
            .take(limit);

        if (search !== "") {
            query.andWhere("book.title LIKE :title", { title: `%${search}%` });
        }

        return query.getManyAndCount();
    }
}
