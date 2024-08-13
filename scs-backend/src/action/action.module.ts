import { Module } from "@nestjs/common";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionRepository } from "./action.repository";
import { QuestionRepository } from "../question/question.repository";
import { UserRepository } from "../user/user.repository";

@Module({
    controllers: [ActionController],
    providers: [
        ActionService,
        ActionRepository,
        QuestionRepository,
        UserRepository,
    ],
    exports: [ActionService, ActionRepository],
})
export class ActionModule {}
