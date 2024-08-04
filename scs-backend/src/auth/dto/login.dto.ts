import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @Length(8, 32)
    @IsNotEmpty()
    password: string;
}
