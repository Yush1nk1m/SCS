import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfig } from "../config/multer.config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerConfig } from "../config/Throttler.config";
import { S3Client } from "@aws-sdk/client-s3";

@Module({
    imports: [
        ThrottlerModule.forRoot(ThrottlerConfig),
        MulterModule.register(MulterConfig),
    ],
    controllers: [UploadController],
    providers: [
        UploadService,
        {
            provide: S3Client,
            useValue: new S3Client({
                region: process.env.AWS_S3_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            }),
        },
    ],
    exports: [UploadService],
})
export class UploadModule {}
