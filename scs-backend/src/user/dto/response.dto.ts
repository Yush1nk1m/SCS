import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { UserDto } from "./user.dto";
import { Expose } from "class-transformer";

export class UserResponseDto extends BaseResponseDto {
    @ApiProperty({ type: UserDto, description: "사용자 정보" })
    @Expose()
    user: UserDto;
}
export class UsersResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [UserDto], description: "사용자 정보 목록" })
    @Expose()
    users: UserDto[];
}
