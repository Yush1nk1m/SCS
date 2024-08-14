import { PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { User } from "../../user/user.entity";

export class LoginDto extends PickType(User, ["email", "password"] as const) {
    @IsEmail()
    email: string;

    @Length(8, 32)
    @IsNotEmpty()
    password: string;
}
