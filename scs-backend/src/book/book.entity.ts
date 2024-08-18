import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Question } from "../question/question.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: 0 })
    likeCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.books, { onDelete: "CASCADE" })
    publisher: User;

    @ManyToMany(() => Question, (question) => question.books, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinTable({ name: "BookQuestion" })
    questions: Question[];

    @ManyToMany(() => User, (user) => user.likedBooks, {
        onDelete: "CASCADE",
    })
    @JoinTable({ name: "BookLike" })
    likedBy: User[];
}
