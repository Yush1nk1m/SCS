import {
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { BookRepository } from "../repository/book.repository";
import { QuestionRepository } from "../repository/question.repository";
import { UserRepository } from "../repository/user.repository";
import { Book } from "./book.entity";
import { IsolationLevel, Transactional } from "typeorm-transactional";

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

    // [B-02] Service logic
    async getBook(bookId: number): Promise<Book> {
        // find a book from DB
        const book = await this.bookRepository.findBookById(bookId);

        // if the book does not exist, it is an error
        if (!book) {
            throw new NotFoundException(
                `Book with id ${bookId} has not been found.`,
            );
        }

        return book;
    }

    // [B-03] Service logic
    async createBook(
        userId: number,
        title: string,
        description: string,
    ): Promise<Book> {
        // find user from DB
        const publisher = await this.userRepository.findUserById(userId);

        // if user does not exist, it is an error
        if (!publisher) {
            throw new UnauthorizedException("User does not exist.");
        }

        // create new book, save it, and return
        const book = this.bookRepository.create({
            title,
            description,
            publisher,
        });

        return this.bookRepository.save(book);
    }

    // [B-04] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateBookTitle(
        userId: number,
        bookId: number,
        title: string,
    ): Promise<Book> {
        // find a book from DB
        const book = await this.bookRepository.findBookById(bookId);

        // if the book does not exist, it is an error
        if (!book) {
            throw new NotFoundException(
                `Book with id ${bookId} has not been found.`,
            );
        }

        // if the publisher of the book is not equal to the user, it is an error
        if (book.publisher.id !== userId) {
            throw new ForbiddenException("User cannot access to the book.");
        }

        // update new title, save it, and return
        book.title = title;
        return this.bookRepository.save(book);
    }

    // [B-05] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateBookDescription(
        userId: number,
        bookId: number,
        description: string,
    ): Promise<Book> {
        // find a book from DB
        const book = await this.bookRepository.findBookById(bookId);

        // if the book does not exist, it is an error
        if (!book) {
            throw new NotFoundException(
                `Book with id ${bookId} has not been found.`,
            );
        }

        // if the publisher of the book is not equal to the user, it is an error
        if (book.publisher.id !== userId) {
            throw new ForbiddenException("User cannot access to the book.");
        }

        // update new title, save it, and return
        book.description = description;
        return this.bookRepository.save(book);
    }
}
