import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { CommentRepository } from "../repository/comment.repository";
import { UserRepository } from "../repository/user.repository";
import { ActionRepository } from "../repository/action.repository";
import { Comment } from "./comment.entity";

@Injectable()
export class CommentService {
    private logger = new Logger("CommentService");

    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly userRepository: UserRepository,
        private readonly actionRepository: ActionRepository,
    ) {}

    async createComment(
        userId: number,
        actionId: number,
        content: string,
    ): Promise<Comment> {
        // find user from DB
        const writer = await this.userRepository.findUserById(userId);

        // if user does not exist, it is an error
        if (!writer) {
            throw new UnauthorizedException("User does not exist.");
        }

        // find an action from DB
        const action = await this.actionRepository.findActionById(actionId);

        // if the action does not exist, it is an error
        if (!action) {
            throw new NotFoundException(
                `Action with id ${actionId} has not been found.`,
            );
        }

        // create a comment and return
        const comment = this.commentRepository.create({
            content,
            writer,
            action,
        });

        return this.commentRepository.save(comment);
    }
}
