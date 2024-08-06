import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { Public } from "../common/decorator/public.decorator";
import { UserService } from "./user.service";
import { ResponseDto } from "../common/dto/response.dto";
import { User } from "./user.entity";

@Controller("v1/users")
export class UserController {
    private logger = new Logger("UserController");
    constructor(private readonly userService: UserService) {}

    // [U-01] Controller logic
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

    // [U-02] Controller logic
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificUser(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<ResponseDto<User>> {
        const user = await this.userService.findUserByIdFiltered(id);

        return {
            statusCode: HttpStatus.OK,
            message: `An user with id: ${id} has been found.`,
            data: user,
        };
    }
}
