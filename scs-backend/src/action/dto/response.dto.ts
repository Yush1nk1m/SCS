import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { ActionDetailDto, ActionDto } from "./action.dto";
import { Expose, Type } from "class-transformer";

export class ActionsResponseDto extends BaseResponseDto {
    @ApiProperty({ type: [ActionDto] })
    @Type(() => ActionDto)
    @Expose()
    actions: ActionDto[];

    @ApiProperty({ example: 5, description: "검색된 액션의 총 개수" })
    @Expose()
    total: number;
}
export class ActionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: ActionDetailDto })
    @Type(() => ActionDetailDto)
    @Expose()
    action: ActionDetailDto;
}

export class ContentResponseDto extends BaseResponseDto {
    @ApiProperty({
        example: "# TCP와 UDP\n\nTCP는...",
        description: "원본 마크다운 내용",
    })
    @Expose()
    content: string;
}

export class LikeResponseDto extends BaseResponseDto {
    @ApiProperty({ example: 10, description: "좋아요 수" })
    @Expose()
    likeCount: number;

    @ApiProperty({
        example: false,
        description: "사용자의 좋아요 여부 (결과)",
    })
    @Expose()
    liked: boolean;
}
