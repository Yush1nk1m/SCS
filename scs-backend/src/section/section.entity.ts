import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";

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

    @ManyToOne(() => User, (user) => user.sections)
    @JoinColumn({ name: "creator", referencedColumnName: "id" })
    creator: User;
}
