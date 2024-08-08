import { IsNotEmpty, IsString, Length } from "class-validator";

export class DeleteUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 32)
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmMessage: string;
}
