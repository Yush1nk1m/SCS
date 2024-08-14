import { PickType } from "@nestjs/swagger";
import { Verification } from "../verification.entity";

export class VerificationDto extends PickType(Verification, [
    "email",
    "verificationCode",
]) {}
