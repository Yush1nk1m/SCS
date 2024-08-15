import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";

export class URLResponseDto extends BaseResponseDto {
    @ApiProperty({
        example: "s3://aws.amazon.com/...",
        description: "업로드된 이미지의 URL",
    })
    url: string;
}

export class PresignedURLResponseDto extends BaseResponseDto {
    @ApiProperty({
        example: "image.png",
        description: "업로드될 이미지의 Key",
    })
    key: string;

    @ApiProperty({
        example: "s3://aws.amazon.com/...",
        description: "업로드된 이미지의 URL",
    })
    url: string;
}
