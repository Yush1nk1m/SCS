import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { DataSource, Repository } from "typeorm";
import { Verification } from "./verification.entity";
import { InternalServerErrorException } from "@nestjs/common";

describe("AuthRepository", () => {
    let authRepository: AuthRepository;
    let dataSource: DataSource;
    let repository: Repository<Verification>;

    // define a mocked input
    const email: string = "kys010306@sogang.ac.kr";
    const verificationCode: string = "123456";

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthRepository,
                {
                    provide: DataSource,
                    useValue: {
                        createEntityManager: jest.fn().mockReturnValue({
                            save: jest.fn(),
                            update: jest.fn(),
                            findOne: jest.fn(),
                            delete: jest.fn(),
                            upsert: jest.fn(),
                        }),
                    },
                },
                {
                    provide: getRepositoryToken(Verification),
                    useClass: Repository,
                },
            ],
        }).compile();

        authRepository = module.get<AuthRepository>(AuthRepository);
        dataSource = module.get<DataSource>(DataSource);
        repository = module.get<Repository<Verification>>(
            getRepositoryToken(Verification),
        );
    });

    it("should be defined", () => {
        expect(authRepository).toBeDefined();
    });

    describe("[R-A-01] AuthRepository.createVerification()", () => {
        it("[R-A-01-01] Success", async () => {
            // mock a return value
            const mockedFunc = jest
                .spyOn(authRepository, "upsert")
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
                .spyOn(authRepository, "upsert")
                .mockRejectedValueOnce(new InternalServerErrorException());

            // execute
            await expect(
                authRepository.createVerification(email, verificationCode),
            ).rejects.toThrow(InternalServerErrorException);

            // check if the mocked function has been called
            expect(mockedFunc).toHaveBeenCalledTimes(1);
        });
    });
});
