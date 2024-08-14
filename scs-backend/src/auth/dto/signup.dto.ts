import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IntersectionType, PickType } from "@nestjs/swagger";
import { Verification } from "../verification.entity";
import { User } from "../../user/user.entity";

const UserFields = PickType(User, [
    "email",
    "password",
    "nickname",
    "affiliation",
    "position",
] as const);
const VerificationFields = PickType(Verification, [
    "verificationCode",
] as const);

export class SignupDto extends IntersectionType(
    UserFields,
    VerificationFields,
) {
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

    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    verificationCode: string;
}
