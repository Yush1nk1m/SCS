import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository {
    private logger = new Logger("UserRepository");

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        private readonly dataSource: DataSource,
    ) {}

    async findUserByEmail(email: string): Promise<User> {
        try {
            return this.repository.findOne({ where: { email } });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(
                "Failed to find a user by email in database.",
            );
        }
    }

    async createUser(
        email: string,
        password: string,
        nickname: string,
        affiliation: string,
        position: string,
    ): Promise<User> {
        // create connection
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        // start transaction
        await queryRunner.startTransaction("SERIALIZABLE");

        // READ AND INSERT
        try {
            // find if there's an user with the same email already existing
            const existingUser = await queryRunner.manager
                .getRepository(User)
                .findOne({ where: { email } });

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
            const savedUser = await queryRunner.manager.save(user);

            // commit the transaction
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
