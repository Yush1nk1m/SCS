import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { MailerService } from "@nestjs-modules/mailer";
import { UserService } from "../user/user.service";
import { EmailDto } from "./dto/email.dto";
import { User } from "../user/user.entity";
import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";

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
                    useValue: {
                        createVerification: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findUserByEmail: jest.fn(),
                    },
                },
                {
                    provide: MailerService,
                    useValue: {
                        sendMail: jest.fn(),
                    },
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

    describe("[S-A-01] AuthService.sendVerificationMail()", () => {
        // define a mocked input
        const emailDto: EmailDto = {
            email: "kys010306@sogang.ac.kr",
        };
        const nonExistingUser: User = null;
        const existingUser: User = {
            id: 1,
            email: "kys010306@sogang.ac.kr",
            password: "1",
            nickname: "닉네임",
            affiliation: "조직",
            position: "포지션",
            createdAt: new Date(),
        };

        it("[S-A-01-01] Success", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(userService, "findUserByEmail")
                    .mockResolvedValueOnce(nonExistingUser),
            );
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "createVerification")
                    .mockResolvedValueOnce(),
            );
            mockedFuncs.push(
                jest
                    .spyOn(mailerService, "sendMail")
                    .mockResolvedValueOnce(null),
            );

            // execute
            await expect(
                authService.sendVerificationMail(emailDto),
            ).resolves.toBeUndefined();

            // check if mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[S-A-01-02] Failed to find a user", async () => {
            // mock a return value
            const mockedFunc = jest
                .spyOn(userService, "findUserByEmail")
                .mockRejectedValueOnce(new InternalServerErrorException());

            // execute
            await expect(
                authService.sendVerificationMail(emailDto),
            ).rejects.toThrow(InternalServerErrorException);

            // check if a mocked function has been called
            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });

        it("[S-A-01-03] User exists", async () => {
            // mock a return value
            const mockedFunc = jest
                .spyOn(userService, "findUserByEmail")
                .mockResolvedValueOnce(existingUser);

            // execute
            await expect(
                authService.sendVerificationMail(emailDto),
            ).rejects.toThrow(ConflictException);

            // check if a mocked function has been called
            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });

        it("[S-A-01-04] Failed to create a verification", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(userService, "findUserByEmail")
                    .mockResolvedValueOnce(nonExistingUser),
            );
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "createVerification")
                    .mockRejectedValueOnce(new InternalServerErrorException()),
            );

            // execute
            await expect(
                authService.sendVerificationMail(emailDto),
            ).rejects.toThrow(InternalServerErrorException);

            // check if mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[S-A-01-05] Failed to send a mail", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(userService, "findUserByEmail")
                    .mockResolvedValueOnce(nonExistingUser),
            );
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "createVerification")
                    .mockResolvedValueOnce(),
            );
            mockedFuncs.push(
                jest
                    .spyOn(mailerService, "sendMail")
                    .mockRejectedValueOnce(null),
            );

            // execute
            await expect(
                authService.sendVerificationMail(emailDto),
            ).rejects.toThrow(InternalServerErrorException);

            // check if mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });
    });
});
