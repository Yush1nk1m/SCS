import { PickType } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { Verification } from "../verification.entity";

export class EmailDto extends PickType(Verification, ["email"]) {
    @IsEmail()
    email: string;
}
