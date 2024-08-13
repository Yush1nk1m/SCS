import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateActionDto {
    @IsInt()
    questionId: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}
