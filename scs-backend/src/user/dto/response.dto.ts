import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../user.entity";
import { BaseResponseDto } from "../../common/dto/base-response.dto";

export class UserFields extends PickType(User, [
    "id",
    "email",
    "nickname",
    "affiliation",
    "position",
]) {}

export class UserResponseDto extends BaseResponseDto {
    @ApiProperty({ type: UserFields, description: "사용자 정보" })
    user: UserFields;
}
export class UsersResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [UserFields], description: "사용자 정보 목록" })
    users: UserFields[];
}
