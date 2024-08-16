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
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Section {
    @ApiProperty({ example: 1, description: "섹션 고유 ID" })
    @PrimaryGeneratedColumn()
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty({ example: "네트워크", description: "섹션 주제" })
    @Column()
    @IsString()
    @Expose()
    subject: string;

    @ApiPropertyOptional({
        example: "네트워크 관련 질문들",
        description: "섹션 설명",
    })
    @Column({ nullable: true })
    @IsString()
    @Expose()
    description: string;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "섹션 생성 일시",
    })
    @CreateDateColumn()
    @IsDate()
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "섹션 수정 일시",
    })
    @UpdateDateColumn()
    @IsDate()
    @Expose()
    updatedAt: Date;

    @ApiProperty({ type: () => User, description: "섹션 생성자" })
    @ManyToOne(() => User, (user) => user.sections)
    @Expose()
    creator: User;

    @ApiPropertyOptional({
        type: () => [Question],
        description: "섹션에 포함된 질문들",
    })
    @OneToMany(() => Question, (question) => question.section)
    @Exclude()
    questions: Question[];
}
