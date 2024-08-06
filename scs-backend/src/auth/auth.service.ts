import { MailerService } from "@nestjs-modules/mailer";
import {
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { EmailDto } from "./dto/email.dto";
import { AuthRepository } from "./auth.repository";
import { VerificationDto } from "./dto/verification.dto";
import { SignupDto } from "./dto/signup.dto";
import { User } from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { IsolationLevel, Transactional } from "typeorm-transactional";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { Tokens } from "./types/tokens.type";
import { JwtPayload } from "./types/jwt-payload.type";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class AuthService {
    private logger = new Logger("AuthService");

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
    ) {}

    // [A-01] Service logic
    async sendVerificationMail(emailDto: EmailDto): Promise<void> {
        // extract an email address from DTO
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
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
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

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // find verification information
        const verification = await this.authRepository.findVerification(
            email,
            verificationCode,
        );

        // check if it is verified
        if (verification && verification.verified) {
            // delete the information from DB
            await this.authRepository.deleteVerification(email);

            // create a new user's information
            const user = await this.userRepository.createUser(
                email,
                hashedPassword,
                nickname,
                affiliation,
                position,
            );

            delete user.password;
            return user;
        } else {
            throw new UnauthorizedException(
                "User's email has not been verified",
            );
        }
    }

    // [A-04] Service logic
    async login(loginDto: LoginDto): Promise<Tokens> {
        // extract user information
        const { email, password } = loginDto;

        // find a user with the same email address
        const user = await this.userRepository.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            // generate JWT tokens
            const tokens = await this.getTokens(
                user.id,
                user.email,
                user.nickname,
            );

            // update refresh token's information on DB
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            // return JWT tokens
            return tokens;
        } else {
            throw new ForbiddenException(
                "The given user information is not valid.",
            );
        }
    }

    // [A-05] Service logic
    async refreshJwtTokens(
        userId: number,
        refreshToken: string,
    ): Promise<Tokens> {
        const user = await this.userRepository.findUserById(userId);
        this.logger.verbose(user.refreshToken);
        this.logger.verbose(refreshToken);

        if (
            user &&
            user.refreshToken &&
            (await bcrypt.compare(refreshToken, user.refreshToken))
        ) {
            const tokens = await this.getTokens(
                user.id,
                user.email,
                user.nickname,
            );
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return tokens;
        } else {
            throw new ForbiddenException("The token is not valid.");
        }
    }

    // [A-04], [A-05] Common service logic
    async updateRefreshToken(
        userId: number,
        refreshToken: string,
    ): Promise<void> {
        // salting and hashing refresh token
        const salt = await bcrypt.genSalt(10);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        // save the hashed refresh token on DB
        await this.userRepository.updateRefreshToken(
            userId,
            hashedRefreshToken,
        );
    }

    // [A-04], [A-05] Common service logic
    async getTokens(
        userId: number,
        email: string,
        nickname: string,
    ): Promise<Tokens> {
        // generate JWT payload content
        const jwtPayload: JwtPayload = {
            sub: userId,
            email,
            nickname,
        };

        // sign JWT tokens with Passport.js
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
            }),
        ]);

        // return generated JWT tokens
        return {
            accessToken,
            refreshToken,
        };
    }

    // [A-06] Service logic
    async logout(userId: number): Promise<void> {
        await this.userRepository.updateRefreshToken(userId, null);
    }
}
