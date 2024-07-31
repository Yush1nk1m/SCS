import { IsBoolean, IsEmail, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Length(6, 6)
    verificationCode: string;

    @Column({ default: false })
    @IsBoolean()
    verified: boolean;
}
