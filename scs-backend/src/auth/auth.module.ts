import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "src/config/mailer.config";

@Module({
    imports: [MailerModule.forRootAsync(new mailerConfig()), UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
