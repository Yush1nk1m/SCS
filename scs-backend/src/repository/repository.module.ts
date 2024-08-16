import { Global, Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthRepository } from "./auth.repository";
import { SectionRepository } from "./section.repository";
import { QuestionRepository } from "./question.repository";
import { ActionRepository } from "./action.repository";
import { CommentRepository } from "./comment.repository";

@Global()
@Module({
    providers: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
        CommentRepository,
    ],
    exports: [
        AuthRepository,
        UserRepository,
        SectionRepository,
        QuestionRepository,
        ActionRepository,
        CommentRepository,
    ],
})
export class RepositoryModule {}
