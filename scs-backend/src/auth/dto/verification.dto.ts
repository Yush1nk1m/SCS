import { IsEmail, IsString, Length } from "class-validator";

export class VerificationDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 6)
    verificationCode: string;
}
