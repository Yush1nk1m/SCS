import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Section } from "../section/section.entity";
import { Action } from "../action/action.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
@Index(["section", "saved"])
@Index(["section", "createdAt"])
export class Question {
    @ApiProperty({ example: 1, description: "질문 ID" })
    @PrimaryGeneratedColumn()
    @Index("IDX_QUESTION_ID")
    id: number;

    @ApiProperty({
        example: "TCP와 UDP의 차이점은 무엇인가요?",
        description: "질문 내용",
    })
    @Column()
    content: string;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "질문 생성 일시",
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "질문 수정 일시",
    })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ example: 5, description: "질문이 스크랩된 횟수" })
    @Column({ default: 0 })
    saved: number;

    @ApiProperty({ type: () => User, description: "질문 작성자" })
    @ManyToOne(() => User, (user) => user.questions)
    writer: User;

    @ApiProperty({ type: () => Section, description: "질문이 속한 섹션" })
    @ManyToOne(() => Section, (section) => section.questions, {
        onDelete: "CASCADE",
    })
    section: Section;

    @ApiPropertyOptional({
        type: () => [Action],
        description: "질문에 대한 답변들",
    })
    @OneToMany(() => Action, (action) => action.question)
    actions: Action[];
}
