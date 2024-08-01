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
        // define a mocked input
        const emailDto: EmailDto = {
            email: "kys010306@sogang.ac.kr",
        };

        it("[C-A-01-01] Success", async () => {
            // mock a service method
            const mockedFunc = jest
                .spyOn(authService, "sendVerificationMail")
                .mockResolvedValue();

            const expectedResult: ResponseDto<null> = {
                statusCode: HttpStatus.CREATED,
                message: "A verification mail has been sent.",
            };

            await expect(
                authController.sendVerificationMail(emailDto),
            ).resolves.toEqual(expectedResult);

            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });

        it("[C-A-01-02] Exception occurred", async () => {
            // mock a service method
            const mockedFunc = jest
                .spyOn(authService, "sendVerificationMail")
                .mockRejectedValue(new InternalServerErrorException());

            await expect(
                authController.sendVerificationMail(emailDto),
            ).rejects.toThrow(InternalServerErrorException);

            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });
    });
});
