import { IsEmail, IsNotEmpty, Length } from "class-validator";
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

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Index("IDX_USER_ID", { unique: true })
    id: number;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @Length(8, 32)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    nickname: string;

    @Column()
    @IsNotEmpty()
    affiliation: string;

    @Column()
    @IsNotEmpty()
    position: string;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({
        type: "enum",
        enum: ["user", "admin"],
        default: "user",
    })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Section, (section) => section.creator)
    sections: Section[];

    @OneToMany(() => Question, (question) => question.writer)
    questions: Question[];

    @OneToMany(() => Action, (action) => action.writer)
    actions: Action[];

    @ManyToMany(() => Action, (action) => action.likedBy, {
        onDelete: "CASCADE",
    })
    likedActions: Action[];
}
