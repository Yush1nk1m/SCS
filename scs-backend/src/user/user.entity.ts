import { IsEmail, IsNotEmpty, Length } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "../section/section.entity";

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

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: "enum",
        enum: ["user", "admin"],
        default: "user",
    })
    role: string;

    @OneToMany(() => Section, (section) => section.creator)
    sections: Section[];
}
