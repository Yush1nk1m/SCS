import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    description: string;
}
