import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

describe("UserService", () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {},
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it("should be defined", () => {
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });
});
