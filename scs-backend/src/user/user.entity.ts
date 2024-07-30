import { IsEmail, IsNotEmpty, Length } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
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

    @CreateDateColumn()
    createdAt: Date;
}
