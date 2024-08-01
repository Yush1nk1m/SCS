import { Test, TestingModule } from "@nestjs/testing";
import { AuthRepository } from "./auth.repository";

describe("AuthRepository", () => {
    let authRepository: AuthRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthRepository],
        }).compile();

        authRepository = module.get<AuthRepository>(AuthRepository);
    });

    it("should be defined", () => {
        expect(authRepository).toBeDefined();
    });
});
