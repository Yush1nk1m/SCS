import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateActionDto {
    @IsInt()
    questionId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100000)
    content: string;
}
