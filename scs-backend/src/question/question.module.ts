import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { QuestionRepository } from "./question.repository";
import { SectionRepository } from "../section/section.repository";
import { UserRepository } from "../user/user.repository";
import { ActionService } from "../action/action.service";
import { ActionRepository } from "../action/action.repository";

@Module({
    imports: [],
    controllers: [QuestionController],
    providers: [
        QuestionService,
        QuestionRepository,
        SectionRepository,
        UserRepository,
        ActionService,
        ActionRepository,
    ],
    exports: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
