import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { EmailDto } from "../auth/dto/email.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findUserByEmail(emailDto: EmailDto): Promise<User> {
        const { email } = emailDto;
        return this.userRepository.findUserByEmail(email);
    }
}
