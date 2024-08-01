import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { MailerService } from "@nestjs-modules/mailer";
import { UserService } from "../user/user.service";

describe("AuthService", () => {
    let authService: AuthService;
    let authRepository: AuthRepository;
    let userService: UserService;
    let mailerService: MailerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: AuthRepository,
                    useValue: {},
                },
                {
                    provide: UserService,
                    useValue: {},
                },
                {
                    provide: MailerService,
                    useValue: {},
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authRepository = module.get<AuthRepository>(AuthRepository);
        userService = module.get<UserService>(UserService);
        mailerService = module.get<MailerService>(MailerService);
    });

    it("should be defined", () => {
        expect(authService).toBeDefined();
        expect(authRepository).toBeDefined();
        expect(userService).toBeDefined();
        expect(mailerService).toBeDefined();
    });
});
