import { IsNotEmpty, IsString, Length } from "class-validator";
import { CreateUserDto } from "../../user/dto/user.dto";

export class SignupDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 6)
    verificationCode: string;
}
