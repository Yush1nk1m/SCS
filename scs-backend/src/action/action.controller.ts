import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Post,
} from "@nestjs/common";
import { ActionService } from "./action.service";
import { Public } from "../common/decorator/public.decorator";
import { ActionResponse } from "./types/response.type";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { CreateActionDto } from "./dto/create-action.dto";

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
}
