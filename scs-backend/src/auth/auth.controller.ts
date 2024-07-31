import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth/v1")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("mailtest")
    sendMailTest(): Promise<void> {
        return this.authService.sendMail();
    }
}
