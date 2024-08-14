import { PickType } from "@nestjs/swagger";
import { User } from "../user.entity";

export class WriterDto extends PickType(User, ["id", "nickname"]) {}
