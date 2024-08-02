import { Injectable, Logger } from "@nestjs/common";
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
        // create or update a verification row on database
        await this.repository.upsert([{ email, verificationCode }], ["email"]);
    }

    async updateVerification(
        email: string,
        verificationCode: string,
        verified: boolean,
    ): Promise<void> {
        await this.repository.update({ email, verificationCode }, { verified });
    }

    async findVerification(
        email: string,
        verificationCode: string,
    ): Promise<Verification> {
        return this.repository.findOne({
            where: { email, verificationCode },
        });
    }

    async deleteVerification(email: string): Promise<void> {
        await this.repository.delete({ email });
    }
}
