import { IsNotEmpty, IsString, Length } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 32)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 32)
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 32)
    confirmPassword: string;
}
