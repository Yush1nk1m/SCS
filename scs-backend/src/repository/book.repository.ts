import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Book } from "../book/book.entity";

@Injectable()
export class BookRepository extends Repository<Book> {
    private logger = new Logger("BookRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Book, dataSource.createEntityManager());
    }
}
