import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { ActionService } from "./action.service";
import { Public } from "../common/decorator/public.decorator";
import { ActionResponse } from "./types/response.type";

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
}
