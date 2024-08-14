import { PickType } from "@nestjs/swagger";
import { Section } from "../section.entity";

export class CreateSectionDto extends PickType(Section, [
    "subject",
    "description",
]) {}
