import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailDto } from "./dto/email.dto";
import { User } from "../user/user.entity";
import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { VerificationDto } from "./dto/verification.dto";
import { Verification } from "./verification.entity";
import { DataSource } from "typeorm";
import { UserRepository } from "../user/user.repository";

describe("AuthService", () => {
    let authService: AuthService;
    let authRepository: AuthRepository;
    let userRepository: UserRepository;
    let mailerService: MailerService;
    let dataSource: DataSource;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: AuthRepository,
                    useValue: {
                        createVerification: jest.fn(),
                        findVerification: jest.fn(),
                        updateVerification: jest.fn(),
                    },
                },
                {
                    provide: UserRepository,
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
                {
                    provide: DataSource,
                    useValue: {
                        createQueryRunner: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authRepository = module.get<AuthRepository>(AuthRepository);
        userRepository = module.get<UserRepository>(UserRepository);
        mailerService = module.get<MailerService>(MailerService);
        dataSource = module.get<DataSource>(DataSource);
    });

    it("should be defined", () => {
        expect(authService).toBeDefined();
        expect(authRepository).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(mailerService).toBeDefined();
        expect(dataSource).toBeDefined();
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
                    .spyOn(userRepository, "findUserByEmail")
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
                .spyOn(userRepository, "findUserByEmail")
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
                .spyOn(userRepository, "findUserByEmail")
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
                    .spyOn(userRepository, "findUserByEmail")
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
                    .spyOn(userRepository, "findUserByEmail")
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

    describe("[S-A-02] AuthService.verifySignupCode()", () => {
        // mock input, output
        const verificationDto: VerificationDto = {
            email: "kys010306@sogang.ac.kr",
            verificationCode: "123456",
        };

        const foundVerification: Verification = {
            id: 1,
            email: "kys010306@sogang.ac.kr",
            verificationCode: "123456",
            verified: false,
            createdAt: new Date(),
        };

        const nonFoundVerification: Verification = null;

        it("[S-A-02-01] Success", async () => {
            // mock a return value
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "findVerification")
                    .mockResolvedValueOnce(foundVerification),
            );
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "updateVerification")
                    .mockResolvedValueOnce(),
            );

            // execute
            await expect(
                authService.verifySignupCode(verificationDto),
            ).resolves.toBeTruthy();

            // check if a mocked function have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[S-A-02-02] Not found", async () => {
            // mock a return value
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "findVerification")
                    .mockResolvedValueOnce(nonFoundVerification),
            );

            // execute
            await expect(
                authService.verifySignupCode(verificationDto),
            ).resolves.toBeFalsy();

            // check if a mocked function have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[S-A-02-03] Exception occurred while finding", async () => {
            // mock a return value
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "findVerification")
                    .mockRejectedValueOnce(new InternalServerErrorException()),
            );

            // execute
            await expect(
                authService.verifySignupCode(verificationDto),
            ).rejects.toThrow(InternalServerErrorException);

            // check if a mocked function have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[S-A-02-04] Exception occurred while updating", async () => {
            // mock a return value
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "findVerification")
                    .mockResolvedValueOnce(foundVerification),
            );
            mockedFuncs.push(
                jest
                    .spyOn(authRepository, "updateVerification")
                    .mockRejectedValueOnce(new InternalServerErrorException()),
            );

            // execute
            await expect(
                authService.verifySignupCode(verificationDto),
            ).rejects.toThrow(InternalServerErrorException);

            // check if a mocked function have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });
    });

    describe("[S-A-03] AuthService.signup()", () => {
        return;
    });
});
