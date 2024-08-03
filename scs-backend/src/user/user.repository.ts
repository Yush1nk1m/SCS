import { Injectable, Logger } from "@nestjs/common";
import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    private logger = new Logger("UserRepository");

    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
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
    ): Promise<User> {
        const user = this.create({
            email,
            password,
            nickname,
            affiliation,
            position,
        });

        return this.save(user);
    }
}
