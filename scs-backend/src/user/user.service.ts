import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "./user.entity";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";
import * as bcrypt from "bcrypt";
import { ChangeNicknameDto } from "./dto/change-nickname.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class UserService {
    private logger = new Logger("UserService");

    constructor(private readonly userRepository: UserRepository) {}

    // [U-01] Service logic
    async findAllUsers(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }

    // [U-02], [U-03] Service logic
    async findUser(id: number) {
        // find user from DB
        const user = await this.userRepository.findUserById(id);

        // if user does not exist, it is an error
        if (!user) {
            throw new NotFoundException(`User has not been found.`);
        }

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
            throw new UnauthorizedException("User information is invalid.");
        }

        // check if the current password is correct and change the password, remove refresh token
        if (user.password && (await bcrypt.compare(password, user.password))) {
            const salt = await bcrypt.genSalt(
                parseInt(process.env.SALT_LENGTH) || 10,
            );
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await this.userRepository.updatePassword(user.id, hashedPassword);
        } else {
            throw new UnauthorizedException(
                "The current password is incorrect.",
            );
        }
    }

    // [U-05] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async changeUserNickname(
        id: number,
        changeNicknameDto: ChangeNicknameDto,
    ): Promise<void> {
        const { nickname } = changeNicknameDto;
        await this.userRepository.updateNickname(id, nickname);
    }

    // [U-06] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async deleteUser(id: number, deleteUserDto: DeleteUserDto): Promise<void> {
        const { password, confirmMessage } = deleteUserDto;

        if (confirmMessage !== "회원 탈퇴를 희망합니다.") {
            throw new BadRequestException("Confirm message is invalid.");
        }

        const user = await this.userRepository.findUserById(id);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("User information is invalid.");
        }

        await this.userRepository.deleteUserById(id);
    }
}
