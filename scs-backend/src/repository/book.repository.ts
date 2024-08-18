import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
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
            title: search ? Like(`%${search}%`) : undefined,
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
}
