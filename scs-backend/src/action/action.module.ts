import { Module } from "@nestjs/common";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionRepository } from "./action.repository";
import { QuestionRepository } from "../question/question.repository";

@Module({
    controllers: [ActionController],
    providers: [ActionService, ActionRepository, QuestionRepository],
    exports: [ActionService, ActionRepository],
})
export class ActionModule {}
