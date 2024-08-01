import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { Repository } from "typeorm";
import { Verification } from "./verification.entity";
import { InternalServerErrorException } from "@nestjs/common";

describe("AuthRepository", () => {
    let authRepository: AuthRepository;
    let repository: Repository<Verification>;

    // define a mocked input
    const email: string = "kys010306@sogang.ac.kr";
    const verificationCode: string = "123456";

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

    describe("[R-A-02] AuthRepository.verify()", () => {
        // define mocked input
        const nonExistingVerification: Verification = null;
        const existingVerification: Verification = {
            id: 1,
            email: "kys010306@sogang.ac.kr",
            verificationCode: "123456",
            verified: false,
            createdAt: new Date(),
        };

        it("[R-A-02-01] Success", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(repository, "findOne")
                    .mockResolvedValueOnce(existingVerification),
            );
            mockedFuncs.push(
                jest.spyOn(repository, "save").mockResolvedValueOnce(null),
            );

            // execute
            await expect(
                authRepository.verify(email, verificationCode),
            ).resolves.toBeTruthy();

            // check if the mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[R-A-02-02] Not verified", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(repository, "findOne")
                    .mockResolvedValueOnce(nonExistingVerification),
            );

            // execute
            await expect(
                authRepository.verify(email, verificationCode),
            ).resolves.toBeFalsy();

            // check if the mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[R-A-02-03] Exception occurred while finding", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(repository, "findOne")
                    .mockRejectedValueOnce(new InternalServerErrorException()),
            );

            // execute
            await expect(
                authRepository.verify(email, verificationCode),
            ).rejects.toThrow(InternalServerErrorException);

            // check if the mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });

        it("[R-A-02-04] Exception occurred while saving", async () => {
            // mock return values
            const mockedFuncs = [];
            mockedFuncs.push(
                jest
                    .spyOn(repository, "findOne")
                    .mockResolvedValueOnce(existingVerification),
            );
            mockedFuncs.push(
                jest
                    .spyOn(repository, "save")
                    .mockRejectedValueOnce(new InternalServerErrorException()),
            );

            // execute
            await expect(
                authRepository.verify(email, verificationCode),
            ).rejects.toThrow(InternalServerErrorException);

            // check if the mocked functions have been called
            for (const func of mockedFuncs) {
                expect(func).toHaveBeenCalledTimes(1);
            }
        });
    });
});
