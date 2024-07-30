import { MailerService } from "@nestjs-modules/mailer";
import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    private logger = new Logger("AuthService");

    constructor(
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
    ) {}

    async sendMail(): Promise<void> {
        try {
            this.logger.verbose("Try to send mail!");

            await this.mailerService.sendMail({
                to: "kys010306@sogang.ac.kr",
                subject: "Nodemailer test mail",
                text: "Hello world!",
            });
        } catch (error) {
            throw new InternalServerErrorException(
                "An error has been occurred while sending a mail.",
            );
        }
    }
}
