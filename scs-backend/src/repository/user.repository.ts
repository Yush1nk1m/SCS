import { Injectable, Logger } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Brackets, DataSource, Repository } from "typeorm";
import { Book } from "../book/book.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    private logger = new Logger("UserRepository");

    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAllUsers(): Promise<User[]> {
        return this.find({
            select: ["id", "email", "nickname", "affiliation", "position"],
        });
    }

    async findUserById(id: number): Promise<User> {
        return this.findOne({ where: { id } });
    }

    async findUserAndBooksById(id: number): Promise<User> {
        return this.findOne({
            where: { id },
            relations: ["books"],
        });
    }

    async findUserAndLikedBooksById(id: number): Promise<User> {
        return this.findOne({
            where: { id },
            relations: ["likedBooks"],
        });
    }

    async findUserBrieflyById(id: number): Promise<User> {
        return this.findOne({
            where: { id },
            select: {
                id: true,
                nickname: true,
            },
        });
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.findOne({ where: { email } });
    }

    async createUser(
        email: string,
        password: string,
        nickname: string,
        affiliation: string,
        position: string,
        role: string = "user",
    ): Promise<User> {
        const user = this.create({
            email,
            password,
            nickname,
            affiliation,
            position,
            role,
        });

        return this.save(user);
    }

    async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
        await this.update({ id }, { refreshToken });
    }

    async updatePassword(id: number, password: string): Promise<void> {
        // remove refresh token to protect user information
        await this.update({ id }, { password, refreshToken: null });
    }

    async updateNickname(id: number, nickname: string): Promise<void> {
        await this.update({ id }, { nickname });
    }

    async deleteUserById(id: number): Promise<void> {
        await this.softDelete({ id });
    }

    async findBooksLikedByUser(
        userId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "likeCount" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string,
    ): Promise<[Book[], number]> {
        const query = this.createQueryBuilder("user")
            .leftJoinAndSelect("user.likedBooks", "book")
            .leftJoinAndSelect("book.publisher", "publisher")
            .where("user.id = :userId", { userId })
            .andWhere(
                new Brackets((innerQuery) => {
                    innerQuery
                        .where("book.visibility = :PUBLIC", {
                            PUBLIC: "public",
                        })
                        .orWhere("publisher.id = :userId", { userId });
                }),
            )
            .orderBy(`book.${sort}`, order)
            .skip((page - 1) * limit)
            .take(limit);

        if (search !== "") {
            query.andWhere("book.title LIKE :title", { title: `%${search}%` });
        }

        const user = await query.getOne();
        if (!user) {
            return [[], 0];
        } else {
            return [user.likedBooks, user.likedBooks.length];
        }
    }
}
