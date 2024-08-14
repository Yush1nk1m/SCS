import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../../user/user.entity";
import { Question } from "../question.entity";

class WriterDto extends PickType(User, ["id", "nickname"]) {}

class QuestionDto extends PickType(Question, [
    "id",
    "content",
    "saved",
    "createdAt",
    "updatedAt",
]) {
    @ApiProperty({ type: WriterDto })
    writer: WriterDto;
}
