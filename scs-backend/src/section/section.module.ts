import { Module } from "@nestjs/common";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
import { SectionRepository } from "./section.repository";
import { UserModule } from "../user/user.module";
import { QuestionModule } from "../question/question.module";

@Module({
    imports: [UserModule, QuestionModule],
    controllers: [SectionController],
    providers: [SectionService, SectionRepository],
})
export class SectionModule {}
