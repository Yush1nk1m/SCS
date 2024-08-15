import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { BaseResponseDto } from "../../common/dto/base-response.dto";
import { ActionDto } from "./action.dto";
import { Action } from "../action.entity";

export class ActionResponseDto extends BaseResponseDto {
    @ApiProperty({ type: ActionDto })
    action: ActionDto;
}

export class ContentResponseDto extends BaseResponseDto {
    @ApiProperty({
        example: "# TCP와 UDP\n\nTCP는...",
        description: "원본 마크다운 내용",
    })
    content: string;
}

export class LikeResponseDto extends IntersectionType(
    BaseResponseDto,
    PickType(Action, ["likeCount"]),
) {
    @ApiProperty({
        example: false,
        description: "사용자의 좋아요 여부 (결과)",
    })
    liked: boolean;
}
