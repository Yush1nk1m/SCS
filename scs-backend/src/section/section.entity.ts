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

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.sections)
    creator: User;

    @OneToMany(() => Question, (question) => question.section)
    questions: Question[];
}
