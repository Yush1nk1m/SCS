import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { EmailDto } from "../auth/dto/email.dto";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findUserByEmail(emailDto: EmailDto): Promise<User> {
        const { email } = emailDto;
        return this.userRepository.findUserByEmail(email);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, nickname, affiliation, position } =
            createUserDto;
        return this.userRepository.createUser(
            email,
            password,
            nickname,
            affiliation,
            position,
        );
    }
}
