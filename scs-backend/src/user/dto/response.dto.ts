import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { UserDto } from "./user.dto";
import { Expose, Type } from "class-transformer";

@Expose()
export class UserResponseDto extends BaseResponseDto {
    @ApiProperty({ type: UserDto, description: "사용자 정보" })
    @Type(() => UserDto)
    @Expose()
    user: UserDto;
}

@Expose()
export class UsersResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [UserDto], description: "사용자 정보 목록" })
    @Type(() => UserDto)
    @Expose()
    users: UserDto[];
}
