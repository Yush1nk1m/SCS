import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UserModule } from "src/user/user.module";
import { UserRepository } from "src/user/user.repository";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "src/config/mailer.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Verification } from "./verification.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Verification]),
        MailerModule.forRootAsync(new mailerConfig()),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UserRepository],
})
export class AuthModule {}
