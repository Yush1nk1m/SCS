import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { UserResponseDto } from "../../user/dto/response.dto";

export class TokensResponseDto extends BaseResponseDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        description: "액세스 토큰",
    })
    accessToken: string;

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        description: "리프레시 토큰",
    })
    refreshToken: string;
}

export class SignupResponseDto extends BaseResponseDto {
    @ApiProperty({ type: UserResponseDto, description: "사용자 정보" })
    user: UserResponseDto;
}
