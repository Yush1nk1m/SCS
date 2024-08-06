import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    // [U-01] Service logic
    async findAllUsersFiltered(): Promise<User[]> {
        const users = await this.userRepository.findAllUsers();
        for (const user of users) {
            delete user.password;
            delete user.refreshToken;
            delete user.createdAt;
        }

        return users;
    }

    // [U-02] Service logic
    async findUserByIdFiltered(id: number) {
        const user = await this.userRepository.findUserById(id);
        delete user.password;
        delete user.refreshToken;
        delete user.createdAt;

        return user;
    }
}
