import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Action } from "./action.entity";

@Entity()
export class ActionInteraction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ["LIKE", "SHARE", "REPORT"],
        default: "LIKE",
    })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.actionInteractions, {
        onDelete: "CASCADE",
    })
    user: User;

    @ManyToOne(() => Action, (action) => action.interactions, {
        onDelete: "CASCADE",
    })
    action: Action;
}
