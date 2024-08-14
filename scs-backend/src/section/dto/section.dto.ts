import { PickType } from "@nestjs/swagger";
import { Section } from "../section.entity";

export class SectionDto extends PickType(Section, [
    "id",
    "subject",
    "description",
]) {}
