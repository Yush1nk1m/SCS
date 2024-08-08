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
import { BaseResponse } from "../common/types/response.type";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserResponse, UsersResponse } from "./types/response.type";

@Controller("v1/users")
export class UserController {
    private logger = new Logger("UserController");
    constructor(private readonly userService: UserService) {}

    // [U-01] Controller logic
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUsers(): Promise<UsersResponse> {
        const users = await this.userService.findAllUsersFiltered();

        return {
            message: "All users have been found.",
            users,
        };
    }

    // [U-03] Controller logic
    @Get("me")
    @HttpCode(HttpStatus.OK)
    async getCurrentUser(
        @GetCurrentUserId(ParseIntPipe) id: number,
    ): Promise<UserResponse> {
        this.logger.verbose(
            `An user with id: ${id} has requested to get information`,
        );
        const user = await this.userService.findUserByIdFiltered(id);

        return {
            message: `An user with id: ${id} has been found.`,
            user,
        };
    }

    // [U-02] Controller logic
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificUser(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<UserResponse> {
        const user = await this.userService.findUserByIdFiltered(id);

        return {
            message: `An user with id: ${id} has been found.`,
            user,
        };
    }

    // [U-04] Controller logic
    @Patch("password")
    @HttpCode(HttpStatus.OK)
    async changeUserPassword(
        @GetCurrentUserId() id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<BaseResponse> {
        await this.userService.changeUserPassword(id, changePasswordDto);

        return {
            message: "User password has been changed.",
        };
    }
}
