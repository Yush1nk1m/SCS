import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./config/typeorm.config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SectionModule } from "./section/section.module";
import { QuestionModule } from "./question/question.module";
import { ActionModule } from "./action/action.module";
import { CommentModule } from "./comment/comment.module";
import { BookModule } from "./book/book.module";
import { LibraryModule } from "./library/library.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
        UserModule,
        SectionModule,
        QuestionModule,
        ActionModule,
        CommentModule,
        BookModule,
        LibraryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
