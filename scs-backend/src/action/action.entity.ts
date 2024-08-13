import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Question } from "../question/question.entity";
import { ActionInteraction } from "./action-interaction.entity";

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column("simple-array", { nullable: true })
    imageUrls: string[];

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    shareCount: number;

    @Column({ default: 0 })
    reportCount: number;

    @ManyToOne(() => User, (user) => user.actions)
    writer: User;

    @ManyToOne(() => Question, (question) => question.actions, {
        onDelete: "CASCADE",
    })
    question: Question;

    @OneToMany(() => ActionInteraction, (interaction) => interaction.action, {
        cascade: true,
    })
    interactions: ActionInteraction[];
}
