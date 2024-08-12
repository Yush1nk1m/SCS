import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfig } from "../config/multer.config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerConfig } from "../config/Throttler.config";

@Module({
    imports: [
        ThrottlerModule.forRoot(ThrottlerConfig),
        MulterModule.register(MulterConfig),
    ],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
})
export class UploadModule {}
