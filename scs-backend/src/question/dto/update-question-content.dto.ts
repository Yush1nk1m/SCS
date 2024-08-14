import { Question } from "../question.entity";
import { PickType } from "@nestjs/swagger";

export class UpdateQuestionContentDto extends PickType(Question, ["content"]) {}
