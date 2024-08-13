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

@Entity()
@Index(["section", "saved"])
@Index(["section", "createdAt"])
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0 })
    saved: number;

    @ManyToOne(() => User, (user) => user.questions)
    writer: User;

    @ManyToOne(() => Section, (section) => section.questions, {
        onDelete: "CASCADE",
    })
    section: Section;

    @OneToMany(() => Action, (action) => action.question)
    actions: Action[];
}
