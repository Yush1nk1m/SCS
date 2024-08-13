import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ActionInteraction } from "../action/action-interaction.entity";

@Injectable()
export class ActionInteractionRepository extends Repository<ActionInteraction> {
    private logger = new Logger("ActionInteractionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(ActionInteraction, dataSource.createEntityManager());
    }
}
