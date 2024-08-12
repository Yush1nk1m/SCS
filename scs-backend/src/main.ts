import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionFilter } from "./common/filter/all-exception.filter";
import {
    initializeTransactionalContext,
    StorageDriver,
} from "typeorm-transactional";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(
        join(__dirname, "..", process.env.UPLOAD_LOCATION || "uploads"),
        { prefix: "/v1/uploads/" },
    );

    app.enableCors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });

    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(4000);
}
bootstrap();
