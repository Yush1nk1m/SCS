import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionFilter } from "./common/filter/all-exception.filter";
import {
    initializeTransactionalContext,
    StorageDriver,
} from "typeorm-transactional";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });

    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(4000);
}
bootstrap();
