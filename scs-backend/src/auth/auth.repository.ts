import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Verification } from "./verification.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {
    private logger = new Logger("AuthRepository");

    constructor(
        @InjectRepository(Verification)
        private readonly repository: Repository<Verification>,
    ) {}

    async createVerification(
        email: string,
        verificationCode: string,
    ): Promise<void> {
        try {
            // create or update a verification row on database
            await this.repository.upsert(
                [{ email, verificationCode }],
                ["email"],
            );
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(
                "Failed to create a verification row on database.",
            );
        }
    }
}
