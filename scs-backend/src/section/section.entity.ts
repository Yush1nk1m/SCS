import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Question } from "../question/question.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";

@Entity()
export class Section {
    @ApiProperty({ example: 1, description: "섹션 고유 ID" })
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @ApiProperty({ example: "네트워크", description: "섹션 주제" })
    @Column()
    @IsString()
    subject: string;

    @ApiPropertyOptional({
        example: "네트워크 관련 질문들",
        description: "섹션 설명",
    })
    @Column({ nullable: true })
    @IsString()
    description: string;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "섹션 생성 일시",
    })
    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "섹션 수정 일시",
    })
    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ type: () => User, description: "섹션 생성자" })
    @ManyToOne(() => User, (user) => user.sections)
    creator: User;

    @ApiPropertyOptional({
        type: () => [Question],
        description: "섹션에 포함된 질문들",
    })
    @OneToMany(() => Question, (question) => question.section)
    questions: Question[];
}
