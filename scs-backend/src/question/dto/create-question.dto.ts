import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsInt()
    @IsNotEmpty()
    sectionId: number;
}
