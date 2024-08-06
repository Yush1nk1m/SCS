import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
} from "@nestjs/common";
import { Public } from "../common/decorator/public.decorator";
import { UserService } from "./user.service";
import { ResponseDto } from "../common/dto/response.dto";
import { User } from "./user.entity";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";

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

    // [U-03] Controller logic
    @Get("me")
    @HttpCode(HttpStatus.OK)
    async getCurrentUser(
        @GetCurrentUserId() id: number,
    ): Promise<ResponseDto<User>> {
        const user = await this.userService.findUserByIdFiltered(id);

        return {
            statusCode: HttpStatus.OK,
            message: `An user with id: ${id} has been found.`,
            data: user,
        };
    }

    // [U-04] Controller logic
    @Patch("password")
    @HttpCode(HttpStatus.OK)
    async changeUserPassword(
        @GetCurrentUserId() id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<ResponseDto<void>> {
        await this.userService.changeUserPassword(id, changePasswordDto);

        return {
            statusCode: HttpStatus.OK,
            message: "User password has been changed.",
        };
    }
}
