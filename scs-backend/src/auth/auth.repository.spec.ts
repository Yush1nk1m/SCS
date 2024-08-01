import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { Repository } from "typeorm";
import { Verification } from "./verification.entity";
import { InternalServerErrorException } from "@nestjs/common";

describe("AuthRepository", () => {
    let authRepository: AuthRepository;
    let repository: Repository<Verification>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthRepository,
                {
                    provide: getRepositoryToken(Verification),
                    useClass: Repository,
                },
            ],
        }).compile();

        authRepository = module.get<AuthRepository>(AuthRepository);
        repository = module.get<Repository<Verification>>(
            getRepositoryToken(Verification),
        );
    });

    it("should be defined", () => {
        expect(authRepository).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe("[R-A-01] AuthRepository.createVerification()", () => {
        // define a mocked input
        const email: string = "kys010306@sogang.ac.kr";
        const verificationCode: string = "123456";

        it("[R-A-01-01] Success", async () => {
            // mock a return value
            const mockedFunc = jest
                .spyOn(repository, "upsert")
                .mockResolvedValueOnce(null);

            // execute
            await expect(
                authRepository.createVerification(email, verificationCode),
            ).resolves.toBeUndefined();

            // check if the mocked function has been called
            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });

        it("[R-A-01-02] Exception occurred", async () => {
            // mock a return value
            const mockedFunc = jest
                .spyOn(repository, "upsert")
                .mockRejectedValueOnce(new InternalServerErrorException());

            // execute
            await expect(
                authRepository.createVerification(email, verificationCode),
            ).rejects.toThrow(
                new InternalServerErrorException(
                    "Failed to create a verification row on database.",
                ),
            );

            // check if the mocked function has been called
            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });
    });
});
