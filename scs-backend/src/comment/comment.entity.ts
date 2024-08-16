import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Action } from "../action/action.entity";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Comment {
    @ApiProperty({ example: 1, description: "댓글 고유 ID" })
    @PrimaryGeneratedColumn()
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty({
        example: "이 게시물은 큰 도움이 되었습니다 ...",
        description: "댓글 내용",
    })
    @Column()
    @IsString()
    @IsNotEmpty()
    @Expose()
    content: string;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "댓글 작성 일시",
    })
    @CreateDateColumn()
    @IsDate()
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: "2024-08-14T12:34:56Z",
        description: "댓글 수정 일시",
    })
    @UpdateDateColumn()
    @IsDate()
    @Expose()
    updatedAt: Date;

    @ApiProperty({ type: () => User, description: "댓글 작성자" })
    @ManyToOne(() => User, (user) => user.comments)
    @Expose()
    writer: User;

    @ApiProperty({ type: () => Action, description: "댓글이 작성된 액션" })
    @ManyToOne(() => Action, (action) => action.comments)
    @Exclude()
    action: Action;
}
