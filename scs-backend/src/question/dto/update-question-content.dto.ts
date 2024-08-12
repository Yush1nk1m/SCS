import { IsNotEmpty, IsString } from "class-validator";

export class UpdateQuestionContentDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}
