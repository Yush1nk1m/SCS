import { MulterModuleOptions } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

export const MulterConfig: MulterModuleOptions = {
    storage: memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
};
