import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";
import * as bcrypt from "bcrypt";
import { ChangeNicknameDto } from "./dto/change-nickname.dto";
@Injectable()
export class UserService {
    private logger = new Logger("UserService");

    constructor(private readonly userRepository: UserRepository) {}

    // [U-01] Service logic
    async findAllUsersFiltered(): Promise<User[]> {
        const users = await this.userRepository.findAllUsers();
        for (const user of users) {
            // remove all users' private information
            delete user.password;
            delete user.refreshToken;
            delete user.createdAt;
        }

        return users;
    }

    // [U-02], [U-03] Service logic
    async findUserByIdFiltered(id: number) {
        const user = await this.userRepository.findUserById(id);
        // remove the user's private information
        delete user.password;
        delete user.refreshToken;
        delete user.createdAt;

        return user;
    }

    // [U-04] Service logic
    // DB operations need to be protected by change
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async changeUserPassword(
        id: number,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        // extract passwords
        const { password, newPassword, confirmPassword } = changePasswordDto;

        // new password and confirm password need to be equal
        if (newPassword !== confirmPassword) {
            throw new BadRequestException(
                "The new password does not match the confirm password.",
            );
        }

        // find user by id and check if it exists
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new NotFoundException(
                "An user with the same id does not exist.",
            );
        }

        // check if the current password is correct and change the password, remove refresh token
        if (user.password && (await bcrypt.compare(password, user.password))) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await this.userRepository.updatePassword(user.id, hashedPassword);
        } else {
            throw new UnauthorizedException(
                "The current password is incorrect.",
            );
        }
    }

    // [U-05] Service logic
    async changeUserNickname(
        id: number,
        changeNicknameDto: ChangeNicknameDto,
    ): Promise<void> {
        const { nickname } = changeNicknameDto;
        await this.userRepository.updateNickname(id, nickname);
    }
}
