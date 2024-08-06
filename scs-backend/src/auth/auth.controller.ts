import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Logger,
    UseGuards,
    Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EmailDto } from "./dto/email.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import { VerificationDto } from "./dto/verification.dto";
import { SignupDto } from "./dto/signup.dto";
import { User } from "../user/user.entity";
import { LoginDto } from "./dto/login.dto";
import { Tokens } from "./types/tokens.type";
import { Public } from "../common/decorator/public.decorator";
import { RefreshTokenGuard } from "../common/guard/refresh-token.guard";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { GetCurrentUser } from "../common/decorator/get-current-user.decorator";
import { JwtPayload } from "./types/jwt-payload.type";

@Controller("v1/auth")
export class AuthController {
    private logger = new Logger("AuthController");
    constructor(private readonly authService: AuthService) {}

    // [A-01] Controller logic
    @Public()
    @Post("email/verification-code")
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
    @Public()
    @Post("email/verify-code")
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
    @Public()
    @Post("signup")
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

    // [A-04] Controller logic
    @Public()
    @Post("jwt/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<Tokens>> {
        const tokens = await this.authService.login(loginDto);

        return {
            statusCode: HttpStatus.OK,
            message: "You have been logged in.",
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        };
    }

    // [A-05] Controller logic
    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post("jwt/refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser("refreshToken") refreshToken: string,
    ): Promise<ResponseDto<Tokens>> {
        this.logger.verbose(`userId: ${userId}, refreshToken: ${refreshToken}`);
        const tokens = await this.authService.refreshJwtTokens(
            userId,
            refreshToken,
        );

        return {
            statusCode: HttpStatus.OK,
            message: "JWT tokens have been refreshed.",
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        };
    }

    // [A-06] Controller logic
    @Post("jwt/logout")
    @HttpCode(HttpStatus.OK)
    async logout(
        @GetCurrentUserId() userId: number,
    ): Promise<ResponseDto<null>> {
        await this.authService.logout(userId);

        return {
            statusCode: HttpStatus.OK,
            message: "You have been logged out.",
        };
    }

    @Get("test")
    @HttpCode(HttpStatus.OK)
    test(@GetCurrentUser() user: JwtPayload): ResponseDto<null> {
        this.logger.verbose(`TEST API has been called by user ${user}`);
        return {
            statusCode: HttpStatus.OK,
            message: "You have been succeeded to request.",
        };
    }
}
