import {
    IsDate,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
} from "class-validator";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Section } from "../section/section.entity";
import { Question } from "../question/question.entity";
import { Action } from "../action/action.entity";
import {
    ApiHideProperty,
    ApiProperty,
    ApiPropertyOptional,
} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({ example: 1, description: "사용자 고유 ID" })
    @PrimaryGeneratedColumn()
    @Index("IDX_USER_ID", { unique: true })
    @IsInt()
    id: number;

    @ApiProperty({ example: "user@example.com", description: "사용자 이메일" })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "password123",
        description: "사용자 비밀번호 (8-32자)",
    })
    @Column()
    @Length(8, 32)
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: "닉네임", description: "사용자 닉네임" })
    @Column()
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @ApiProperty({ example: "서강대학교", description: "사용자 소속" })
    @Column()
    @IsString()
    @IsNotEmpty()
    affiliation: string;

    @ApiProperty({ example: "백엔드", description: "사용자 포지션" })
    @Column()
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiHideProperty()
    @Column({ nullable: true })
    @IsString()
    refreshToken: string;

    @ApiProperty({
        enum: ["user", "admin"],
        default: "user",
        description: "사용자 권한",
    })
    @Column({
        type: "enum",
        enum: ["user", "admin"],
        default: "user",
    })
    @IsEnum(["user", "admin"])
    role: string;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "계정 생성 일시",
    })
    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "계정 정보 수정 일시",
    })
    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

    @ApiPropertyOptional({
        example: "2023-08-14T12:34:56Z",
        description: "계정 삭제 일시",
    })
    @DeleteDateColumn()
    @IsDate()
    deletedAt: Date;

    @ApiPropertyOptional({
        type: () => [Section],
        description: "생성한 섹션 목록",
    })
    @OneToMany(() => Section, (section) => section.creator)
    sections: Section[];

    @ApiPropertyOptional({
        type: () => [Question],
        description: "작성한 질문 목록",
    })
    @OneToMany(() => Question, (question) => question.writer)
    questions: Question[];

    @ApiPropertyOptional({
        type: () => [Action],
        description: "작성한 답변 목록",
    })
    @OneToMany(() => Action, (action) => action.writer)
    actions: Action[];

    @ApiPropertyOptional({
        type: () => [Action],
        description: "좋아요한 답변 목록",
    })
    @ManyToMany(() => Action, (action) => action.likedBy, {
        onDelete: "CASCADE",
    })
    likedActions: Action[];
}
