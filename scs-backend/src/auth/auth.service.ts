import { MailerService } from "@nestjs-modules/mailer";
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { EmailDto } from "./dto/email.dto";
import { AuthRepository } from "./auth.repository";
import { UserService } from "../user/user.service";
import { VerificationDto } from "./dto/verification.dto";
import { SignupDto } from "./dto/signup.dto";
import { User } from "../user/user.entity";
import { CreateUserDto } from "../user/dto/user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    private logger = new Logger("AuthService");

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
    ) {}

    // [A-01] Service logic
    async sendVerificationMail(emailDto: EmailDto): Promise<void> {
        // extract an email address from DTO
        const { email } = emailDto;
        // generate a random verification code
        const verificationCode = Math.random().toString(36).substring(2, 8);

        // check if it is already registered
        const user = await this.userService.findUser(emailDto);
        if (user) {
            throw new ConflictException(
                "An user with the same email already exists.",
            );
        }

        // create(or update) a verification data on database
        await this.authRepository.createVerification(email, verificationCode);
        this.logger.verbose(
            `Verification(email: ${email}, code: ${verificationCode}) has been created.`,
        );

        try {
            // send a verification mail
            await this.mailerService.sendMail({
                to: email,
                subject: "Study Computer Science - Email Verification",
                template: "./verification",
                context: {
                    verificationCode,
                },
            });
            this.logger.verbose(
                `A verification mail has been sent to ${email}.`,
            );
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(
                "An error has been occurred while sending a mail.",
            );
        }
    }

    // [A-02] Service logic
    async verifySignupCode(verificationDto: VerificationDto): Promise<boolean> {
        // extract DTO data
        const { email, verificationCode } = verificationDto;
        const verification = await this.authRepository.findVerification(
            email,
            verificationCode,
        );

        if (verification) {
            await this.authRepository.updateVerification(
                email,
                verificationCode,
                true,
            );
            return true;
        } else {
            return false;
        }
    }

    // [A-03] Service logic
    async signup(signupDto: SignupDto): Promise<User> {
        // destruction
        const {
            email,
            password,
            nickname,
            affiliation,
            position,
            verificationCode,
        } = signupDto;

        // encrypt password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // DTO for creating an user
        const createUserDto: CreateUserDto = {
            email,
            password: hashedPassword,
            nickname,
            affiliation,
            position,
        };

        // check if the email address has already been verified
        const verification = await this.authRepository.findVerification(
            email,
            verificationCode,
        );

        if (verification.verified) {
            await this.authRepository.deleteVerification(email);
            return this.userService.createUser(createUserDto);
        } else {
            throw new UnauthorizedException(
                "User's email has not been verified",
            );
        }
    }
}
