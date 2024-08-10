import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Section } from "../section/section.entity";

@Entity()
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
    @JoinColumn({ name: "writer", referencedColumnName: "id" })
    writer: User;

    @ManyToOne(() => Section, (section) => section.questions)
    @JoinColumn({ name: "section", referencedColumnName: "id" })
    section: Section;
}
