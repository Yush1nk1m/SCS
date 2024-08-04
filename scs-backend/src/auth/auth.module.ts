import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UserModule } from "src/user/user.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "src/config/mailer.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Verification } from "./verification.entity";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([Verification]),
        MailerModule.forRootAsync(new mailerConfig()),
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        AccessTokenStrategy,
        RefreshTokenStrategy,
    ],
})
export class AuthModule {}
