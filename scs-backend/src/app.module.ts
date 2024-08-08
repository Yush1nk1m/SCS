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
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "./common/guard/access-token.guard";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory() {
                return typeORMConfig;
            },
            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error("Invalid options passed.");
                }

                return addTransactionalDataSource(new DataSource(options));
            },
        }),
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
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {}
