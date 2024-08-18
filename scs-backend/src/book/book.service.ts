import { Injectable, Logger } from "@nestjs/common";
import { BookRepository } from "../repository/book.repository";
import { QuestionRepository } from "../repository/question.repository";
import { UserRepository } from "../repository/user.repository";
import { Book } from "./book.entity";

@Injectable()
export class BookService {
    private logger = new Logger("BookService");

    constructor(
        private readonly bookRepository: BookRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    // [B-01] Service logic
    async getBooks(
        page: number,
        limit: number,
        sort: "createdAt" | "likeCount",
        order: "ASC" | "DESC",
        search: string,
    ): Promise<[Book[], number]> {
        // find books and return
        return this.bookRepository.findBooksWithQuery(
            page,
            limit,
            sort,
            order,
            search,
        );
    }
}
