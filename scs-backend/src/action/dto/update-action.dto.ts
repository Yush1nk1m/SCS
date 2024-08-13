import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateActionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100000)
    content: string;
}
