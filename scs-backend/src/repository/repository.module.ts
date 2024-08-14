import { Global, Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthRepository } from "./auth.repository";
import { SectionRepository } from "./section.repository";
import { QuestionRepository } from "./question.repository";
import { ActionRepository } from "./action.repository";

@Global()
@Module({
    providers: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
    ],
    exports: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
    ],
})
export class RepositoryModule {}
