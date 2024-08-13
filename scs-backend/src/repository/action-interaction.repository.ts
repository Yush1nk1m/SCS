import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ActionInteraction } from "../action/action-interaction.entity";
import { User } from "../user/user.entity";
import { Action } from "../action/action.entity";

@Injectable()
export class ActionInteractionRepository extends Repository<ActionInteraction> {
    private logger = new Logger("ActionInteractionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(ActionInteraction, dataSource.createEntityManager());
    }

    async findLike(user: User, action: Action): Promise<ActionInteraction> {
        return this.findOne({ where: { user, action, type: "LIKE" } });
    }
}
