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

    @ManyToOne(() => User, (user) => user.actionInteractions)
    user: User;

    @ManyToOne(() => Action, (action) => action.interactions)
    action: Action;

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
}
