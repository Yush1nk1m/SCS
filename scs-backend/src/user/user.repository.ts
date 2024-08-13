import { Injectable, Logger } from "@nestjs/common";
import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";

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
}
