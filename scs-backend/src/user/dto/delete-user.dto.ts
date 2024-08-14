import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../user.entity";

export class DeleteUserDto extends PickType(User, ["password"]) {
    @ApiProperty({
        example: "회원 탈퇴를 희망합니다.",
        description: "회원 탈퇴를 위한 확인 메시지",
    })
    @IsString()
    @IsNotEmpty()
    confirmMessage: string;
}
