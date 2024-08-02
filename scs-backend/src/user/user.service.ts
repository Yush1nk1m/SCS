import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { EmailDto } from "../auth/dto/email.dto";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/user.dto";
import { DataSource } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dataSource: DataSource,
    ) {}

    async findUser(emailDto: EmailDto): Promise<User> {
        const { email } = emailDto;
        return this.userRepository.findUserByEmail(email);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, nickname, affiliation, position } =
            createUserDto;

        // create connection
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        // start transaction and get repositories
        await queryRunner.startTransaction("SERIALIZABLE");
        const userRepository = queryRunner.manager.getRepository(User);

        // READ AND INSERT
        try {
            const existingUser = await userRepository.findOne({
                where: { email },
            });

            if (existingUser) {
                throw new ConflictException(
                    "An user with the same email already exists.",
                );
            }

            // create a new entity
            const user = new User();
            user.email = email;
            user.password = password;
            user.nickname = nickname;
            user.affiliation = affiliation;
            user.position = position;

            // save the entity to DB
            const savedUser = await userRepository.save(user);

            // commit this transaction
            await queryRunner.commitTransaction();

            delete savedUser.password;
            return savedUser;
        } catch (error) {
            // if any error has been occurred, rollback and throw error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // finally, the connection needs to be released
            await queryRunner.release();
        }
    }
}
