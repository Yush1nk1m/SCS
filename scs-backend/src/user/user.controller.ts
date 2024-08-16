import {
    Body,
    Controller,
    Delete,
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
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeNicknameDto } from "./dto/change-nickname.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { UserResponseDto, UsersResponseDto } from "./dto/response.dto";
import { BaseResponseDto } from "../common/dto/base-response.dto";
import { SetResponseDto } from "../common/decorator/set-response-dto.decorator";

@ApiTags("User")
@Controller("v1/users")
export class UserController {
    private logger = new Logger("UserController");
    constructor(private readonly userService: UserService) {}

    // [U-01] Controller logic
    @ApiOperation({ summary: "모든 사용자 정보 조회" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "사용자 정보 조회 성공",
        type: UsersResponseDto,
    })
    @SetResponseDto(UsersResponseDto)
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUsers(): Promise<UsersResponseDto> {
        const users = await this.userService.findAllUsers();

        return {
            message: "All users have been found.",
            users,
        };
    }

    // [U-03] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "로그인한 사용자 정보 조회" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "사용자 정보 조회 성공",
        type: UserResponseDto,
    })
    @SetResponseDto(UserResponseDto)
    @Get("me")
    @HttpCode(HttpStatus.OK)
    async getCurrentUser(
        @GetCurrentUserId(ParseIntPipe) id: number,
    ): Promise<UserResponseDto> {
        this.logger.verbose(
            `An user with id: ${id} has requested to get information`,
        );
        const user = await this.userService.findUser(id);

        return {
            message: `An user with id: ${id} has been found.`,
            user,
        };
    }

    // [U-02] Controller logic
    @ApiOperation({ summary: "특정 사용자 정보 조회" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "사용자 정보 조회 성공",
        type: UserResponseDto,
    })
    @SetResponseDto(UserResponseDto)
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificUser(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<UserResponseDto> {
        const user = await this.userService.findUser(id);

        return {
            message: `An user with id: ${id} has been found.`,
            user,
        };
    }

    // [U-04] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "로그인한 사용자 비밀번호 변경" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "비밀번호 변경 성공",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Patch("password")
    @HttpCode(HttpStatus.OK)
    async changeUserPassword(
        @GetCurrentUserId() id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<BaseResponseDto> {
        await this.userService.changeUserPassword(id, changePasswordDto);

        return {
            message: "User password has been changed.",
        };
    }

    // [U-05] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "로그인한 사용자 닉네임 변경" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "닉네임 변경 성공",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Patch("nickname")
    @HttpCode(HttpStatus.OK)
    async changeUserNickname(
        @GetCurrentUserId() id: number,
        @Body() changeNicknameDto: ChangeNicknameDto,
    ): Promise<BaseResponseDto> {
        await this.userService.changeUserNickname(id, changeNicknameDto);

        return {
            message: "User nickname has been changed.",
        };
    }

    // [U-06] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "로그인한 사용자 회원 탈퇴" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "회원 탈퇴 성공",
        type: BaseResponseDto,
    })
    @SetResponseDto(BaseResponseDto)
    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteCurrentUser(
        @GetCurrentUserId() id: number,
        @Body() deleteUserDto: DeleteUserDto,
    ): Promise<BaseResponseDto> {
        await this.userService.deleteUser(id, deleteUserDto);

        return {
            message: `An user with id: ${id} has been deleted.`,
        };
    }
}
