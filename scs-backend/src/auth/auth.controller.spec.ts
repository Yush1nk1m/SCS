import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EmailDto } from "./dto/email.dto";
import { ResponseDto } from "src/common/dto/response.dto";
import { HttpStatus, InternalServerErrorException } from "@nestjs/common";

describe("AuthController", () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        sendVerificationMail: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    });

    describe("[C-A-01] AuthController.sendVerificationMail()", () => {
        // define a valid input
        const emailDto: EmailDto = {
            email: "kys010306@sogang.ac.kr",
        };

        it("[C-A-01-01] Success", async () => {
            // mock a service method
            jest.spyOn(authService, "sendVerificationMail").mockImplementation(
                () => Promise.resolve(),
            );

            const result = await authController.sendVerificationMail(emailDto);
            const expectedResult: ResponseDto<null> = {
                statusCode: HttpStatus.CREATED,
                message: "A verification mail has been sent.",
            };

            expect(result).toEqual(expectedResult);
        });

        it("[C-A-01-02] Exception occurred", async () => {
            // mock a service method
            jest.spyOn(authService, "sendVerificationMail").mockImplementation(
                () => Promise.reject(new InternalServerErrorException()),
            );

            await expect(
                authController.sendVerificationMail(emailDto),
            ).rejects.toThrow(InternalServerErrorException);
        });
    });
});
