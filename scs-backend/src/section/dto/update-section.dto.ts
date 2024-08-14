import { PickType } from "@nestjs/swagger";
import { Section } from "../section.entity";

export class UpdateSectionSubjectDto extends PickType(Section, ["subject"]) {}

export class UpdateSectionDescriptionDto extends PickType(Section, [
    "description",
]) {}
