import { MailerService } from "@nestjs-modules/mailer";
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { EmailDto } from "./dto/email.dto";
import { AuthRepository } from "./auth.repository";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class AuthService {
    private logger = new Logger("AuthService");

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
    ) {}

    // [A-01] Service logic
    async sendVerificationMail(emailDto: EmailDto): Promise<void> {
        // extract an email information from DTO
        const { email } = emailDto;
        // generate a random verification code
        const verificationCode = Math.random().toString(36).substring(2, 8);

        // check if it is already registered
        const user = await this.userRepository.findUserByEmail(email);
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
}
