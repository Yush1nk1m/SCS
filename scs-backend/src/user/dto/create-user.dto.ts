import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(8, 32)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsNotEmpty()
    affiliation: string;

    @IsNotEmpty()
    position: string;
}
