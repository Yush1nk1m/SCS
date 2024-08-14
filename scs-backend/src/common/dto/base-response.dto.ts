import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseDto {
    @ApiProperty({
        example: "Request has been processed.",
        description: "응답 메시지",
    })
    message: string;
}
