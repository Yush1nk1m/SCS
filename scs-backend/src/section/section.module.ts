import { Module } from "@nestjs/common";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
import { SectionRepository } from "./section.repository";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule],
    controllers: [SectionController],
    providers: [SectionService, SectionRepository],
})
export class SectionModule {}
