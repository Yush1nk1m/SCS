import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
    Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EmailDto } from "./dto/email.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import { VerificationDto } from "./dto/verification.dto";
import { SignupDto } from "./dto/signup.dto";
import { User } from "../user/user.entity";

@Controller("auth/v1")
export class AuthController {
    private logger = new Logger("AuthController");
    constructor(private readonly authService: AuthService) {}

    // [A-01] Controller logic
    @Post("email/verification-code")
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    async sendVerificationMail(
        @Body() emailDto: EmailDto,
    ): Promise<ResponseDto<null>> {
        await this.authService.sendVerificationMail(emailDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: "A verification mail has been sent.",
        };
    }

    // [A-02] Controller logic
    @Post("email/verify-code")
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async verifySignupCode(
        @Body() verificationDto: VerificationDto,
    ): Promise<ResponseDto<null>> {
        const isVerified =
            await this.authService.verifySignupCode(verificationDto);

        if (isVerified) {
            return {
                statusCode: HttpStatus.OK,
                message: "Verified.",
            };
        } else {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Not verified.",
            };
        }
    }

    // [A-03] Controller logic
    @Post("signup")
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: SignupDto): Promise<ResponseDto<User>> {
        const user = await this.authService.signup(signupDto);
        delete user.password;

        return {
            statusCode: HttpStatus.CREATED,
            message: "A new user has been signed up.",
            data: user,
        };
    }
}
