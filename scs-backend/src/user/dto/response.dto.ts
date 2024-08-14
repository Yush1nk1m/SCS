import { PickType } from "@nestjs/swagger";
import { User } from "../user.entity";

export class UserResponseDto extends PickType(User, [
    "id",
    "email",
    "nickname",
    "affiliation",
    "position",
]) {}
