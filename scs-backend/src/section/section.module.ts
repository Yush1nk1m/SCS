import { Module } from "@nestjs/common";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
import { SectionRepository } from "./section.repository";
import { QuestionService } from "../question/question.service";
import { QuestionRepository } from "../question/question.repository";
import { UserRepository } from "../user/user.repository";

@Module({
    imports: [],
    controllers: [SectionController],
    providers: [
        SectionService,
        SectionRepository,
        UserRepository,
        QuestionService,
        QuestionRepository,
    ],
    exports: [SectionService, SectionRepository],
})
export class SectionModule {}
