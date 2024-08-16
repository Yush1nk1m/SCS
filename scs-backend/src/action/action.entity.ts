import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Question } from "../question/question.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Comment } from "../comment/comment.entity";
import { Exclude, Expose } from "class-transformer";

@Entity()
@Index(["question", "updatedAt"])
@Index(["question", "likeCount"])
export class Action {
    @ApiProperty({ example: 1, description: "답변 ID" })
    @PrimaryGeneratedColumn()
    @Index("IDX_ACTION_ID")
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty({
        example: "관리자님이 2024. 08. 14. 작성한 답변입니다.",
        description: "답변 제목",
    })
    @Column()
    @IsString()
    @IsNotEmpty()
    @Expose()
    title: string;

    @ApiProperty({
        example: "TCP는 연결 지향적이고...",
        description: "답변 내용",
    })
    @IsString()
    @IsNotEmpty()
    @Column("text")
    @Expose()
    content: string;

    @ApiProperty({
        example: "# TCP와 UDP\n\nTCP는...",
        description: "원본 마크다운 내용",
    })
    @Column("text")
    @IsString()
    @IsNotEmpty()
    @Expose()
    rawContent: string;

    @ApiPropertyOptional({
        example: ["http://example.com/image1.jpg"],
        description: "답변에 포함된 이미지 URL들",
    })
    @Column("simple-array", { nullable: true })
    @IsArray()
    @Expose()
    imageUrls: string[];

    @ApiProperty({ example: 10, description: "좋아요 수" })
    @Column({ default: 0 })
    @IsInt()
    @Expose()
    likeCount: number;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "답변 생성 일시",
    })
    @CreateDateColumn()
    @IsDate()
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "답변 수정 일시",
    })
    @UpdateDateColumn()
    @IsDate()
    @Expose()
    updatedAt: Date;

    @ApiProperty({ type: () => User, description: "답변 작성자" })
    @ManyToOne(() => User, (user) => user.actions)
    @Expose()
    writer: User;

    @ApiProperty({ type: () => Question, description: "답변이 속한 질문" })
    @ManyToOne(() => Question, (question) => question.actions, {
        onDelete: "CASCADE",
    })
    @Expose()
    question: Question;

    @ApiPropertyOptional({
        type: () => [User],
        description: "답변을 좋아요한 사용자들",
    })
    @ManyToMany(() => User, (user) => user.likedActions, {
        onDelete: "CASCADE",
    })
    @JoinTable({ name: "Like" })
    @Exclude()
    likedBy: User[];

    @ApiPropertyOptional({
        type: () => [Comment],
        description: "액션에 작성된 댓글 목록",
    })
    @OneToMany(() => Comment, (comment) => comment.action)
    @Exclude()
    comments: Comment[];
}
