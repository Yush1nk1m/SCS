import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AllExceptionFilter } from "./common/filter/all-exception.filter";
import {
    initializeTransactionalContext,
    StorageDriver,
} from "typeorm-transactional";

async function bootstrap() {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });

    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(4000);
}
bootstrap();
