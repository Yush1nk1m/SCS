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
import { VerificationDto } from "./dto/verification.dto";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { Public } from "../common/decorator/public.decorator";
import { RefreshTokenGuard } from "../common/guard/refresh-token.guard";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { GetCurrentUser } from "../common/decorator/get-current-user.decorator";
import { JwtPayload } from "./types/jwt-payload.type";
import { BaseResponse } from "../common/types/response.type";
import { UserResponse } from "../user/types/response.type";
import { TokensResponse } from "./types/response.type";

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
    ): Promise<BaseResponse> {
        await this.authService.sendVerificationMail(emailDto);

        return {
            message: "A verification mail has been sent.",
        };
    }

    // [A-02] Controller logic
    @Public()
    @Post("email/verify-code")
    @HttpCode(HttpStatus.OK)
    async verifySignupCode(
        @Body() verificationDto: VerificationDto,
    ): Promise<BaseResponse> {
        const isVerified =
            await this.authService.verifySignupCode(verificationDto);

        if (isVerified) {
            return {
                message: "Verified.",
            };
        } else {
            return {
                message: "Not verified.",
            };
        }
    }

    // [A-03] Controller logic
    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: SignupDto): Promise<UserResponse> {
        const user = await this.authService.signup(signupDto);
        delete user.password;

        return {
            message: "A new user has been signed up.",
            user,
        };
    }

    // [A-04] Controller logic
    @Public()
    @Post("jwt/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<TokensResponse> {
        const tokens = await this.authService.login(loginDto);

        return {
            message: "You have been logged in.",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
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
    ): Promise<TokensResponse> {
        this.logger.verbose(`userId: ${userId}, refreshToken: ${refreshToken}`);
        const tokens = await this.authService.refreshJwtTokens(
            userId,
            refreshToken,
        );

        return {
            message: "JWT tokens have been refreshed.",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // [A-06] Controller logic
    @Post("jwt/logout")
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: number): Promise<BaseResponse> {
        await this.authService.logout(userId);

        return {
            message: "You have been logged out.",
        };
    }

    @Get("test")
    @HttpCode(HttpStatus.OK)
    test(@GetCurrentUser() user: JwtPayload): BaseResponse {
        this.logger.verbose(`TEST API has been called by user ${user}`);
        return {
            message: "You have been succeeded to request.",
        };
    }
}
