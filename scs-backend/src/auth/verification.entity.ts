import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, Length } from "class-validator";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class Verification {
    @ApiProperty({ example: 1, description: "인증 ID" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "user@example.com",
        description: "인증할 이메일 주소",
    })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "q1w2e3",
        description: "인증 코드",
    })
    @Column()
    @Length(6, 6)
    verificationCode: string;

    @ApiProperty({ example: false, description: "인증 완료 여부" })
    @Column({ default: false })
    @IsBoolean()
    verified: boolean;

    @ApiProperty({
        example: "2024-08-14T18:31:56Z",
        description: "인증 요청 생성 시간",
    })
    @CreateDateColumn()
    createdAt: Date;
}
