import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { QuestionRepository } from "./question.repository";
import { SectionRepository } from "../section/section.repository";

@Module({
    imports: [],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionRepository, SectionRepository],
})
export class QuestionModule {}
