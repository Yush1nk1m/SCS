import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    private logger = new Logger("UserRepository");

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async findUserByEmail(email: string): Promise<User> {
        return this.repository.findOne({ where: { email } });
    }
}
