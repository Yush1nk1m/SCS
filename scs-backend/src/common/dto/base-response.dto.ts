import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseDto {
    @ApiProperty({
        example: "Login request has been succeeded.",
        description: "응답 메시지",
    })
    message: string;
}
