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
    Post,
} from "@nestjs/common";
import { ActionService } from "./action.service";
import { Public } from "../common/decorator/public.decorator";
import {
    ActionResponse,
    ContentResponse,
    LikeResponse,
} from "./types/response.type";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { BaseResponse } from "../common/types/response.type";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Action")
@Controller("v1/actions")
export class ActionController {
    private logger = new Logger("ActionController");

    constructor(private readonly actionService: ActionService) {}

    // [AC-01] Controller logic
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificAction(
        @Param("id", ParseIntPipe) actionId: number,
    ): Promise<ActionResponse> {
        const action = await this.actionService.getSpecificAction(actionId);

        return {
            message: `Action with id ${actionId} has been found.`,
            action,
        };
    }

    // [AC-02] Controller logic
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createAction(
        @GetCurrentUserId() userId: number,
        @Body() createActionDto: CreateActionDto,
    ): Promise<ActionResponse> {
        const action = await this.actionService.createAction(
            userId,
            createActionDto,
        );

        return {
            message: "New action has been created.",
            action,
        };
    }

    // [AC-03] Controller logic
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updateAction(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) actionId: number,
        @Body() updateActionDto: UpdateActionDto,
    ): Promise<ActionResponse> {
        const action = await this.actionService.updateAction(
            userId,
            actionId,
            updateActionDto,
        );

        return {
            message: "Action has been updated.",
            action,
        };
    }

    // [AC-04] Controller logic
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteAction(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) actionId: number,
    ): Promise<BaseResponse> {
        await this.actionService.deleteAction(userId, actionId);

        return {
            message: "Action has been deleted.",
        };
    }

    // [AC-05] Controller logic
    @Get(":id/raw-content")
    @HttpCode(HttpStatus.OK)
    async getRawContent(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) actionId: number,
    ): Promise<ContentResponse> {
        const content = await this.actionService.getRawContent(
            userId,
            actionId,
        );

        return {
            message: "Raw markdown content has been found.",
            content,
        };
    }

    // [AC-06] Controller logic
    @Post(":id/like")
    @HttpCode(HttpStatus.OK)
    async toggleActionLike(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) actionId: number,
    ): Promise<LikeResponse> {
        const [liked, likeCount] = await this.actionService.toggleLike(
            userId,
            actionId,
        );

        return {
            message: "Like to the action has been processed.",
            liked,
            likeCount,
        };
    }

    // [AC-07] Controller logic
    @Get(":id/like")
    @HttpCode(HttpStatus.OK)
    async getActionLike(
        @GetCurrentUserId() userId: number,
        @Param("id", ParseIntPipe) actionId: number,
    ): Promise<LikeResponse> {
        const [liked, likeCount] = await this.actionService.getLike(
            userId,
            actionId,
        );

        return {
            message: "Like information for the action has been found.",
            liked,
            likeCount,
        };
    }
}
