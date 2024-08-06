import { Controller, Get, HttpCode, HttpStatus, Logger } from "@nestjs/common";
import { Public } from "../common/decorator/public.decorator";
import { UserService } from "./user.service";
import { ResponseDto } from "../common/dto/response.dto";
import { User } from "./user.entity";

@Controller("v1/users")
export class UserController {
    private logger = new Logger("UserController");
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUsers(): Promise<ResponseDto<User[]>> {
        const users = await this.userService.findAllUsersFiltered();

        return {
            statusCode: HttpStatus.OK,
            message: "All users have been found.",
            data: users,
        };
    }
}
