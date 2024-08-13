import { Global, Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthRepository } from "./auth.repository";
import { SectionRepository } from "./section.repository";
import { QuestionRepository } from "./question.repository";
import { ActionRepository } from "./action.repository";
import { ActionInteractionRepository } from "./action-interaction.repository";

@Global()
@Module({
    providers: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
        ActionInteractionRepository,
    ],
    exports: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
        ActionInteractionRepository,
    ],
})
export class RepositoryModule {}
