import { ApiProperty, PickType } from "@nestjs/swagger";
import { WriterDto } from "../../user/dto/writer.dto";
import { Question } from "../question.entity";

export class QuestionDto extends PickType(Question, [
    "id",
    "content",
    "saved",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: () => WriterDto })
    writer: WriterDto;
}
