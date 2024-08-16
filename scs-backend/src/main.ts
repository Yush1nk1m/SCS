import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AllExceptionFilter } from "./common/filter/all-exception.filter";
import {
    initializeTransactionalContext,
    StorageDriver,
} from "typeorm-transactional";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as fs from "fs";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(reflector, {
            excludeExtraneousValues: true,
        }),
    );

    app.useGlobalFilters(new AllExceptionFilter());

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("SCS API")
        .setDescription("Study Computer Science 서비스의 백엔드 API 문서이다.")
        .setVersion("1.0")
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, swaggerDocument);
    // fs.writeFileSync("./swagger.json", JSON.stringify(swaggerDocument));

    await app.listen(4000);
}
bootstrap();
